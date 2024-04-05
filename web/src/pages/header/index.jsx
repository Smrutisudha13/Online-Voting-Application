import React, { useState, useContext, useEffect } from "react";
import "./header.css";
import { CurrentUserContext } from "../../index";
import { Link, useNavigate } from "react-router-dom";

const Header = (props) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleNameHover = () => {
    setShowDropdown(true);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/user/login");
  };

  const handleDropdownClose = () => {
    setShowDropdown(false);
  };

  return (
    <div className="header-container">
      <div className="navbar">
        <Link className="logo" to="/">
          <img src="/logo.png" alt="Logo" style={{ width: 90 }} />
        </Link>
        <div className="nav-buttons">
          <Link to="/user/login">
            <button className="nav-button">Login</button>
          </Link>
          <Link to="/user/registration">
            <button className="nav-button">Registration</button>
          </Link>
          <Link to="/user/forgotpassword">
            <button className="nav-button">Reset Password</button>
          </Link>
          <Link to="/user/details">
            <button className="nav-button">User Details</button>
          </Link>
          <Link to="/user/voting">
            <button className="nav-button">Vote</button>
          </Link>
        </div>
        {currentUser && (
          <div className="name" onMouseEnter={handleNameHover}>
            {username}
            {showDropdown && (
              <div className="dropdown" onMouseLeave={handleDropdownClose}>
                <Link to="/user/profile" className="dropdown-link">
                  User Profile
                </Link>
                <Link to="/user/settings" className="dropdown-link">
                  Settings
                </Link>
                <button className="logout-button" onClick={handleLogoutClick}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
