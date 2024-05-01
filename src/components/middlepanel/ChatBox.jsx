import React, { useState } from "react";
const ChatBox = () => {
  const [message, setMessage] = useState("");

  return (
    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type a message"
      type="text"
      className="w-full rounded-lg p-2 outline-none"
    />
  );
};

export default ChatBox;
