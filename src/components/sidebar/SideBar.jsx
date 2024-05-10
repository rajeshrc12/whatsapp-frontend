import React, { useEffect, useState } from "react";
import ChatIcon from "../../icons/ChatIcon";
import StatusIcon from "../../icons/StatusIcon";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";
import { useDispatch, useSelector } from "react-redux";
import { left } from "../../state/panel/panelSlice";
import { getUser } from "../../service/user";
import { setCurrentUser } from "../../state/user/userSlice";
import { downloadFile } from "../../service/chat";
const SideBar = () => {
  const dispatch = useDispatch();
  const panel = useSelector((state) => state.panel);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const getUserData = async () => {
      const userData = await getUser({ email: localStorageUser.email });
      let profileImageUrl = userData.profileImageUrl;
      if (!profileImageUrl.includes("googleusercontent") && profileImageUrl)
        profileImageUrl = await downloadFile(profileImageUrl);
      dispatch(
        setCurrentUser({
          ...user.currentUser,
          email: userData.email,
          profileImageUrl,
          name: userData.name,
          about: userData.about,
        })
      );
    };
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    if (localStorageUser?.email) getUserData();
  }, []);
  console.log(user.currentUser);
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
        {/* <div
          className={`p-2 rounded-full cursor-pointer ${
            panel.left === "statusList" && "bg-transparentLg"
          }`}
        >
          <StatusIcon onClick={() => dispatch(left("statusList"))} />
        </div> */}
      </div>
      <div
        className={`p-2 rounded-full cursor-pointer ${
          panel.left === "profile" && "bg-transparentLg"
        }`}
        onClick={() => dispatch(left("profile"))}
      >
        {user.currentUser.profileImageUrl ? (
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src={user.currentUser.profileImageUrl} />
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
