import React, { useEffect, useState } from "react";
import CancelIcon from "../../icons/CancelIcon";
import CameraIconUpload from "../../icons/CameraIconUpload";
import CheckmarkIcon from "../../icons/CheckmarkIcon";
import InputFileIcon from "../input/InputFileIcon";
import { updateUserPhoto } from "../../service/user";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentUser,
  setToastNotification,
} from "../../state/user/userSlice";
const UploadPhoto = ({ onClose = () => {}, uploadPhotoModal, email }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [capturedImage, setCapturedImage] = useState("");
  useEffect(() => {
    setCapturedImage(uploadPhotoModal);
  }, [uploadPhotoModal]);
  return (
    <div className="w-[35vw] h-[80vh]">
      <div className="h-[10%] bg-panel-background-colored flex justify-between items-center px-5 font-bold text-lg text-white">
        <div className="flex items-center gap-5">
          <div>
            <CancelIcon onClick={onClose} color="#ffffff" />
          </div>
          <div>{capturedImage ? "Confirm photo" : "Take Photo"}</div>
        </div>
        <InputFileIcon
          icon={
            <div className="text-sm font-normal cursor-pointer">Upload</div>
          }
          multiple={false}
          callback={(e) => {
            const fileType = e.target.files[0].type;
            if (fileType.includes("image")) {
              console.log("from profile", e.target.files[0]);
              setUploadPhotoModal(e.target.files[0]);
            } else alert("only image allowed");
          }}
          accept="image/*"
        />
      </div>
      <div className="h-[70%]">
        {capturedImage && (
          <div
            style={{
              backgroundImage: `url(${URL.createObjectURL(capturedImage)})`,
              backgroundSize: "contain",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "100%",
            }}
          ></div>
        )}
      </div>
      <div className="h-[20%] bg-panel-header-background relative">
        <div
          onClick={async () => {
            const result = await updateUserPhoto({
              email,
              photo: capturedImage,
            });
            if (result) {
              dispatch(
                setCurrentUser({
                  ...user.currentUser,
                  profileImageUrl: URL.createObjectURL(capturedImage),
                })
              );
              dispatch(setToastNotification("Profile photo set"));
              setTimeout(() => {
                dispatch(setToastNotification(null));
              }, 3000);
            }
            setCapturedImage("");
            onClose();
          }}
          className="absolute top-0 right-5 cursor-pointer"
        >
          <div className="relative bottom-7  bg-panel-background-colored p-4 rounded-full">
            <CheckmarkIcon className="fill-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
