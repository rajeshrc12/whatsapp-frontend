import React, { useEffect, useRef, useState } from "react";
import PlusIcon from "../../icons/PlusIcon";
import Chat from "./Chat";
import ChatBox from "./ChatBox";
import { useDispatch, useSelector } from "react-redux";
import { middle } from "../../state/panel/panelSlice";
import InputFileIcon from "../input/InputFileIcon";
import { setToastNotification } from "../../state/user/userSlice";
const ChatWindow = ({ setFiles }) => {
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const bottomRef = useRef();
  useEffect(() => {
    setTimeout(() => bottomRef.current.scrollIntoView(true));
  }, [user.selectedUser.chats]);
  return (
    <div className="h-full">
      <div className="h-[90%] overflow-y-scroll px-10 py-5 flex flex-col gap-1 relative">
        {user.other.chatWindowLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner text-poll-bar-fill-sender"></span>
          </div>
        ) : (
          user.selectedUser.chats.map((chat, i) => (
            <Chat
              chat={chat}
              key={chat._id}
              currentUserEmail={localStorageUser.email}
            />
          ))
        )}
        <div ref={bottomRef}></div>
      </div>
      <div className="h-[10%] flex bg-panel-header-background items-center px-2 gap-3">
        <InputFileIcon
          icon={<PlusIcon />}
          callback={(e) => {
            let allFiles = [];
            let fileCount = 0;
            let toastMessageFileCount = "";
            let toastMessageFileSize = "";
            for (const file of [...e.target.files]) {
              if (fileCount > 11) {
                if (!toastMessageFileCount)
                  toastMessageFileCount = "only 12 files are allowed";
                break;
              }
              if (Math.round(file.size / 1024 / 1024) <= 3) {
                allFiles.push(file);
                fileCount++;
              }
              if (
                Math.round(file.size / 1024 / 1024) > 3 &&
                !toastMessageFileSize
              )
                toastMessageFileSize =
                  "file you tried adding is larger than the 3MB limit";
            }
            if (toastMessageFileCount || toastMessageFileSize) {
              dispatch(
                setToastNotification(
                  toastMessageFileCount + toastMessageFileSize
                )
              );
              setTimeout(() => {
                dispatch(setToastNotification(null));
              }, 5000);
            }
            if (allFiles.length) {
              setFiles(allFiles);
              dispatch(middle("filePreview"));
            }
          }}
        />
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatWindow;
