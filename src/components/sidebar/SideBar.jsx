import React from "react";
import ChatIcon from "../../icons/ChatIcon";
import StatusIcon from "../../icons/StatusIcon";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";
import { useDispatch, useSelector } from "react-redux";
import { left } from "../../state/panel/panelSlice";
const SideBar = () => {
  const dispatch = useDispatch();
  const panel = useSelector((state) => state.panel);
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="h-full flex flex-col justify-between items-center gap-3 bg-panel-header-background py-5">
      <div className="flex flex-col">
        <div
          className={`p-2 rounded-full cursor-pointer ${
            panel.left === "" && "bg-transparentLg"
          }`}
          onClick={() => dispatch(left(""))}
        >
          <ChatIcon />
        </div>
        <div
          className={`p-2 rounded-full cursor-pointer ${
            panel.left === "statusList" && "bg-transparentLg"
          }`}
        >
          <StatusIcon onClick={() => dispatch(left("statusList"))} />
        </div>
      </div>
      <div
        className={`p-2 rounded-full cursor-pointer ${
          panel.left === "profile" && "bg-transparentLg"
        }`}
        onClick={() => dispatch(left("profile"))}
      >
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
