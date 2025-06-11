import React, { useState } from 'react';

// Componente Modal
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = "md",
  footer = null 
}) => {
  if (!isOpen) return null;
  
  const sizeClass = size === "lg" ? "modal-lg" : size === "sm" ? "modal-sm" : "";
  
  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className={`modal-dialog ${sizeClass}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          {footer && (
            <div className="modal-footer">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Modal;