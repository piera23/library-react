import React, { useState } from 'react';

// Componente FormTextarea
const Textarea = ({ 
  label, 
  value, 
  onChange, 
  rows, 
  placeholder = "", 
  required = false 
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        className="form-control"
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};
export default Textarea;