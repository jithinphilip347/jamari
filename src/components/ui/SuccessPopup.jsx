import React from "react";
import { FaTimes } from "react-icons/fa";

const SuccessPopup = ({ message = "Successfully Completed!", onClose }) => {
  return (
    <div className="success-popup">
      <div className="success-popup-inner">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="success-icon">
          ✅
        </div>
        <p className="success-text">{message}</p>
      </div>
    </div>
  );
};

export default SuccessPopup;
