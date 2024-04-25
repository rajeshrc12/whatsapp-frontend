import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider
    clientId={
      "191937258544-7i3v8hrc5ffbc68h4p0hhfuknri2ra3o.apps.googleusercontent.com"
    }
  >
    <App />
  </GoogleOAuthProvider>
);
