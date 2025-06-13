
import React, { useState } from 'react';

const PageBuilderConcept = () => {
  const [pageConfig, setPageConfig] = useState([
    {
      id: '1',
      type: 'header',
      props: { title: 'Dashboard Admin', subtitle: 'Benvenuto nel pannello di controllo' }
    },
    {
      id: '2', 
      type: 'dynamicDashboard',
      props: {
        widgets: [
          { id: 'w1', type: 'stat', title: 'Utenti Totali', value: '1,234' },
          { id: 'w2', type: 'stat', title: 'Vendite Oggi', value: '€5,678' }
        ]
      }
    },
    {
      id: '3',
      type: 'dynamicTable', 
      props: {
        title: 'Ordini Recenti',
        data: [
          { id: 1, cliente: 'Mario Rossi', importo: '€123', stato: 'Completato' },
          { id: 2, cliente: 'Anna Verdi', importo: '€456', stato: 'In corso' }
        ]
      }
    }
  ]);

  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Libreria componenti disponibili
  const componentLibrary = [
    { type: 'header', label: '📄 Header', category: 'Layout' },
    { type: 'dynamicCard', label: '🎴 Dynamic Card', category: 'Data' },
    { type: 'dynamicForm', label: '📝 Dynamic Form', category: 'Forms' },
    { type: 'dynamicTable', label: '📊 Dynamic Table', category: 'Data' },
    { type: 'dynamicDashboard', label: '📈 Dashboard', category: 'Analytics' },
    { type: 'dynamicFilter', label: '🔍 Filtri', category: 'Controls' },
    { type: 'staticCard', label: '🏷️ Static Card', category: 'Content' },
    { type: 'button', label: '🔘 Button', category: 'Controls' },
    { type: 'navigation', label: '🧭 Navigation', category: 'Layout' },
  ];

  const renderComponent = (config) => {
    const { type, props } = config;
    
    switch (type) {
      case 'header':
        return (
          <div className="bg-primary text-white p-4 rounded mb-4">
            <h1 className="mb-1">{props.title}</h1>
            <p className="mb-0 opacity-75">{props.subtitle}</p>
          </div>
        );
        
      case 'dynamicDashboard':
        return (
          <div className="row mb-4">
            {props.widgets.map(widget => (
              <div key={widget.id} className="col-md-6 mb-3">
                <div className="card border-start border-4 border-success">
                  <div className="card-body">
                    <h6 className="text-muted">{widget.title}</h6>
                    <h3 className="text-success">{widget.value}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'dynamicTable':
        return (
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">{props.title}</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>ID</th><th>Cliente</th><th>Importo</th><th>Stato</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.data.map(row => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.cliente}</td>
                        <td>{row.importo}</td>
                        <td>
                          <span className={`badge ${row.stato === 'Completato' ? 'bg-success' : 'bg-warning'}`}>
                            {row.stato}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="alert alert-info mb-4">
            <strong>{type}</strong> - Componente in sviluppo
          </div>
        );
    }
  };

  const addComponent = (type) => {
    const newComponent = {
      id: Date.now().toString(),
      type,
      props: getDefaultProps(type)
    };
    setPageConfig([...pageConfig, newComponent]);
  };

  const getDefaultProps = (type) => {
    switch (type) {
      case 'header':
        return { title: 'Nuovo Header', subtitle: 'Sottotitolo' };
      case 'dynamicDashboard':
        return { widgets: [{ id: '1', type: 'stat', title: 'Metrica', value: '0' }] };
      case 'dynamicTable':
        return { title: 'Nuova Tabella', data: [] };
      default:
        return {};
    }
  };

  const removeComponent = (id) => {
    setPageConfig(pageConfig.filter(comp => comp.id !== id));
  };

  const moveComponent = (dragIndex, hoverIndex) => {
    const draggedComponent = pageConfig[dragIndex];
    const newConfig = [...pageConfig];
    newConfig.splice(dragIndex, 1);
    newConfig.splice(hoverIndex, 0, draggedComponent);
    setPageConfig(newConfig);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        
        {/* Sidebar - Libreria Componenti */}
        <div className="col-md-3 bg-light border-end p-3">
          <h5 className="mb-3">🧱 Componenti</h5>
          
          <div className="mb-4">
            <h6 className="text-muted">Layout</h6>
            {componentLibrary.filter(c => c.category === 'Layout').map(comp => (
              <div
                key={comp.type}
                className="p-2 mb-2 bg-white rounded border cursor-pointer hover-shadow"
                onClick={() => addComponent(comp.type)}
                style={{ cursor: 'pointer' }}
              >
                {comp.label}
              </div>
            ))}
          </div>
          
          <div className="mb-4">
            <h6 className="text-muted">Data & Analytics</h6>
            {componentLibrary.filter(c => c.category === 'Data' || c.category === 'Analytics').map(comp => (
              <div
                key={comp.type}
                className="p-2 mb-2 bg-white rounded border cursor-pointer"
                onClick={() => addComponent(comp.type)}
                style={{ cursor: 'pointer' }}
              >
                {comp.label}
              </div>
            ))}
          </div>
          
          <div className="mb-4">
            <h6 className="text-muted">Forms & Controls</h6>
            {componentLibrary.filter(c => c.category === 'Forms' || c.category === 'Controls').map(comp => (
              <div
                key={comp.type}
                className="p-2 mb-2 bg-white rounded border cursor-pointer"
                onClick={() => addComponent(comp.type)}
                style={{ cursor: 'pointer' }}
              >
                {comp.label}
              </div>
            ))}
          </div>
        </div>
        
        {/* Area Principale - Canvas */}
        <div className="col-md-6 p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>🎨 Page Builder</h4>
            <div>
              <button className="btn btn-outline-primary btn-sm me-2">
                👁️ Preview
              </button>
              <button className="btn btn-primary btn-sm">
                💾 Salva Pagina
              </button>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded shadow-sm" style={{ minHeight: '600px' }}>
            {pageConfig.length === 0 ? (
              <div className="text-center text-muted p-5">
                <h5>Inizia a costruire la tua pagina</h5>
                <p>Trascina i componenti dalla sidebar per iniziare</p>
              </div>
            ) : (
              pageConfig.map((config, index) => (
                <div
                  key={config.id}
                  className="position-relative component-wrapper"
                  style={{ border: selectedComponent === config.id ? '2px dashed #007bff' : 'none' }}
                  onClick={() => setSelectedComponent(config.id)}
                >
                  {renderComponent(config)}
                  
                  {/* Controlli componente */}
                  <div className="position-absolute top-0 end-0 p-2">
                    <button 
                      className="btn btn-sm btn-outline-secondary me-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent(config.id);
                      }}
                    >
                      ⚙️
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeComponent(config.id);
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Sidebar Destra - Proprietà */}
        <div className="col-md-3 bg-light border-start p-3">
          <h5 className="mb-3">⚙️ Proprietà</h5>
          
          {selectedComponent ? (
            <div>
              <h6>Componente Selezionato</h6>
              <div className="bg-white p-3 rounded border">
                <p><strong>Tipo:</strong> {pageConfig.find(c => c.id === selectedComponent)?.type}</p>
                <p><strong>ID:</strong> {selectedComponent}</p>
                
                <hr />
                
                <h6>Configurazione</h6>
                <div className="mb-3">
                  <label className="form-label">API Endpoint</label>
                  <input type="text" className="form-control" placeholder="/api/data" />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Titolo</label>
                  <input type="text" className="form-control" placeholder="Titolo componente" />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Stile CSS</label>
                  <textarea className="form-control" rows="3" placeholder="margin: 10px;"></textarea>
                </div>
                
                <button className="btn btn-primary btn-sm w-100">
                  Applica Modifiche
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted p-4">
              <p>Seleziona un componente per modificarne le proprietà</p>
            </div>
          )}
          
          <hr />
          
          <div>
            <h6>Azioni Pagina</h6>
            <button className="btn btn-outline-secondary btn-sm w-100 mb-2">
              📱 Modalità Mobile
            </button>
            <button className="btn btn-outline-secondary btn-sm w-100 mb-2">
              🖥️ Modalità Desktop
            </button>
            <button className="btn btn-outline-warning btn-sm w-100">
              🔄 Reset Pagina
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBuilderConcept;