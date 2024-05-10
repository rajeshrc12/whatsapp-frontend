import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "../../icons/CancelIcon";
import { setOther } from "../../state/user/userSlice";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";

const ViewProfileImage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return user.other.showCurrentUserProfileImage ? (
    <div className="fixed z-10 top-0 left-0 h-screen w-screen bg-white flex flex-col">
      <div className="flex justify-between h-[10%] items-center px-10">
        <div className="flex items-center gap-5">
          {user.currentUser.profileImageUrl ? (
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src={user.currentUser.profileImageUrl} />
              </div>
            </div>
          ) : (
            <EmptyProfileIcon />
          )}
          <div>{user.currentUser.name}</div>
        </div>
        <div>
          <CancelIcon
            onClick={() =>
              dispatch(
                setOther({
                  ...user.other,
                  showCurrentUserProfileImage: false,
                })
              )
            }
          />
        </div>
      </div>
      <div className="flex justify-center items-center h-[90%]">
        <div>
          <img src={user.currentUser.profileImageUrl} width={200} />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ViewProfileImage;
