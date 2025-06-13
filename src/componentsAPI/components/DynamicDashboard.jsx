// components/DynamicDashboard.js
import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

const DynamicDashboard = ({
  widgets = [],
  layout = 'grid',
  refreshInterval = null,
  className = 'row'
}) => {
  const [widgetData, setWidgetData] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    loadAllWidgets();
    
    // Auto-refresh se specificato
    if (refreshInterval) {
      const interval = setInterval(() => {
        loadAllWidgets();
      }, refreshInterval * 1000);
      
      return () => clearInterval(interval);
    }
  }, [widgets, refreshInterval]);

  const loadAllWidgets = async () => {
    const promises = widgets.map(widget => loadWidget(widget));
    await Promise.allSettled(promises);
    setLastRefresh(new Date());
  };

  const loadWidget = async (widget) => {
    if (!widget.apiEndpoint) return;
    
    try {
      setLoading(prev => ({ ...prev, [widget.id]: true }));
      setErrors(prev => ({ ...prev, [widget.id]: null }));
      
      const api = new ApiService();
      const data = await api.get(widget.apiEndpoint);
      
      setWidgetData(prev => ({ ...prev, [widget.id]: data }));
    } catch (error) {
      setErrors(prev => ({ ...prev, [widget.id]: error.message }));
    } finally {
      setLoading(prev => ({ ...prev, [widget.id]: false }));
    }
  };

  const StatWidget = ({ title, value, icon, color = 'primary', subtitle, trend }) => (
    <div className={`card border-start border-5 border-${color}`}>
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">
            <h6 className="card-title text-muted mb-1">{title}</h6>
            <h3 className="mb-0">{value}</h3>
            {subtitle && <small className="text-muted">{subtitle}</small>}
            {trend && (
              <div className={`text-${trend.type === 'up' ? 'success' : 'danger'}`}>
                <i className={`fas fa-arrow-${trend.type}`}></i> {trend.value}%
              </div>
            )}
          </div>
          {icon && (
            <div className={`text-${color}`}>
              <i className={`fas ${icon} fa-2x`}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ChartWidget = ({ title, data, type = 'line', height = 200 }) => (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">{title}</h6>
      </div>
      <div className="card-body">
        <div style={{ height: `${height}px` }}>
          {/* Placeholder per il grafico - integra con Chart.js o simili */}
          <div className="d-flex align-items-center justify-content-center h-100 bg-light rounded">
            <span className="text-muted">Grafico {type} - {data?.length || 0} punti dati</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ListWidget = ({ title, items = [], maxItems = 5, renderItem }) => (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">{title}</h6>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {items.slice(0, maxItems).map((item, index) => (
            <div key={index} className="list-group-item">
              {renderItem ? renderItem(item) : (
                <div>
                  <div className="fw-bold">{item.title || item.name}</div>
                  <small className="text-muted">{item.subtitle || item.description}</small>
                </div>
              )}
            </div>
          ))}
          {items.length === 0 && (
            <div className="list-group-item text-center text-muted">
              Nessun elemento da visualizzare
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const TableWidget = ({ title, data = [], columns = [] }) => (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">{title}</h6>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-sm mb-0">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderWidget = (widget) => {
    const data = widgetData[widget.id];
    const isLoading = loading[widget.id];
    const error = errors[widget.id];

    const widgetContent = () => {
      if (isLoading) {
        return (
          <div className="card">
            <div className="card-body text-center">
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Caricamento...</span>
              </div>
              <div className="mt-2">Caricamento {widget.title}...</div>
            </div>
          </div>
        );
      }

      if (error) {
        return (
          <div className="card border-danger">
            <div className="card-body text-center">
              <div className="text-danger">
                <i className="fas fa-exclamation-triangle"></i>
                <div className="mt-2">Errore nel caricamento</div>
                <small>{error}</small>
              </div>
              <button 
                className="btn btn-sm btn-outline-danger mt-2"
                onClick={() => loadWidget(widget)}
              >
                Riprova
              </button>
            </div>
          </div>
        );
      }

      switch (widget.type) {
        case 'stat':
          return (
            <StatWidget
              title={widget.title}
              value={widget.valueExtractor ? widget.valueExtractor(data) : data?.value}
              icon={widget.icon}
              color={widget.color}
              subtitle={widget.subtitleExtractor ? widget.subtitleExtractor(data) : widget.subtitle}
              trend={widget.trendExtractor ? widget.trendExtractor(data) : widget.trend}
            />
          );
          
        case 'chart':
          return (
            <ChartWidget
              title={widget.title}
              data={widget.dataExtractor ? widget.dataExtractor(data) : data}
              type={widget.chartType}
              height={widget.height}
            />
          );
          
        case 'list':
          return (
            <ListWidget
              title={widget.title}
              items={widget.dataExtractor ? widget.dataExtractor(data) : data || []}
              maxItems={widget.maxItems}
              renderItem={widget.renderItem}
            />
          );
          
        case 'table':
          return (
            <TableWidget
              title={widget.title}
              data={widget.dataExtractor ? widget.dataExtractor(data) : data || []}
              columns={widget.columns}
            />
          );
          
        case 'custom':
          return widget.renderWidget ? widget.renderWidget(data, isLoading, error) : null;
          
        default:
          return (
            <div className="card">
              <div className="card-body">
                <h6 className="card-title">{widget.title}</h6>
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </div>
            </div>
          );
      }
    };

    return (
      <div key={widget.id} className={widget.className || 'col-md-6 col-lg-4 mb-4'}>
        {widgetContent()}
      </div>
    );
  };

  return (
    <div>
      {/* Header del dashboard */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <div>
          <small className="text-muted me-3">
            Ultimo aggiornamento: {lastRefresh.toLocaleTimeString()}
          </small>
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={loadAllWidgets}
            disabled={Object.values(loading).some(l => l)}
          >
            <i className="fas fa-sync-alt"></i> Aggiorna
          </button>
        </div>
      </div>

      {/* Widgets */}
      <div className={className}>
        {widgets.map(widget => renderWidget(widget))}
      </div>

      {widgets.length === 0 && (
        <div className="text-center p-5">
          <i className="fas fa-chart-line fa-3x text-muted"></i>
          <h4 className="mt-3 text-muted">Nessun widget configurato</h4>
          <p className="text-muted">Aggiungi dei widget per visualizzare i tuoi dati</p>
        </div>
      )}
    </div>
  );
};

export default DynamicDashboard;