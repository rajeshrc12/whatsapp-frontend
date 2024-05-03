import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DownloadIcon from "../../icons/DownloadIcon";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";
import CancelIcon from "../../icons/CancelIcon";
import { setOther } from "../../state/user/userSlice";
import { getTimeInAmPM } from "../../utils/common";

const ViewMedia = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return user.other.selectedMedia ? (
    <div className="fixed top-0 left-0 h-screen w-screen bg-white">
      <div className="h-[10%] flex justify-between">
        <div className="flex gap-3 items-center p-3">
          <div>
            {user.selectedUser.profileImageUrl ? (
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src={user.selectedUser.profileImageUrl} />
                </div>
              </div>
            ) : (
              <EmptyProfileIcon />
            )}
          </div>
          <div className="flex flex-col">
            <div>{user.selectedUser.name}</div>
            <div className="text-sm text-input-border">
              {getTimeInAmPM(user.selectedUser.lastSeen)}
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center p-3">
          <DownloadIcon
            size="25"
            onClick={() => {
              const link = document.createElement("a");
              link.href = user.other.selectedMedia.message;
              link.setAttribute("download", user.other.selectedMedia.filename);
              document.body.appendChild(link);
              link.click();
              link.parentNode.removeChild(link);
            }}
          />
          <CancelIcon
            onClick={() =>
              dispatch(setOther({ ...user.other, selectedMedia: null }))
            }
          />
        </div>
      </div>
      <div className="h-[70%] flex justify-between items-center">
        <div></div>
        {user.other.selectedMedia.type === "image" && (
          <div
            style={{
              backgroundImage: `url(${
                user?.selectedUser?.chats?.find(
                  (chat) => chat._id === user.other.selectedMedia._id
                )?.message
              })`,
              backgroundSize: "contain",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }}
            className="rounded-lg h-full w-full p-5"
          ></div>
        )}
        {user.other.selectedMedia.type === "video" && (
          <video
            controls
            src={
              user?.selectedUser?.chats?.find(
                (chat) => chat._id === user.other.selectedMedia._id
              )?.message
            }
            className="h-full w-60"
          />
        )}
        <div></div>
      </div>
      <div className="h-[20%] px-5">
        <div
          className={`w-full h-full overflow-x-scroll flex gap-2 items-center ${
            user.selectedUser.chats.filter(
              (chat) => chat.type === "image" || chat.type === "video"
            ).length < 13 && "justify-center"
          }`}
        >
          {user.selectedUser.chats
            .filter((chat) => chat.type === "image" || chat.type === "video")
            .map((chat) => {
              if (chat.type === "image")
                return (
                  <div
                    onClick={() =>
                      dispatch(setOther({ ...user.other, selectedMedia: chat }))
                    }
                    key={chat._id}
                    style={{
                      flexBasis: "80px",
                      flexGrow: "0",
                      flexShrink: "0",
                      backgroundImage: `url(${chat.message})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className={`${
                      chat._id === user.other.selectedMedia._id &&
                      "scale-75 border-[5px] border-gray-200"
                    } border border-gray-300 rounded-lg h-[80px]`}
                  ></div>
                );
              else if (chat.type === "video")
                return (
                  <div
                    onClick={() =>
                      dispatch(setOther({ ...user.other, selectedMedia: chat }))
                    }
                    key={chat._id}
                    style={{
                      flexBasis: "80px",
                      flexGrow: "0",
                      flexShrink: "0",
                    }}
                    className={`${
                      chat._id === user.other.selectedMedia._id &&
                      "scale-75 border-[5px] border-gray-200"
                    } rounded-lg flex justify-center h-[80px]`}
                  >
                    <video src={chat.message} className="h-full" />
                  </div>
                );
            })}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ViewMedia;
