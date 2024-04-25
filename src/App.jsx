import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";

const App = () => {
  const [user, setUser] = useState({});
  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const result = jwtDecode(credentialResponse.credential);
          console.log(result.picture);
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
    </>
  );
};

export default App;
