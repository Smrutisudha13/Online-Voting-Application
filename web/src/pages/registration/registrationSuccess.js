/* RegistrationSuccessModal.js */
import React from "react";

const RegistrationSuccessModal = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Registration Successful!</h3>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RegistrationSuccessModal;
