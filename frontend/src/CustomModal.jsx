// CustomModal.jsx
import React from "react";
import "./CustomModal.css";

const CustomModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <span className="modal-icon">✉️</span>
        </div>
        <h3>Did you know?</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm}>Okay</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
