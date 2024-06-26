import React, { useEffect, useState } from "react";
import BackIcon from "../../icons/BackIcon";
import NewChatContact from "./NewChatContact";
import { useDispatch, useSelector } from "react-redux";
import { left } from "../../state/panel/panelSlice";
import { getAllUsers, getUser, setOpenProfile } from "../../service/user";
import { setSelectedUser } from "../../state/user/userSlice";
import { downloadFile, getChats } from "../../service/chat";
const NewChat = () => {
  const localStorageUser = JSON.parse(localStorage.getItem("user")) || {};
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user);
  const handleNewChatContact = async (newChatUser) => {
    if (user.selectedUser.email !== newChatUser.email) {
      dispatch(left(""));
      const result = await getUser({ email: newChatUser.email });
      const chats = await getChats({
        from: localStorageUser.email,
        to: newChatUser.email,
      });
      const newChat = [];
      for (const chat of chats) {
        if (chat.type !== "text" && chat.type !== "date") {
          const result = await downloadFile(chat.message);
          newChat.push({
            ...chat,
            message: result,
          });
        } else {
          newChat.push(chat);
        }
      }
      dispatch(
        setSelectedUser({
          email: newChatUser.email,
          lastSeen: result.lastSeen,
          profileImageUrl: result.profileImageUrl,
          name: result.name,
          chats: newChat,
        })
      );
      await setOpenProfile({
        email: localStorageUser.email,
        openProfile: newChatUser.email,
      });
    }
  };
  useEffect(() => {
    if (localStorageUser.email)
      getAllUsers().then((res) =>
        setUsers(res.filter((u) => u.email !== localStorageUser.email))
      );
  }, []);

  return (
    <div className="h-full">
      <div className="h-[17%] border-b-[1px] flex flex-col justify-between">
        <div className="flex gap-3 px-5 items-center h-full">
          <div>
            <BackIcon
              className="fill-input-border"
              onClick={() => {
                dispatch(left(""));
              }}
            />
          </div>
          <div className="flex gap-5">New chat</div>
        </div>
        <div className="w-full p-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email"
            type="text"
            className="bg-panel-header-background w-full rounded-lg p-1 outline-none"
          />
        </div>
      </div>
      <div className="h-[83%] overflow-y-scroll">
        {users
          .filter(
            (contact) =>
              contact.name.toLowerCase().includes(search.toLowerCase()) ||
              contact.email.toLowerCase().includes(search.toLowerCase())
          )
          .map((user) => (
            <NewChatContact
              key={user._id}
              user={user}
              handleNewChatContact={handleNewChatContact}
            />
          ))}
      </div>
    </div>
  );
};

export default NewChat;
