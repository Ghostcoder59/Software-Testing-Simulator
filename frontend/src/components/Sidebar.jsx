import React from 'react';

export default function Sidebar({ currentTab, setCurrentTab }) {
  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    // New primary modules – placeholder icons
    {
      id: 'sdlc',
      label: 'Software Development & Design',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="8" />
        </svg>
      ),
    },
    {
      id: 'estimation',
      label: 'Estimation & Documentation',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      ),
    },
    {
      id: 'testing',
      label: 'Testing & Quality',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12h16" />
          <path d="M12 4v16" />
        </svg>
      ),
    },
    {
      id: 'case',
      label: 'Case‑Study Workspace',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      ),
    },
    {
      id: 'cocomo',
      label: 'COCOMO Cost Estimation',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      id: 'deployment',
      label: 'Deployment Strategies',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      id: 'library',
      label: 'Library System (SOLID)',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="app-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-icon">SQ</div>
        <div>
          <div className="sidebar-title">SQT Simulator</div>
          <div className="sidebar-subtitle">Software Engineering Lab</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`nav-item ${currentTab === item.id ? 'active' : ''}`}
          >
            {item.icon}
            <span style={{ flex: 1 }}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div><strong>Academic Suite</strong></div>
        <div style={{ color: 'var(--text-muted)', marginTop: '0.2rem' }}>FastAPI + React Vite</div>
      </div>
    </aside>
  );
}
