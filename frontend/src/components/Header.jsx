import React from 'react';

export default function Header({ currentTab, backendStatus }) {
  const getTabLabel = () => {
    switch (currentTab) {
      case 'overview':
        return 'Overview & Dashboard';
      case 'complexity':
        return 'Experiment 8: Cyclomatic Complexity Calculator';
      case 'blackbox':
        return 'Experiment 9: Black-Box Testing Simulator';
      default:
        return 'Software Quality Simulator';
    }
  };

  return (
    <header className="app-header">
      <div className="header-title-group">
        <h1>{getTabLabel()}</h1>
        <p>Software Engineering Laboratory (SE-LAB)</p>
      </div>

      <div className="header-actions">
        <div
          className={`status-pill ${
            backendStatus === 'connected'
              ? 'connected'
              : backendStatus === 'offline'
              ? 'offline'
              : ''
          }`}
          title={
            backendStatus === 'connected'
              ? 'FastAPI backend connected at http://127.0.0.1:8000'
              : 'FastAPI backend is offline'
          }
        >
          <span className="status-dot"></span>
          <span>
            {backendStatus === 'connected'
              ? 'Backend Online (FastAPI)'
              : backendStatus === 'checking'
              ? 'Connecting to API...'
              : 'Backend Offline'}
          </span>
        </div>
      </div>
    </header>
  );
}
