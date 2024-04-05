import React, { useEffect, createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import axios from "./connector";
import Header from "./pages/header";

export const CurrentUserContext = createContext({
  currentUser: {},
});

const RouteWithContext = () => {
  const [currentUser, setCurrentUser] = useState({});

  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/user");
      const data = await response.data;
      setCurrentUser(data.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <RouterProvider router={router} />
    </CurrentUserContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouteWithContext />
  </React.StrictMode>
);

reportWebVitals();