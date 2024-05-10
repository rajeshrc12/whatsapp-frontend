import React, { useCallback, useRef, useState } from "react";
import CancelIcon from "../../icons/CancelIcon";
import CameraIconUpload from "../../icons/CameraIconUpload";
import Webcam from "react-webcam";
import CheckmarkIcon from "../../icons/CheckmarkIcon";
import { updateUserPhoto } from "../../service/user";
import {
  setCurrentUser,
  setToastNotification,
} from "../../state/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};
const TakePhoto = ({ onClose = () => {}, email }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState("");
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);
  return (
    <div className="w-[35vw] h-[80vh]">
      <div className="h-[10%] bg-panel-background-colored flex justify-between items-center px-5 font-bold text-lg text-white">
        <div className="flex items-center gap-5">
          <div>
            <CancelIcon onClick={onClose} color="#ffffff" />
          </div>
          <div>{capturedImage ? "Confirm photo" : "Take Photo"}</div>
        </div>
        {capturedImage && (
          <div
            className="text-sm font-normal cursor-pointer"
            onClick={() => setCapturedImage("")}
          >
            Retake
          </div>
        )}
      </div>
      <div className="h-[70%]">
        {capturedImage ? (
          <img src={capturedImage} />
        ) : (
          <div className="h-full">
            <Webcam
              mirrored={true}
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="h-full w-full"
            />
          </div>
        )}
      </div>
      <div className="h-[20%] bg-panel-header-background relative">
        {capturedImage ? (
          <div
            onClick={async () => {
              const blobImage = await (await fetch(capturedImage)).blob();
              const result = await updateUserPhoto({
                email,
                photo: blobImage,
              });
              if (result) {
                dispatch(
                  setCurrentUser({
                    ...user.currentUser,
                    profileImageUrl: URL.createObjectURL(blobImage),
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
        ) : (
          <div
            onClick={capture}
            className="absolute top-0 left-0 w-full flex justify-center cursor-pointer"
          >
            <div className="relative bottom-7  bg-panel-background-colored p-4 rounded-full">
              <CameraIconUpload className="fill-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakePhoto;
