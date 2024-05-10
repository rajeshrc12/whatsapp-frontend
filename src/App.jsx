import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChats,
  setCurrentUser,
  updateChats,
  updateLastSeen,
} from "./state/user/userSlice";
import { FaLinkedin } from "react-icons/fa";
import SideBar from "./components/sidebar/SideBar";
import LeftPanel from "./components/leftpanel/LeftPanel";
import MiddlePanel from "./components/middlepanel/MiddlePanel";
import { getContacts } from "./service/chat";
import ViewMedia from "./components/mainpanel/ViewMedia";
import ToastNotification from "./components/toastnotification/ToastNotification";
import ViewProfileImage from "./components/profile/ViewProfileImage";
const App = () => {
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (localStorageUser?.email) {
      const skt = io(import.meta.env.VITE_SERVER_URL, {
        query: {
          email: localStorageUser.email,
        },
      });
      setSocket(skt);
      dispatch(setCurrentUser({ ...user.currentUser, ...localStorageUser }));
    }
  }, []);
  useEffect(() => {
    if (socket && localStorageUser?.email) {
      socket.on(localStorageUser?.email, (action) => {
        if (action.type.includes("updateChats")) {
          dispatch(updateChats(action.payload));
        }
        if (action.type.includes("fetchContacts")) {
          getContacts(localStorageUser.email).then((res) =>
            dispatch(setCurrentUser({ ...user.currentUser, contacts: res }))
          );
        }
        if (action.type.includes("fetchChats")) {
          dispatch(fetchChats(localStorageUser?.email));
        }
      });
      socket.on("onlineUsers", () => {
        dispatch(updateLastSeen());
      });
    }
  }, [socket]);
  if (localStorage.getItem("user"))
    return (
      <div className="flex h-screen w-screen">
        <div className="w-[4%]">
          <SideBar />
        </div>
        <div className="w-[31%] border">
          <LeftPanel />
        </div>
        <div className="w-[65%] border">
          {user.selectedUser.email ? (
            <MiddlePanel />
          ) : (
            <div className="bg-panel-header-background h-full flex justify-center items-center">
              <div className="text-center">
                <div className="text-2xl">WhatsApp web</div>
                <img
                  src="https://static.whatsapp.net/rsrc.php/v3/yX/r/dJq9qKG5lDb.png"
                  width="320"
                  alt=""
                ></img>
                <div className="flex justify-center gap-1">
                  <div>By</div>
                  <a
                    className="font-bold flex items-center gap-1"
                    target="_blank"
                    href="https://www.linkedin.com/in/rajeshcharhajari/"
                  >
                    <div>Rajesh charhajari</div>
                    <div>
                      <FaLinkedin />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        <ViewMedia />
        <ToastNotification />
        <ViewProfileImage />
      </div>
    );
  else return <Navigate to={"/login"} />;
};

export default App;
