import React, { useEffect } from "react";
import NewChatIcon from "../../icons/NewChatIcon";
import MenuIcon from "../../icons/MenuIcon";
import ExistingChatContact from "./ExistingChatContact";
import { useDispatch, useSelector } from "react-redux";
import { left } from "../../state/panel/panelSlice";
import { useNavigate } from "react-router-dom";
import { getContacts } from "../../service/chat";
import { setCurrentUser } from "../../state/user/userSlice";
const ExistingChat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    if (localStorageUser?.email)
      getContacts(localStorageUser.email).then((res) =>
        dispatch(setCurrentUser({ ...user.currentUser, contacts: res }))
      );
  }, []);
  console.log(user.currentUser.contacts);
  return (
    <div className="h-full">
      <div className="h-[17%] border-b-[1px] flex flex-col justify-between">
        <div className="flex justify-between px-5 items-center h-full">
          <div className="text-xl font-bold">Chats</div>
          <div className="flex gap-5">
            <div>
              <NewChatIcon
                onClick={() => {
                  dispatch(left("newChat"));
                }}
              />
            </div>
            <div>
              <MenuIcon
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-full p-2">
          <input
            placeholder="Search"
            type="text"
            className="bg-panel-header-background w-full rounded-lg p-1 outline-none"
          />
        </div>
      </div>
      <div className="h-[83%] overflow-y-scroll">
        {user.currentUser.contacts.map((contact) => (
          <ExistingChatContact
            contact={contact}
            key={contact.name}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default ExistingChat;
