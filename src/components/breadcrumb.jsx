import React, { useState } from 'react';

// Componente Breadcrumb
const Breadcrumb = ({ items = [], separator = "/" }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li 
            key={index} 
            className={`breadcrumb-item ${item.active ? 'active' : ''}`}
            aria-current={item.active ? 'page' : undefined}
          >
            <svg class="icon icon-sm icon-secondary align-top me-1" aria-hidden="true">
                    <use href="/bootstrap-italia/dist/svg/sprites.svg#it-link"></use>
            </svg>
            {item.active ? (
              item.label
            ) : (                
                <a href={item.href}>{item.label}</a>                
            )}
            <span class="separator">{separator}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
};
export default Breadcrumb;