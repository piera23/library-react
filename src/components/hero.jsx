import React, { useState } from 'react';

// Componente Hero parametrizzato
const Hero = ({ 
  title, 
  subtitle = null, 
  backgroundImage = null,
  overlay = true,
  ctaButton = null,
  height = "400px",
  alignment = "center" 
}) => {
  const heroStyle = backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: height,
    position: 'relative'
  } : {
    height: height,
    position: 'relative',
    backgroundColor: '#0066CC'
  };
  
  const alignmentClass = `text-${alignment}`;
  
  return (
    <div className="hero" style={heroStyle}>
      {overlay && backgroundImage && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}></div>
      )}
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-12">
            <div className={`hero-content ${alignmentClass}`} style={{ position: 'relative', zIndex: 1 }}>
              <h1 className="text-white display-4">{title}</h1>
              {subtitle && <p className="text-white lead">{subtitle}</p>}
              {ctaButton && (
                <Button 
                  text={ctaButton.text} 
                  onClick={ctaButton.onClick}
                  variant={ctaButton.variant || "primary"}
                  size="lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;