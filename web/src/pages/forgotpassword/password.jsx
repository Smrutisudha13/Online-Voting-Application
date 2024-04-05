import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <p>Enter your email address to reset your password.</p>
        <form className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="reset-password-button"
            onClick={() => setMessage("A password reset link has been sent to your email.")}
          >
            Reset Password
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="links-container">
        <div className="link">
          <Link to="/user/login">
            <b> <u>Login Page </u></b>
          </Link>
        </div>
        <div className="link">
          <Link to="/">
            <b><u> Homepage </u></b>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
