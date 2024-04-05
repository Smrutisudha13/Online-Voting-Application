/* RegistrationPage.js */
import { useState,useRef } from "react";
import { Link , useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker";
import "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./RegistrationPage.css";
import axios from "axios";
import RegistrationSuccessModal from "./registrationSuccess";


const RegistrationPage = () => {
  const [isRegistrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const formikRef = useRef(null);
  const navigate = useNavigate();

  const resetForm = () => {
    if (formikRef.current) {
      formikRef.current.resetForm(); // Reset the form using the Formik instance
    }
  };
  const signUpService = async (values) => {
    try {
      const url = "http://localhost:5000/user/signup";
      const { data } = await axios.post(url, values);
      console.log(data);
      setRegistrationSuccessful(true);
      resetForm();
      setIsModalOpen(true); // Reset the form after successful registration
    } catch (e) {
      console.log(e);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <div className="registration-background">
      <div className="registration-container">
        <h2>Register</h2>
        <Formik
          initialValues={{
            username: "",
            password: "",
            firstName: "",
            middleName: "",
            lastName: "",
            mobileNumber: "",
            email: "",
            sex: "Male",
            age: "18",
            dateOfBirth: null,
          }}
          validationSchema={Yup.object({
            username: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
            firstName: Yup.string().required("Required"),
            middleName: Yup.string(),
            lastName: Yup.string().required("Required"),
            mobileNumber: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            sex: Yup.string().required("Required"),
            age: Yup.string().required("Required"),
          })}
          onSubmit={(values) => {
            signUpService(values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="registration-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name: </label>
                <Field type="text" id="firstName" name="firstName" />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-group">
                <label htmlFor="middleName">Middle Name: </label>
                <Field type="text" id="middleName" name="middleName" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name: </label>
                <Field type="text" id="lastName" name="lastName" />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number: </label>
                <Field type="tel" id="mobileNumber" name="mobileNumber" />
                <ErrorMessage
                  name="mobileNumber"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email: </label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="sex">Sex: </label>
                <Field as="select" id="sex" name="sex">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Binary">Do not want to disclose</option>
                </Field>
                <ErrorMessage name="sex" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age: </label>
                <Field as="select" id="age" name="age">
                  {Array.from({ length: 83 }, (_, i) => (
                    <option key={i + 18} value={i + 18}>
                      {i + 18}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="age" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth: </label>
                <DatePicker
                  id="dateOfBirth"
                  name="dateOfBirth"
                  selected={values.dateOfBirth}
                  onChange={(date) => setFieldValue("dateOfBirth", date)}
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  showMonthDropdown // Add this line to show the month dropdown
                  scrollableMonthYearDropdown // Enable scrolling in the month dropdown
                  dropdownMode="select"
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username: </label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password: </label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <button type="submit" className="register-button">
                Register
              </button>
            </Form>
          )}
        </Formik>
        {isModalOpen && (
          <RegistrationSuccessModal onClose={closeModal} />
        )}
        {isRegistrationSuccessful && !isModalOpen && (
          <div className="success-message">
            Registration Successful!
          </div>
        )}
        <p className="login-link">
          Already a User? <Link to="/user/login">Login here</Link>
        </p>
        <div className="link">
          <Link to="/">
            <b> Homepage </b>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
