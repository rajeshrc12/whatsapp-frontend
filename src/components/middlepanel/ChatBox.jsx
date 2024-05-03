import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContacts, sendChats } from "../../service/chat";
import { setCurrentUser, updateChats } from "../../state/user/userSlice";
import { getUser } from "../../service/user";
const ChatBox = () => {
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleMessage = async (e) => {
    if (e.key === "Enter" && message.trim()) {
      setMessage("");
      const result = await getUser({ email: user.selectedUser.email });
      const chat = {
        from: localStorageUser.email,
        to: user.selectedUser.email,
        type: "text",
        message,
        seen: result.openProfile === localStorageUser.email ? true : false,
      };
      await sendChats({
        from: localStorageUser.email,
        to: user.selectedUser.email,
        chat: [chat],
      });
      dispatch(
        updateChats([
          {
            ...chat,
            createdAt: String(new Date()),
            _id: new Date().getTime(),
          },
        ])
      );
      const resultContacts = await getContacts(localStorageUser.email);
      dispatch(
        setCurrentUser({ ...user.currentUser, contacts: resultContacts })
      );
    }
  };
  return (
    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type a message"
      type="text"
      className="w-full rounded-lg p-2 outline-none"
      onKeyDown={handleMessage}
    />
  );
};

export default ChatBox;
