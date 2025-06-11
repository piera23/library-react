import React, { useState } from 'react';

// Componente FormInput
const Input = ({ 
  label, 
  type, 
  value, 
  onChange, 
  placeholder = "", 
  required,
  helper = null 
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {helper && <small className="form-text">{helper}</small>}
    </div>
  );
};
export default Input;