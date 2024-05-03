import React from "react";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";

const NewChatContact = ({ user, handleNewChatContact }) => {
  return (
    <div
      className="flex gap-3 items-center p-3 cursor-pointer"
      onClick={() => handleNewChatContact(user)}
    >
      {user.profileImageUrl ? (
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={user.profileImageUrl} />
          </div>
        </div>
      ) : (
        <EmptyProfileIcon />
      )}
      <div className="flex flex-col">
        <div>{user.name}</div>
        <div className="text-xs text-input-border">{user.email}</div>
      </div>
    </div>
  );
};

export default NewChatContact;
