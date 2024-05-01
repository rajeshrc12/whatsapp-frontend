import React, { useCallback, useState } from "react";
import CancelIcon from "../../icons/CancelIcon";
import SendIcon from "../../icons/SendIcon";
import { FaFile, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { middle } from "../../state/panel/panelSlice";
import InputFileIcon from "../input/InputFileIcon";
const FilePreview = ({ files, setFiles }) => {
  const dispatch = useDispatch();
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
          className={`w-[90%]  overflow-x-scroll flex gap-5 p-5 ${
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
                  className={`${
                    selectedPreviewFile === i &&
                    "border-[3px] border-poll-bar-fill-sender"
                  } border border-gray-300 rounded-lg`}
                ></div>
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
                  className={`${
                    selectedPreviewFile === i &&
                    "border-[3px] border-poll-bar-fill-sender"
                  } border border-gray-300 rounded-lg flex justify-center`}
                >
                  <video src={URL.createObjectURL(file)} className="h-full" />
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
                  className={`${
                    selectedPreviewFile === i &&
                    "border-[3px] border-poll-bar-fill-sender"
                  } border border-gray-300 rounded-lg flex justify-center items-center`}
                >
                  <FaFile color="#79909b" size={40} />
                </div>
              );
          })}
          <div
            style={{
              flexBasis: "60px",
              flexGrow: "0",
              flexShrink: "0",
            }}
            className={`border border-gray-300 rounded-lg flex items-center justify-center`}
          >
            <InputFileIcon
              icon={<FaPlus color="#79909b" size={20} />}
              callback={(e) => {
                let allFiles = [...files, ...e.target.files];
                if (
                  allFiles.find(
                    (f, i) => Math.round(f.size / 1024 / 1024) > 3 || i > 10
                  )
                ) {
                  allFiles = allFiles.filter(
                    (f, i) => Math.round(f.size / 1024 / 1024) <= 3 && i < 10
                  );
                }
                if (allFiles.length) {
                  dispatch(middle("filepreview"));
                  setFiles(allFiles);
                }
              }}
            />
          </div>
        </div>
        <div className="w-[10%] flex justify-center items-center">
          <div className="bg-poll-bar-fill-sender p-5 rounded-full">
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
