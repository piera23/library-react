import React, { useState } from 'react';
// Componente Header
const Header = ({ 
  title = "Titolo Sito", 
  subtitle = "", 
  logoSrc = null,
  menuItems = [],
  variant = "primary",
  sticky = false 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className={`it-header-wrapper ${sticky ? 'it-header-sticky' : ''}`}>
      <div className="it-header-slim-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="it-header-slim-wrapper-content">
                <span className="d-lg-block navbar-brand">
                  {subtitle}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="it-nav-wrapper">
        <header className={`it-header-center-wrapper theme-${variant}`}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="it-header-center-content-wrapper">
                  <div className="it-brand-wrapper">
                    <a href="/">
                      {logoSrc && <img src={logoSrc} alt="logo" height="50" />}
                      <div className="it-brand-text">
                        <div className="it-brand-title">{title}</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <div className="it-header-navbar-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav className="navbar navbar-expand-lg has-megamenu">
                  <button 
                    className="custom-navbar-toggler" 
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <svg className="icon">
                      <use href="/bootstrap-italia/dist/svg/sprites.svg#it-burger"></use>
                    </svg>
                  </button>
                  <div className={`navbar-collapsable ${isMenuOpen ? 'expanded' : ''}`}>
                    <div className="menu-wrapper">
                      <ul className="navbar-nav">
                        {menuItems.map((item, index) => (
                          <li key={index} className="nav-item">
                            <a className="nav-link" href={item.href}>
                              <span>{item.label}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;