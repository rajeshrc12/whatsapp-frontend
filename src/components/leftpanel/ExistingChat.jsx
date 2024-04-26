import React, { useEffect } from "react";
import NewChatIcon from "../../icons/NewChatIcon";
import MenuIcon from "../../icons/MenuIcon";
import ExistingChatContact from "./ExistingChatContact";
import { useDispatch, useSelector } from "react-redux";
import { left } from "../../state/panel/panelSlice";
import { useNavigate } from "react-router-dom";
import { getChats, getContacts } from "../../service/chat";
import {
  resetUser,
  setCurrentUser,
  setSelectedUser,
} from "../../state/user/userSlice";
import { getUser } from "../../service/user";
const ExistingChat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleExistingChatContact = async (email) => {
    if (user.selectedUser.email !== email) {
      const result = await getUser({ email });
      const chats = await getChats({
        from: user.currentUser.email,
        to: email,
      });
      dispatch(
        setSelectedUser({
          email,
          lastSeen: result.lastSeen,
          profileImageUrl: result.profileImageUrl,
          name: result.name,
          chats,
        })
      );
    }
  };
  useEffect(() => {
    if (user?.currentUser?.email)
      getContacts(user?.currentUser.email).then((res) =>
        dispatch(setCurrentUser({ ...user.currentUser, contacts: res }))
      );
  }, []);
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
                  dispatch(resetUser());
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
            handleExistingChatContact={handleExistingChatContact}
          />
        ))}
      </div>
    </div>
  );
};

export default ExistingChat;
