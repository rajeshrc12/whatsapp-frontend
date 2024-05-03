import React from "react";
import { useSelector } from "react-redux";

const ToastNotification = () => {
  const user = useSelector((state) => state.user);
  return user.other.toastNotification ? (
    <div className="toast toast-start flex justify-center items-center">
      <div className="bg-transparentXl text-white rounded-lg p-3 text-sm">
        {user.other.toastNotification}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ToastNotification;
