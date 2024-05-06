import React, { useEffect } from "react";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";
import CameraIconUpload from "../../icons/CameraIconUpload";
import InputBottomBorder from "../input/InputBottomBorder";

const Profile = () => {
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {}, []);
  return (
    <div className="h-full bg-panel-header-background">
      <div className="h-[10%] flex items-center px-5 bg-white">
        <div className="text-2xl font-bold">Profile</div>
      </div>
      <div className="relative h-[40%] flex justify-center items-center px-5">
        {!localStorageUser.profileImageUrl ? (
          <div
            style={{
              height: "13rem",
              width: "13rem",
              borderRadius: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${localStorageUser.profileImageUrl})`,
            }}
          ></div>
        ) : (
          <>
            <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
              <EmptyProfileIcon size={200} />
            </div>
            <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
              <div
                style={{
                  height: "13rem",
                  width: "13rem",
                  borderRadius: "100%",
                }}
                className="bg-profileFilter"
              ></div>
            </div>
            <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
              <div className="flex flex-col items-center">
                <div>
                  <CameraIconUpload className="fill-white" />
                </div>
                <div className="text-white text-xs font-thin">ADD PROFILE</div>
                <div className="text-white text-xs font-thin">PHOTOT</div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="h-[15%] flex flex-col justify-evenly px-10 bg-white">
        <div className="text-panel-background-colored">Your name</div>
        <div>
          <InputBottomBorder text={"name..."} />
        </div>
      </div>
      <div className="h-[15%] text-sm p-5 text-input-border">
        This is not your username or PIN. This name will be visible to your
        WhatsApp contacts.
      </div>
      <div className="h-[15%] flex flex-col justify-evenly px-10 bg-white">
        <div className="text-panel-background-colored">About</div>
        <div>
          <InputBottomBorder text={"Aboutttt..."} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
