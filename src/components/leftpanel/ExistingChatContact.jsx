import React from "react";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";
import CameraIconUpload from "../../icons/CameraIconUpload";
import VideoIcon from "../../icons/VideoIcon";
import TickIcon from "../../icons/TickIcon";
import DocumentIcon from "../../icons/DocumentIcon";
import { getTimeInAmPM } from "../../utils/common";
const ExistingChatContact = ({
  contact,
  selectedEmail,
  currentEmail,
  handleExistingChatContact,
}) => {
  const renderLastChat = (chat) => {
    switch (chat.type) {
      case "image":
        return (
          <div className="flex gap-1">
            <div>
              <CameraIconUpload size="15" />
            </div>
            <div>Image</div>
          </div>
        );
      case "video":
        return (
          <div className="flex gap-1">
            <div>
              <VideoIcon size="18" />
            </div>
            <div>Video</div>
          </div>
        );
      case "text":
        return (
          <div className="flex">
            <div>
              {chat.message.length > 20
                ? chat.message.slice(0, 20) + "..."
                : chat.message}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex gap-1">
            <div>
              <DocumentIcon size="15" />
            </div>
            <div>{chat.filename}</div>
          </div>
        );
    }
  };
  return (
    <div
      className={`px-3 gap-2 cursor-pointer flex items-center ${
        contact.email === selectedEmail
          ? "bg-panel-header-background"
          : "hover:bg-gray-50"
      }`}
      onClick={() => handleExistingChatContact(contact)}
    >
      <div>
        {contact.profileImageUrl ? (
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={contact.profileImageUrl} />
            </div>
          </div>
        ) : (
          <EmptyProfileIcon />
        )}
      </div>
      <div className="w-full flex flex-col border-t-[1px] py-3">
        <div className="flex justify-between">
          <div>{contact.name}</div>
          <div className="text-xs text-input-border">
            {getTimeInAmPM(contact.lastChat.createdAt)}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-xs text-input-border flex items-center gap-1">
            {contact.lastChat.from === currentEmail && (
              <TickIcon seen={contact.lastChat.seen} />
            )}
            {renderLastChat(contact.lastChat)}
          </div>
          {contact.unseenCount > 0 && (
            <div className="bg-unread-marker-background rounded-full w-6 pl-2 text-white">
              {contact.unseenCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExistingChatContact;
