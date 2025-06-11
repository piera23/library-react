import React, { useState } from 'react';

// Componente Progress
const Progress = ({ value, max = 100, label = null, variant = "primary", striped = false, animated = false }) => {
  const percentage = (value / max) * 100;
  const stripedClass = striped ? "progress-bar-striped" : "";
  const animatedClass = animated ? "progress-bar-animated" : "";
  
  return (
    <div className="progress">
      <div 
        className={`progress-bar bg-${variant} ${stripedClass} ${animatedClass}`}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax={max}
      >
        {label || `${percentage}%`}
      </div>
    </div>
  );
};
export default Progress;