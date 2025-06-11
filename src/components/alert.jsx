import React, { useState } from 'react';

// Componente Alert
const Alert = ({ 
  message, 
  type = "info", 
  dismissible = false,
  onClose = () => {} 
}) => {
  const [visible, setVisible] = useState(true);
  
  if (!visible) return null;
  
  const handleClose = () => {
    setVisible(false);
    onClose();
  };
  
  return (
    <div className={`alert alert-${type} ${dismissible ? 'alert-dismissible' : ''}`} role="alert">
      {message}
      {dismissible && (
        <button type="button" className="btn-close" onClick={handleClose}>
          <svg className="icon">
            <use href="/bootstrap-italia/dist/svg/sprites.svg#it-close"></use>
          </svg>
        </button>
      )}
    </div>
  );
};
export default Alert;