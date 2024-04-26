import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContacts, sendChats } from "../../service/chat";
import { setCurrentUser, updateChats } from "../../state/user/userSlice";
const ChatBox = () => {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleMessage = async (e) => {
    if (e.key === "Enter" && message.trim()) {
      setMessage("");
      const chat = {
        from: user.currentUser.email,
        to: user.selectedUser.email,
        type: "text",
        message,
      };
      await sendChats({
        from: user.currentUser.email,
        to: user.selectedUser.email,
        chat: [chat],
      });
      const res = await getContacts(user?.currentUser.email);
      dispatch(setCurrentUser({ ...user.currentUser, contacts: res }));
      dispatch(
        updateChats([
          {
            ...chat,
            createdAt: String(new Date()),
            _id: new Date().getTime(),
          },
        ])
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
