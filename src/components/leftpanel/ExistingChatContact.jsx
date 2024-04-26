import React from "react";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";

const ExistingChatContact = ({ contact, user }) => {
  return (
    <div
      key={contact.name}
      className={`px-3 gap-2 cursor-pointer flex items-center ${
        contact.name === user.selectedUser.name
          ? "bg-panel-header-background"
          : "hover:bg-gray-50"
      }`}
      onClick={() => {}}
    >
      <div>
        <EmptyProfileIcon size={45} />
      </div>
      <div className="w-full flex flex-col border-t-[1px] py-3">
        <div className="flex justify-between">
          <div>{contact.name}</div>
          <div className="text-xs text-input-border"></div>
        </div>
        <div className="flex justify-between">
          <div className="text-xs text-input-border flex items-center gap-1">
            {contact.lastChat.from === user.currentUser.name && (
              <TickIcon seen={contact.lastChat.seen} />
            )}
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
