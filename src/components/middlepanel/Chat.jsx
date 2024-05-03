import React from "react";
import { getTimeInAmPM } from "../../utils/common";
import TickIcon from "../../icons/TickIcon";
import DownloadIcon from "../../icons/DownloadIcon";
import { FaFile } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setOther } from "../../state/user/userSlice";
import { BiPlay } from "react-icons/bi";

const Chat = ({ chat, currentUserEmail }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const renderChat = (chat) => {
    if (chat.type === "text") {
      return (
        <div
          className={`flex break-all relative max-w-[35rem] rounded-lg shadow gap-2 p-1 ${
            currentUserEmail === chat.from
              ? "justify-end bg-outgoing-background"
              : "justify-start bg-white"
          }`}
        >
          <div className="flex-wrap">{chat.message}</div>
          <div
            className={`flex items-end ${
              chat.message.length > 60 && "absolute bottom-1 right-1"
            }`}
          >
            <div className="text-[11px] text-input-border min-w-[50px]">
              {getTimeInAmPM(chat.createdAt)}
            </div>
            {currentUserEmail === chat.from && (
              <div>
                <TickIcon seen={chat.seen} />
              </div>
            )}
          </div>
        </div>
      );
    } else if (chat.type === "image")
      return (
        <div
          onClick={() => {
            dispatch(setOther({ ...user.other, selectedMedia: chat }));
          }}
          className={`cursor-pointer p-1 w-[20rem] rounded-lg shadow ${
            chat.from === currentUserEmail
              ? "bg-outgoing-background"
              : "bg-white"
          }`}
        >
          <img src={chat.message} alt="" className="max-h-[20rem] w-full" />
          <div className={`flex justify-end items-center w-full pt-1`}>
            <div className="text-[11px] text-input-border min-w-[50px]">
              {getTimeInAmPM(chat.createdAt)}
            </div>
            {chat.from === currentUserEmail && (
              <div>
                <TickIcon seen={chat.seen} />
              </div>
            )}
          </div>
        </div>
      );
    else if (chat.type === "video") {
      return (
        <div
          onClick={() => {
            dispatch(setOther({ ...user.other, selectedMedia: chat }));
          }}
          className={`relative cursor-pointer p-1 max-w-[20rem] rounded-lg shadow ${
            chat.from === currentUserEmail
              ? "bg-outgoing-background"
              : "bg-white"
          }`}
        >
          <div className="absolute h-full w-full flex justify-center items-center">
            <div className="bg-transparentXl rounded-full p-2">
              <BiPlay color="white" size={30} />
            </div>
          </div>
          <video src={chat.message} alt="" className="max-h-[22rem]" />
          <div className={`flex justify-end items-center w-full pt-1`}>
            <div className="text-[11px] text-input-border min-w-[50px]">
              {getTimeInAmPM(chat.createdAt)}
            </div>
            {chat.from === currentUserEmail && (
              <div>
                <TickIcon seen={chat.seen} />
              </div>
            )}
          </div>
        </div>
      );
    } else
      return (
        <div
          className={`p-1 w-[20rem] rounded-lg shadow ${
            chat.from === currentUserEmail
              ? "bg-outgoing-background"
              : "bg-white"
          }`}
        >
          <div className="flex justify-between p-3 bg-transparent rounded-lg">
            <div className="flex gap-2">
              <div>
                <FaFile color="#79909b" size={30} />
              </div>
              <div>
                <div className="text-xs">{chat.filename}</div>
                <div></div>
              </div>
            </div>
            <div>
              <DownloadIcon
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = chat.message;
                  link.setAttribute("download", chat.filename);
                  // Append to html link element page
                  document.body.appendChild(link);
                  // Start download
                  link.click();
                  // Clean up and remove the link
                  link.parentNode.removeChild(link);
                }}
              />
            </div>
          </div>
          <div className={`flex justify-end items-center w-full pt-1`}>
            <div className="text-[11px] text-input-border min-w-[50px]">
              {getTimeInAmPM(chat.createdAt)}
            </div>
            {chat.from === currentUserEmail && (
              <div>
                <TickIcon seen={chat.seen} />
              </div>
            )}
          </div>
        </div>
      );
  };
  return chat.type === "date" ? (
    <div className="flex justify-center sticky top-0 z-10">
      <div className="bg-white text-sm px-2 py-1 rounded-lg shadow">
        {chat.date}
      </div>
    </div>
  ) : (
    <div
      className={`flex ${
        chat.from === currentUserEmail ? "justify-end" : "justify-start"
      }`}
    >
      {renderChat(chat)}
    </div>
  );
};

export default Chat;
