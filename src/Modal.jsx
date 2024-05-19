import React from 'react';
import './Modal.css';

function Modal({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">{children}</div>
        <div className="modal-actions">
          {/* <button onClick={onClose}>Cancel</button> */}
        </div>
      </div>
    </div>
  );
}

export default Modal;
