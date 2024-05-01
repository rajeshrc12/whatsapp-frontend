import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setSelectedUser } from "../../state/user/userSlice";
import { getChats, getContacts } from "../../service/chat";
import { left } from "../../state/panel/panelSlice";
import { useNavigate } from "react-router-dom";
import NewChatIcon from "../../icons/NewChatIcon";
import MenuIcon from "../../icons/MenuIcon";
import ExistingChatContact from "./ExistingChatContact";
import { getUser } from "../../service/user";
const localStorageUser = JSON.parse(localStorage.getItem("user"));
const ExistingChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleExistingChatContact = async (contact) => {
    const result = await getUser({ email: contact.email });
    const chats = await getChats({
      from: localStorageUser.email,
      to: contact.email,
    });
    dispatch(
      setSelectedUser({
        email: contact.email,
        lastSeen: result.lastSeen,
        profileImageUrl: result.profileImageUrl,
        name: result.name,
        chats,
      })
    );
  };
  useEffect(() => {
    if (localStorageUser?.email)
      getContacts(localStorageUser.email).then((res) =>
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
            key={contact.email}
            contact={contact}
            selectedEmail={user.selectedUser.email}
            currentEmail={localStorageUser.email}
            handleExistingChatContact={handleExistingChatContact}
          />
        ))}
      </div>
    </div>
  );
};

export default ExistingChat;
