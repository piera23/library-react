import React, { useState } from 'react';

// Componente Badge
const Badge = ({ text, variant = "primary", pill = false, size = "md" }) => {
  const pillClass = pill ? "rounded-pill" : "";
  const sizeClass = size === "sm" ? "badge-sm" : size === "lg" ? "badge-lg" : "";
  
  return (
    <span className={`badge bg-${variant} ${pillClass} ${sizeClass}`}>
      {text}
    </span>
  );
};
export default Badge;