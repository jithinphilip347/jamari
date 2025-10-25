import React from "react";
import { toast } from "react-hot-toast";

const DeletePopup = ({ onConfirm, onCancel }) => {
  const handleYes = () => {
    toast.success("Successfully Deleted!");
    onConfirm();
  };

  return (
    <div className="delete-popup-overlay">
      <div className="delete-popup">
        <div className="delete-icon">🗑️</div>
        <p className="delete-text">Are you sure you want to delete?</p>
        <div className="button-group">
          <button className="yes-btn" onClick={handleYes}>
            Yes
          </button>
          <button className="no-btn" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
