import React, { useCallback, useEffect, useState } from "react";
import CancelIcon from "../../icons/CancelIcon";
import SendIcon from "../../icons/SendIcon";
import { FaFile, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { middle } from "../../state/panel/panelSlice";
import InputFileIcon from "../input/InputFileIcon";
import moment from "moment";
import {
  setCurrentUser,
  setToastNotification,
  updateChats,
} from "../../state/user/userSlice";
import { getContacts, uploadFiles } from "../../service/chat";
import { getUser } from "../../service/user";
const localStorageUser = JSON.parse(localStorage.getItem("user"));
const FilePreview = ({ files, setFiles }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [selectedPreviewFile, setSelectedPreviewFile] = useState(0);
  const renderPreviewMessage = useCallback(() => {
    if (files.length) {
      const file = files[selectedPreviewFile];
      let fileType = file?.type?.split("/")[0];
      if (fileType === "video" && !file?.type?.includes("mp4")) {
        fileType = "";
      }
      switch (fileType) {
        case "image":
          return (
            <div
              style={{
                backgroundImage: `url(${URL.createObjectURL(file)})`,
                backgroundSize: "contain",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }}
              className="rounded-lg h-full w-full p-5"
            ></div>
          );
        case "video":
          return (
            <div className="h-full flex justify-center">
              <video
                className="h-full"
                controls
                src={URL.createObjectURL(file)}
              />
            </div>
          );
        default:
          return (
            <div className="h-full flex flex-col justify-center items-center">
              <FaFile size={200} color="#79909b" />
              <div>No preview available</div>
            </div>
          );
      }
    }
  }, [selectedPreviewFile, files]);
  const deleteFile = (index) => {
    let tempFiles = [...files];
    tempFiles.splice(index, 1);
    if (tempFiles.length === 0) {
      dispatch(middle(""));
      setFiles([]);
      setSelectedPreviewFile(0);
      return;
    }
    setFiles(tempFiles);
  };

  return (
    <div className="bg-panel-header-background h-full w-full">
      <div className="h-[10%] bg-panel-background-deeper flex justify-between items-center px-3">
        <div>
          <CancelIcon
            onClick={() => {
              dispatch(middle(""));
              setFiles([]);
              setSelectedPreviewFile(0);
            }}
          />
        </div>
        <div className="text-sm">
          {files[selectedPreviewFile]?.name || "No name"}
        </div>
        <div></div>
      </div>
      <div className="h-[70%] p-10">{renderPreviewMessage()}</div>
      <div className="h-[20%] w-full flex border-t-[2px]">
        <div
          className={`w-[90%] relative overflow-x-scroll flex gap-5 p-5 ${
            files.length < 8 && "justify-center"
          }`}
        >
          {files.map((file, i) => {
            let fileType = file?.type?.split("/")[0];
            if (fileType === "video" && !file?.type?.includes("mp4")) {
              fileType = "";
            }
            if (fileType === "image")
              return (
                <div
                  key={i}
                  onClick={() => setSelectedPreviewFile(i)}
                  style={{
                    flexBasis: "60px",
                    flexGrow: "0",
                    flexShrink: "0",
                    backgroundImage: `url(${URL.createObjectURL(file)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className={`relative group ${
                    selectedPreviewFile === i &&
                    "border-[3px] border-poll-bar-fill-sender"
                  } border border-gray-300 rounded-lg`}
                >
                  <div className="hidden group-hover:block absolute top-0 right-0">
                    <CancelIcon onClick={() => deleteFile(i)} />
                  </div>
                </div>
              );
            else if (fileType === "video")
              return (
                <div
                  key={i}
                  onClick={() => setSelectedPreviewFile(i)}
                  style={{
                    flexBasis: "60px",
                    flexGrow: "0",
                    flexShrink: "0",
                  }}
                  className={`relative group ${
                    selectedPreviewFile === i &&
                    "border-[3px] border-poll-bar-fill-sender"
                  } border border-gray-300 rounded-lg flex justify-center`}
                >
                  <video src={URL.createObjectURL(file)} className="h-full" />
                  <div className="hidden group-hover:block absolute top-0 right-0">
                    <CancelIcon onClick={() => deleteFile(i)} />
                  </div>
                </div>
              );
            else
              return (
                <div
                  key={i}
                  onClick={() => setSelectedPreviewFile(i)}
                  style={{
                    flexBasis: "60px",
                    flexGrow: "0",
                    flexShrink: "0",
                  }}
                  className={`relative group ${
                    selectedPreviewFile === i &&
                    "border-[3px] border-poll-bar-fill-sender"
                  } border border-gray-300 rounded-lg flex justify-center items-center`}
                >
                  <FaFile color="#79909b" size={40} />
                  <div className="hidden group-hover:block absolute top-0 right-0">
                    <CancelIcon onClick={() => deleteFile(i)} />
                  </div>
                </div>
              );
          })}
          <div
            style={{
              flexBasis: "60px",
              flexGrow: "0",
              flexShrink: "0",
            }}
            className={`sticky bg-panel-header-background right-0 border border-gray-300 rounded-lg flex items-center justify-center`}
          >
            <InputFileIcon
              icon={<FaPlus color="#79909b" size={20} />}
              callback={(e) => {
                let allFiles = [];
                let fileCount = 0;
                let toastMessageFileCount = "";
                let toastMessageFileSize = "";
                for (const file of [...files, ...e.target.files]) {
                  if (fileCount > 11) {
                    if (!toastMessageFileCount)
                      toastMessageFileCount = "only 12 files are allowed";
                    break;
                  }
                  if (Math.round(file.size / 1024 / 1024) <= 3) {
                    allFiles.push(file);
                    fileCount++;
                  }
                  if (
                    Math.round(file.size / 1024 / 1024) > 3 &&
                    !toastMessageFileSize
                  )
                    toastMessageFileSize =
                      "file you tried adding is larger than the 3MB limit";
                }
                console.log(toastMessageFileCount, toastMessageFileSize);
                if (toastMessageFileCount || toastMessageFileSize) {
                  dispatch(
                    setToastNotification(
                      toastMessageFileCount + toastMessageFileSize
                    )
                  );
                  setTimeout(() => {
                    dispatch(setToastNotification(null));
                  }, 5000);
                }
                if (allFiles.length) {
                  setFiles(allFiles);
                  dispatch(middle("filePreview"));
                }
              }}
            />
          </div>
        </div>
        <div className="w-[10%] flex justify-center items-center">
          <div className="bg-poll-bar-fill-sender p-5 rounded-full">
            <SendIcon
              onClick={async () => {
                const result = await getUser({
                  email: user.selectedUser.email,
                });
                dispatch(
                  updateChats(
                    files.map((file) => {
                      let fileType = file?.type?.split("/")[0];
                      if (
                        (fileType === "video" &&
                          !file?.type?.includes("mp4")) ||
                        fileType === "text"
                      ) {
                        fileType = "other";
                      }
                      return {
                        message: URL.createObjectURL(file),
                        from: localStorageUser.email,
                        to: user.selectedUser.email,
                        createdAt: String(new Date()),
                        type: fileType,
                        _id: String(Math.random() * 10000000),
                        seen:
                          result.openProfile === localStorageUser.email
                            ? true
                            : false,
                        filename: file.name,
                      };
                    })
                  )
                );
                dispatch(middle(""));
                await uploadFiles({
                  files,
                  from: localStorageUser.email,
                  to: user.selectedUser.email,
                });
                const resultContacts = await getContacts(
                  localStorageUser.email
                );
                dispatch(
                  setCurrentUser({
                    ...user.currentUser,
                    contacts: resultContacts,
                  })
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
