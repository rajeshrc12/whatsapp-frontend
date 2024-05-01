import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { getAllUsers, getUser } from "./service/user";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, updateLastSeen } from "./state/user/userSlice";
import { getTimeInAmPM } from "./utils/common";
const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    if (localStorageUser?.email) {
      const skt = io(import.meta.env.VITE_SERVER_URL, {
        query: {
          email: localStorageUser.email,
        },
      });
      setSocket(skt);
      getAllUsers().then((res) =>
        setUsers(res.filter((u) => u.email !== localStorageUser.email))
      );
    } else navigate("/login");
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("onlineUsers", () => {
        dispatch(updateLastSeen());
      });
    }
  }, [socket]);
  return (
    <div className="h-screen w-screen flex">
      <div className="w-[30%]">
        <div className="h-[10%] flex justify-between border"></div>
        <div className="h-[90%] overflow-y-scroll border">
          {users.map((u) => (
            <div
              key={u.name}
              className="border p-2"
              onClick={async () => {
                if (user.selectedUser.email !== u.email) {
                  const result = await getUser({ email: u.email });
                  dispatch(
                    setSelectedUser({
                      email: u.email,
                      lastSeen: result.lastSeen,
                      profileImageUrl: result.profileImageUrl,
                      name: result.name,
                      chats: [],
                    })
                  );
                }
              }}
            >
              {u.name}
            </div>
          ))}
        </div>
      </div>
      <div className="w-[70%]">
        <div className="h-[10%] justify-between border">
          <div>{user.selectedUser.name}</div>
          <div>{getTimeInAmPM(user.selectedUser.lastSeen)}</div>
        </div>
        <div className="h-[90%] overflow-y-scroll border"></div>
      </div>
    </div>
  );
};

export default App;
