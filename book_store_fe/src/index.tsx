import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "@asgardeo/auth-react";
import {
  BASE_URL,
  CLIENT_ID,
  SIGN_IN_REDIRECT_URL,
  SIGN_OUT_REDIRECT_URL,
} from "./constants";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const authConfig = {
  clientID: CLIENT_ID || "",
  baseUrl: BASE_URL || "",
  signInRedirectURL: SIGN_IN_REDIRECT_URL || "",
  signOutRedirectURL: SIGN_OUT_REDIRECT_URL || "",
  scope: ["openid", "profile", "email"],
};

root.render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
