import React from "react";
import iconColors from "./colors";

const ContactIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4C12 6.21 10.21 8 8 8C5.79 8 4 6.21 4 4C4 1.79 5.79 0 8 0C10.21 0 12 1.79 12 4ZM0 14C0 11.34 5.33 10 8 10C10.67 10 16 11.34 16 14V15C16 15.55 15.55 16 15 16H1C0.45 16 0 15.55 0 15V14Z"
        fill={iconColors.attachmentTypeContactsColor}
      ></path>
    </svg>
  );
};

export default ContactIcon;
