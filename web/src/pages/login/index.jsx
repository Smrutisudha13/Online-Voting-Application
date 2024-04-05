import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginPage.css";
import axios from "axios";

function LoginPage() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        values
      );
      const { access_token, username } = response.data; 
      console.log("Token",access_token)
      console.log("Token",username)
      localStorage.setItem("token", access_token);
      localStorage.setItem("username", username);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="registration-background">
      <div className="registration-container">
        <h2>Login</h2>
        <p className="login-message">
          <b>Please Enter Your Login ID and Password.</b>
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="registration-form">
              {" "}
              {/* Use the same form class */}
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <button
                type="submit"
                className="register-button"
                disabled={isSubmitting}
              >
                {" "}
                {/* Use the same button style */}
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="login-link">
          <b>New User?</b> <Link to="/user/registration"><u>Register here</u></Link>{" "}
          {/* Use the same link style */}
        </p>
        <p className="forgot-password-link">
          <Link to="/user/forgotpassword"><u>Forgot Password?</u></Link>
        </p>
        <div className="link">
          <Link to="/">
            <b><u> Homepage</u> </b>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
