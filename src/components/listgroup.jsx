import React, { useState } from 'react';

// Componente List Group
const ListGroup = ({ items = [], flush = false, numbered = false, selectable = false }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const flushClass = flush ? "list-group-flush" : "";
  const numberedClass = numbered ? "list-group-numbered" : "";
  
  return (
    <ul className={`list-group ${flushClass} ${numberedClass}`}>
      {items.map((item, index) => (
        <li 
          key={index} 
          className={`list-group-item ${selectable && selectedIndex === index ? 'active' : ''} ${selectable ? 'list-group-item-action' : ''}`}
          onClick={() => selectable && setSelectedIndex(index)}
          style={selectable ? { cursor: 'pointer' } : {}}
        >
          {item.icon && (
            <svg className="icon icon-sm me-2">
              <use href={`/bootstrap-italia/dist/svg/sprites.svg#${item.icon}`}></use>
            </svg>
          )}
          {item.text}
          {item.badge && (
            <Badge text={item.badge.text} variant={item.badge.variant || "primary"} size="sm" />
          )}
        </li>
      ))}
    </ul>
  );
};
export default ListGroup;