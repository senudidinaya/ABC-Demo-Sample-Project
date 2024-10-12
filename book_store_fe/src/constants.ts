declare global {
    interface Window {
      configs: {
        apiUrl: string;
        clientID: string;
        baseUrl: string;
        signInRedirectURL: string;
        signOutRedirectURL: string;
      };
    }
  }
  
  export const API_URL = window?.configs?.apiUrl
    ? window.configs.apiUrl
    : "http://localhost:8080";
  
  export const CLIENT_ID = window?.configs?.clientID
    ? window.configs.clientID
    : process.env.REACT_APP_CLIENT_ID;
  
  export const BASE_URL = window?.configs?.baseUrl
    ? window.configs.baseUrl
    : process.env.REACT_APP_BASE_URL;
  
  export const SIGN_IN_REDIRECT_URL = window?.configs?.signInRedirectURL
    ? window.configs.signInRedirectURL
    : process.env.REACT_APP_SIGN_IN_REDIRECT_URL;
  
  export const SIGN_OUT_REDIRECT_URL = window?.configs?.signOutRedirectURL
    ? window.configs.signOutRedirectURL
    : process.env.REACT_APP_SIGN_OUT_REDIRECT_URL;
  