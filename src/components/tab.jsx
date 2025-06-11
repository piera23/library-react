import React, { useState } from 'react';

// Componente Tab 
const Tab = ({ tabs = [], defaultActiveTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  
  return (
    <div>
      <ul className="nav nav-tabs mb-3" role="tablist">
        {tabs.map((tab, index) => (
          <li key={index} className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === index ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveTab(index)}
              role="tab"
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`}
            role="tabpanel"
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Tab;