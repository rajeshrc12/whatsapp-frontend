import React from "react";
import ChatIcon from "../../icons/ChatIcon";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";
const SideBar = () => {
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="h-full flex flex-col items-center gap-3 bg-panel-header-background py-5">
      <div className="p-2 rounded-full">
        <ChatIcon />
      </div>
      <div className="p-1 rounded-full">
        {localStorageUser.profileImageUrl ? (
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src={localStorageUser.profileImageUrl} />
            </div>
          </div>
        ) : (
          <EmptyProfileIcon />
        )}
      </div>
    </div>
  );
};

export default SideBar;
