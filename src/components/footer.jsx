import React, { useState } from 'react';

// Componente Footer
const Footer = ({ 
  companyName, 
  links = [], 
  socialLinks = [],
  copyright = null,
  variant = "dark" 
}) => {
  const bgClass = variant === "dark" ? "bg-dark text-white" : "bg-light";
  
  return (
    <footer className={`it-footer ${bgClass}`}>
      <div className="it-footer-main">
        <div className="container">
          <section>
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <h4>{companyName}</h4>
              </div>
              <div className="col-lg-4 col-md-4">
                <h4>Link utili</h4>
                <ul className="footer-list">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-4 col-md-4">
                <h4>Seguici su</h4>
                <ul className="list-inline text-start social">
                  {socialLinks.map((social, index) => (
                    <li key={index} className="list-inline-item">
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        <svg className="icon">
                          <use href={`/bootstrap-italia/dist/svg/sprites.svg#${social.icon}`}></use>
                        </svg>
                        <span className="visually-hidden">{social.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
      {copyright && (
        <div className="it-footer-small-prints clearfix">
          <div className="container">
            <p className="mb-0">{copyright}</p>
          </div>
        </div>
      )}
    </footer>
  );
};
export default Footer;