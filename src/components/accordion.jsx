import React, { useState } from 'react';

// Componente Accordion
const Accordion = ({ items = [], alwaysOpen = false }) => {
  const [openItems, setOpenItems] = useState([]);
  
  const toggleItem = (index) => {
    if (alwaysOpen) {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };
  
  return (
    <div className="accordion" id="accordion-example">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${!openItems.includes(index) ? 'collapsed' : ''}`}
              type="button"
              onClick={() => toggleItem(index)}
            >
              {item.title}
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openItems.includes(index) ? 'show' : ''}`}>
            <div className="accordion-body">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Accordion;