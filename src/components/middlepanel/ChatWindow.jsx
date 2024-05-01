import React, { useEffect, useRef, useState } from "react";
import PlusIcon from "../../icons/PlusIcon";
import Chat from "./Chat";
import ChatBox from "./ChatBox";
import { useDispatch, useSelector } from "react-redux";
import { middle } from "../../state/panel/panelSlice";
import InputFileIcon from "../input/InputFileIcon";
const localStorageUser = JSON.parse(localStorage.getItem("user"));
const ChatWindow = ({ setFiles }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const bottomRef = useRef();
  const [toast, setToast] = useState(false);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [user.selectedUser.chats]);
  return (
    <div className="h-full">
      <div className="h-[90%] overflow-y-scroll px-10 py-5 flex flex-col gap-1 relative">
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
        <InputFileIcon
          icon={<PlusIcon />}
          callback={(e) => {
            let allFiles = [...e.target.files];
            if (
              allFiles.find(
                (f, i) => Math.round(f.size / 1024 / 1024) > 3 || i > 10
              )
            ) {
              allFiles = allFiles.filter(
                (f, i) => Math.round(f.size / 1024 / 1024) <= 3 && i < 10
              );
            }
            if (allFiles.length) {
              dispatch(middle("filepreview"));
              setFiles(allFiles);
            }
          }}
        />
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatWindow;
