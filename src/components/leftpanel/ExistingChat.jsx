import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUser,
  setCurrentUser,
  setOther,
  setSelectedUser,
} from "../../state/user/userSlice";
import {
  downloadFile,
  getChats,
  getContacts,
  readChats,
} from "../../service/chat";
import { left } from "../../state/panel/panelSlice";
import { useNavigate } from "react-router-dom";
import NewChatIcon from "../../icons/NewChatIcon";
import ExistingChatContact from "./ExistingChatContact";
import { getUser, logoutUser, setOpenProfile } from "../../service/user";
import { CiLogout } from "react-icons/ci";
const ExistingChat = () => {
  const localStorageUser = JSON.parse(localStorage.getItem("user")) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleExistingChatContact = async (contact) => {
    console.log(contact);
    if (user.selectedUser.email !== contact.email) {
      dispatch(setOther({ ...user.other, chatWindowLoading: true }));
      if (contact.unseenCount) {
        await readChats({
          from: localStorageUser.email,
          to: contact.email,
        });
        const result = await getContacts(localStorageUser.email);
        dispatch(setCurrentUser({ ...user.currentUser, contacts: result }));
      }
      const result = await getUser({ email: contact.email });
      let chats = await getChats({
        from: localStorageUser.email,
        to: contact.email,
      });
      const newChat = [];
      for (const chat of chats) {
        if (chat.type !== "text" && chat.type !== "date") {
          const result = await downloadFile(chat.message);
          newChat.push({
            ...chat,
            message: result,
          });
        } else {
          newChat.push(chat);
        }
      }
      dispatch(setOther({ ...user.other, chatWindowLoading: false }));
      dispatch(
        setSelectedUser({
          email: contact.email,
          lastSeen: result.lastSeen,
          profileImageUrl: result.profileImageUrl,
          name: result.name,
          chats: newChat,
        })
      );
      await setOpenProfile({
        email: localStorageUser.email,
        openProfile: contact.email,
      });
    }
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
              <CiLogout
                className="cursor-pointer"
                size={25}
                onClick={async () => {
                  await logoutUser({ email: localStorageUser.email });
                  localStorage.removeItem("user");
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
