import React, { useEffect, useRef } from "react";
import PlusIcon from "../../icons/PlusIcon";
import Chat from "./Chat";
import ChatBox from "./ChatBox";
import { useSelector } from "react-redux";
const localStorageUser = JSON.parse(localStorage.getItem("user"));
const ChatWindow = () => {
  const user = useSelector((state) => state.user);
  const bottomRef = useRef();
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [user.selectedUser.chats]);
  return (
    <div className="h-full">
      <div className="h-[90%] overflow-y-scroll px-10 py-5 flex flex-col gap-1">
        {user.selectedUser.chats.map((chat, i) => (
          <Chat
            chat={chat}
            key={chat._id}
            currentUserEmail={localStorageUser.email}
          />
        ))}
        <div ref={bottomRef}></div>
      </div>
      <div className="h-[10%] flex bg-panel-header-background items-center px-2 gap-3">
        <PlusIcon />
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatWindow;
