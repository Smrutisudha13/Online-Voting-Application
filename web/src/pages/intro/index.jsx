/* IntroPage.jsx */

import React, { useState, useEffect, useContext } from "react";
import "../intro/intro.css";
import { Link } from "react-router-dom";
import axios from "../../connector";
import { CurrentUserContext } from "../../index";
import Header from "../header";

const IntroPage = (props) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [introContent, setIntroContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/intro");
      const data = response.data;
      setIntroContent(data.payload);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="header-section">
        <Header isLoggedIn={currentUser ? true : false} />
      </div>
      <div className="intro-section">
        <div className="background">
          <div className="intro-page">
            {/* Add the introduction message below */}
            <div className="intro-message">
              <h1>Welcome to Our Online Voting App</h1>
              <b><p>
                Are you ready to make your voice heard and shape the future?
                Welcome to our Online Voting App, where civic participation
                meets digital convenience.
                </p>
                <p>Our platform empowers you to engage in the democratic process
                from the comfort of your home, office, or anywhere with an
                internet connection.</p>
                <p> With a user-friendly interface and robust
                security measures, your vote is safe and your voice matters.
                Join us in shaping the future, one vote at a time. Let your
                voice be counted, and together, we'll build a brighter
                tomorrow.
              </p></b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroPage;
