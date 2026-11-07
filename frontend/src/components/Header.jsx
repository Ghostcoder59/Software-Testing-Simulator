import React from 'react';

export default function Header({ currentTab, backendStatus }) {
  const getTabLabel = () => {
    switch (currentTab) {
      case 'overview':
        return 'Overview & Laboratory Dashboard';
      case 'complexity':
        return 'Cyclomatic Complexity Calculator';
      case 'blackbox':
        return 'Black-Box Testing Simulator';
      case 'cocomo':
        return 'Basic COCOMO Cost & Effort Estimation';
      case 'deployment':
        return 'Release & Deployment Strategies';
      default:
        return 'Software Quality Simulator';
    }
  };

  return (
    <header className="app-header">
      <div className="header-title-group">
        <h1>{getTabLabel()}</h1>
        <p>Software Engineering Laboratory (23MCA153)</p>
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
              ? 'FastAPI backend connected'
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
