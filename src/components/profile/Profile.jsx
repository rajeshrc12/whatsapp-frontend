import React, { useEffect, useState } from "react";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";
import CameraIconUpload from "../../icons/CameraIconUpload";
import InputBottomBorder from "../input/InputBottomBorder";
import Popper from "../popper/Popper";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../service/user";
import {
  setCurrentUser,
  setOther,
  setToastNotification,
} from "../../state/user/userSlice";
import ReactModal from "../modal/ReactModal";
import TakePhoto from "./TakePhoto";
import UploadPhoto from "./UploadPhoto";
import InputFileIcon from "../input/InputFileIcon";
import DeletePhoto from "./DeletePhoto";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [takePhotoModal, setTakePhotoModal] = useState(false);
  const [uploadPhotoModal, setUploadPhotoModal] = useState(false);
  const [deletePhotoModal, setDeletePhotoModal] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="h-full bg-panel-header-background">
      <div className="h-[10%] flex items-center px-5 bg-white">
        <div className="text-2xl font-bold">Profile</div>
      </div>
      <div className="relative h-[40%] flex justify-center items-center px-5">
        {user.currentUser.profileImageUrl ? (
          <div
            style={{
              height: "13rem",
              width: "13rem",
              borderRadius: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${user.currentUser.profileImageUrl})`,
              position: "relative",
            }}
            className="group"
          >
            <div className="hidden absolute top-0 left-0 h-full w-full group-hover:flex justify-center items-center">
              <div
                style={{
                  height: "13rem",
                  width: "13rem",
                  borderRadius: "100%",
                }}
                className="bg-profileFilter"
              ></div>
            </div>

            <div className="hidden absolute top-0 left-0 h-full w-full group-hover:flex justify-center items-center">
              <Popper
                content={
                  <div className="flex flex-col w-48 py-2 cursor-pointer">
                    <div
                      className="px-5 p-2 hover:bg-gray-100"
                      onClick={() =>
                        dispatch(
                          setOther({
                            ...user.other,
                            showCurrentUserProfileImage: true,
                          })
                        )
                      }
                    >
                      View Photo
                    </div>
                    <div
                      className="px-5 p-2 hover:bg-gray-100"
                      onClick={() => setTakePhotoModal(!takePhotoModal)}
                    >
                      Take Photo
                    </div>
                    <InputFileIcon
                      icon={
                        <div className="px-5 p-2 hover:bg-gray-100">
                          Upload Photo
                        </div>
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

                    <div
                      className="px-5 p-2 hover:bg-gray-100"
                      onClick={() => setDeletePhotoModal(true)}
                    >
                      Remove Photo
                    </div>
                  </div>
                }
                clickCotent={
                  <div className="flex flex-col items-center">
                    <div>
                      <CameraIconUpload className="fill-white" />
                    </div>
                    <div className="text-white text-xs font-thin">
                      CHANGE PROFILE
                    </div>
                    <div className="text-white text-xs font-thin">PHOTOT</div>
                  </div>
                }
                direction="dropdown-right"
                className="rounded"
              />
            </div>
          </div>
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
                  <Popper
                    content={
                      <div className="flex flex-col w-48 py-2 cursor-pointer">
                        <div
                          className="px-5 p-2 hover:bg-gray-100"
                          onClick={() => setTakePhotoModal(!takePhotoModal)}
                        >
                          Take Photo
                        </div>
                        <InputFileIcon
                          icon={
                            <div className="px-5 p-2 hover:bg-gray-100">
                              Upload Photo
                            </div>
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
                    }
                    clickCotent={
                      <div className="flex flex-col items-center">
                        <div>
                          <CameraIconUpload className="fill-white" />
                        </div>
                        <div className="text-white text-xs font-thin">
                          CHANGE PROFILE
                        </div>
                        <div className="text-white text-xs font-thin">
                          PHOTOT
                        </div>
                      </div>
                    }
                    direction="dropdown-right"
                    className="rounded"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="h-[15%] flex flex-col justify-evenly px-10 bg-white">
        <div className="text-panel-background-colored">Your name</div>
        <div>
          <InputBottomBorder
            text={user.currentUser.name}
            cb={async (value) => {
              const result = await updateUser({
                email: user.currentUser.email,
                key: "name",
                value,
              });
              if (result._id) {
                dispatch(setCurrentUser({ ...user.currentUser, name: value }));
                dispatch(setToastNotification("Your name changed"));
                setTimeout(() => {
                  dispatch(setToastNotification(null));
                }, 3000);
              }
            }}
          />
        </div>
      </div>
      <div className="h-[15%] text-sm p-5 text-input-border">
        This is not your username or PIN. This name will be visible to your
        WhatsApp contacts.
      </div>
      <div className="h-[15%] flex flex-col justify-evenly px-10 bg-white">
        <div className="text-panel-background-colored">About</div>
        <div>
          <InputBottomBorder
            text={user.currentUser.about}
            cb={async (value) => {
              const result = await updateUser({
                email: user.currentUser.email,
                key: "about",
                value,
              });
              if (result._id) {
                dispatch(setCurrentUser({ ...user.currentUser, about: value }));
                dispatch(setToastNotification("About changed"));
                setTimeout(() => {
                  dispatch(setToastNotification(null));
                }, 3000);
              }
            }}
          />
        </div>
      </div>
      <ReactModal
        modal={takePhotoModal}
        setModal={setTakePhotoModal}
        content={
          <TakePhoto
            email={user.currentUser.email}
            onClose={() => setTakePhotoModal(false)}
          />
        }
      />
      <ReactModal
        modal={!!uploadPhotoModal}
        setModal={setUploadPhotoModal}
        content={
          <UploadPhoto
            email={user.currentUser.email}
            uploadPhotoModal={uploadPhotoModal}
            onClose={() => setUploadPhotoModal(false)}
          />
        }
      />
      <ReactModal
        modal={!!deletePhotoModal}
        setModal={setDeletePhotoModal}
        content={
          <DeletePhoto
            email={user.currentUser.email}
            onClose={() => setDeletePhotoModal(false)}
          />
        }
      />
    </div>
  );
};

export default Profile;
