import React, { useState } from 'react';

// Componente FormSelect
const Select = ({ 
  label, 
  value, 
  onChange,
  optionZero, 
  options, 
  required 
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="select-wrapper">
        <select
          className="form-control"
          value={value}
          onChange={onChange}
          required={required}
        >
          <option value="">{optionZero}</option>
          {options.map((option, idx) => (
            <option key={idx} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default Select;