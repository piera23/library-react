import React, { useState } from 'react';

// Componente Button
const Button = ({ 
  text, 
  onClick, 
  variant = "primary", 
  size = "md", 
  outline = false,
  disabled = false,
  icon = null,
  iconPosition = "left",
  block = false,
  type = "button" 
}) => {
  const sizeClass = size === "lg" ? "btn-lg" : size === "sm" ? "btn-sm" : "";
  const variantClass = outline ? `btn-outline-${variant}` : `btn-${variant}`;
  const blockClass = block ? "btn-block" : "";
  
  return (
    <button 
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${blockClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && (
        <svg className="icon icon-sm me-1">
          <use href={`/bootstrap-italia/dist/svg/sprites.svg#${icon}`}></use>
        </svg>
      )}
      {text}
      {icon && iconPosition === "right" && (
        <svg className="icon icon-sm ms-1">
          <use href={`/bootstrap-italia/dist/svg/sprites.svg#${icon}`}></use>
        </svg>
      )}
    </button>
  );
};
export default Button;