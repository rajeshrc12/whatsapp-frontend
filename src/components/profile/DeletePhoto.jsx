import React from "react";
import { deleteUserPhoto } from "../../service/user";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../state/user/userSlice";

const DeletePhoto = ({ onClose = () => {}, email }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return (
    <div className="w-[32rem] flex flex-col p-5 gap-10">
      <div>Remove your profile photo ?</div>
      <div className="flex justify-end gap-5">
        <button
          onClick={onClose}
          className="text-panel-background-colored font-medium border rounded-full px-7 py-2"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            await deleteUserPhoto({ email });
            dispatch(
              setCurrentUser({ ...user.currentUser, profileImageUrl: "" })
            );
            onClose();
          }}
          className="text-white bg-panel-background-colored font-medium rounded-full px-6 py-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default DeletePhoto;
