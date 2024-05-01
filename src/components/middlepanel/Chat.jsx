import React from "react";
import { getTimeInAmPM } from "../../utils/common";
import TickIcon from "../../icons/TickIcon";

const Chat = ({ chat, currentUserEmail }) => {
  if (chat.type === "text")
    return (
      <div
        className={`flex ${
          chat.from === currentUserEmail ? "justify-end" : "justify-start"
        }`}
      >
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
      </div>
    );
  if (chat.type === "date")
    return (
      <div className="flex justify-center sticky top-0">
        <div className="bg-white text-sm px-2 py-1 rounded-lg shadow">
          {chat.date}
        </div>
      </div>
    );
};

export default Chat;
