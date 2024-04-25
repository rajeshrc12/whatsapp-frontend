import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React from "react";

const App = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const result = jwtDecode(credentialResponse.credential);
        console.log(result);
      }}
      onError={() => {
        alert("Login Failed");
      }}
    />
  );
};

export default App;
