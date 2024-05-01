import React from "react";
import iconColors from "./colors";

const EditIcon = ({ onClick = () => {} }) => {
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 24 24"
      height="24"
      width="24"
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      x="0px"
      y="0px"
    >
      <title>pencil</title>
      <path
        fill={iconColors.panelHeaderIcon}
        d="M3.95,16.7v3.4h3.4l9.8-9.9l-3.4-3.4L3.95,16.7z M19.75,7.6c0.4-0.4,0.4-0.9,0-1.3 l-2.1-2.1c-0.4-0.4-0.9-0.4-1.3,0l-1.6,1.6l3.4,3.4L19.75,7.6z"
      ></path>
    </svg>
  );
};

export default EditIcon;