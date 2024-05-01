import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendChats } from "../../service/chat";
import { updateChats } from "../../state/user/userSlice";
const localStorageUser = JSON.parse(localStorage.getItem("user"));
const ChatBox = () => {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleMessage = async (e) => {
    if (e.key === "Enter" && message.trim()) {
      setMessage("");
      const chat = {
        from: localStorageUser.email,
        to: user.selectedUser.email,
        type: "text",
        message,
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
