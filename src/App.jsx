import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const App = () => {
  const [user, setUser] = useState({});
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  useEffect(() => {
    if (socket && user?.email) {
      socket.on(user?.email, (chats) => {
        setReply(chats);
      });
    }
  }, [socket]);
  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const result = jwtDecode(credentialResponse.credential);
          console.log(result.picture);
          const skt = io(`${import.meta.env.VITE_SERVER_URL}`, {
            query: {
              email: result.email,
            },
          });
          setSocket(skt);
          setUser(result);
        }}
        onError={() => {
          alert("Login Failed");
        }}
      />
      <div>{user.email}</div>
      <div
        style={{
          backgroundImage: `url(${user.picture})`,
          height: "100px",
          width: "100px",
        }}
      ></div>
      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div>
        <button
          onClick={async () => {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/`, {
              message,
              email: user.email,
            });
          }}
        >
          send
        </button>
      </div>
      hello
      <div>{reply}</div>
    </>
  );
};

export default App;
