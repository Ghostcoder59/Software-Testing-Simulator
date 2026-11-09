import React from 'react';

export default function Overview({ setCurrentTab, stats }) {
  return (
    <div className="page-container">
      {/* Hero Welcome Card */}
      <div className="card highlight">
        <div className="card-header">
          <div>
            <h2 className="card-title">Software Engineering Laboratory Simulation Suite</h2>
            <p className="card-subtitle">
              SRM University Delhi-NCR — Department of Computer Science (Course: 23MCA153)
            </p>
          </div>
          <span className="card-tag">MCA Practical Suite</span>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
          An interactive laboratory platform covering 9 prescribed experiments across four modules:
          <strong> Software Development &amp; Design</strong>,
          <strong> Estimation &amp; Documentation</strong>,
          <strong> Testing &amp; Quality Assurance</strong>, and
          <strong> Case‑Study Workspace</strong> — plus dedicated tools for
          <strong> COCOMO Estimation</strong>, <strong>Deployment Strategies</strong>, and
          <strong> SOLID Principles (Library System)</strong>.
        </p>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button onClick={() => setCurrentTab('sdlc')} className="btn btn-primary">
            Software Development &amp; Design &rarr;
          </button>
          <button onClick={() => setCurrentTab('estimation')} className="btn btn-secondary">
            Estimation &amp; Documentation &rarr;
          </button>
          <button onClick={() => setCurrentTab('testing')} className="btn btn-secondary">
            Testing &amp; Quality &rarr;
          </button>
          <button onClick={() => setCurrentTab('case')} className="btn btn-secondary">
            Case‑Study Workspace &rarr;
          </button>
          <button onClick={() => setCurrentTab('cocomo')} className="btn btn-secondary">
            COCOMO Model &rarr;
          </button>
          <button onClick={() => setCurrentTab('deployment')} className="btn btn-secondary">
            Deployment Strategies &rarr;
          </button>
          <button onClick={() => setCurrentTab('library')} className="btn btn-secondary">
            Library System (SOLID) &rarr;
          </button>
        </div>
      </div>

      {/* Grid of Module Cards */}
      <div className="grid-2">
        {/* Module 1: Software Development & Design */}
        <div className="card">
          <div className="card-header">
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Module 1
              </span>
              <h3 className="card-title" style={{ marginTop: '0.2rem' }}>
                Software Development &amp; Design
              </h3>
            </div>
            <span className="badge badge-outline">4 Experiments</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
            SDLC models (Waterfall, Incremental, Prototyping, Agile), ATM Use Case Diagram,
            SOLID Principles, and UML Class &amp; Sequence Diagrams.
          </p>
          <button onClick={() => setCurrentTab('sdlc')} className="btn btn-secondary" style={{ width: '100%' }}>
            Open Module →
          </button>
        </div>

        {/* Module 2: Estimation & Documentation */}
        <div className="card">
          <div className="card-header">
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Module 2
              </span>
              <h3 className="card-title" style={{ marginTop: '0.2rem' }}>
                Estimation &amp; Documentation
              </h3>
            </div>
            <span className="badge badge-outline">2 Experiments</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
            Basic COCOMO cost estimation with step‑by‑step calculations, and IEEE 830 compliant
            SRS document generation for prescribed project scenarios.
          </p>
          <button onClick={() => setCurrentTab('estimation')} className="btn btn-secondary" style={{ width: '100%' }}>
            Open Module →
          </button>
        </div>

        {/* Module 3: Testing & Quality */}
        <div className="card">
          <div className="card-header">
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Module 3
              </span>
              <h3 className="card-title" style={{ marginTop: '0.2rem' }}>
                Testing &amp; Quality Assurance
              </h3>
            </div>
            <span className="badge badge-outline">2 Experiments</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
            Interactive unit testing and integration testing simulations with test runners,
            result tables, and coverage of testing approaches (Top‑Down, Bottom‑Up, Big Bang, Sandwich).
          </p>
          <button onClick={() => setCurrentTab('testing')} className="btn btn-secondary" style={{ width: '100%' }}>
            Open Module →
          </button>
        </div>

        {/* Module 4: Case-Study Workspace */}
        <div className="card">
          <div className="card-header">
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Module 4
              </span>
              <h3 className="card-title" style={{ marginTop: '0.2rem' }}>
                Case‑Study Workspace
              </h3>
            </div>
            <span className="badge badge-outline">3 Projects</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
            End‑to‑end project scenarios (Student Management, Library, Food Ordering) applying
            all 9 experiments with progress tracking and checklists.
          </p>
          <button onClick={() => setCurrentTab('case')} className="btn btn-secondary" style={{ width: '100%' }}>
            Open Module →
          </button>
        </div>

        {/* COCOMO */}
        <div className="card">
          <div className="card-header">
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Software Metrics &amp; Estimation
              </span>
              <h3 className="card-title" style={{ marginTop: '0.2rem' }}>
                Basic COCOMO Cost Model
              </h3>
            </div>
            <span className="badge badge-outline">Estimation</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
            Estimates development effort (Person-Months), project duration (Months), and team size across Organic, Semi-Detached, and Embedded modes:
            <strong className="mono" style={{ display: 'block', marginTop: '0.35rem', color: 'var(--text-primary)' }}>
              E = a·(KLOC)^b &nbsp;|&nbsp; T = c·(E)^d &nbsp;|&nbsp; Staff = E/T
            </strong>
          </p>
          <button onClick={() => setCurrentTab('cocomo')} className="btn btn-secondary" style={{ width: '100%' }}>
            Launch COCOMO Estimator
          </button>
        </div>

        {/* Deployment Strategies */}
        <div className="card">
          <div className="card-header">
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Release Engineering &amp; DevOps
              </span>
              <h3 className="card-title" style={{ marginTop: '0.2rem' }}>
                Release &amp; Deployment Strategies
              </h3>
            </div>
            <span className="badge badge-outline">DevOps</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
            Simulates progressive delivery paradigms: Blue-Green zero-downtime traffic switching, Canary percentage rollouts, and Rolling batch updates:
            <strong className="mono" style={{ display: 'block', marginTop: '0.35rem', color: 'var(--text-primary)' }}>
              Blue-Green &nbsp;•&nbsp; Canary &nbsp;•&nbsp; Rolling Fleet
            </strong>
          </p>
          <button onClick={() => setCurrentTab('deployment')} className="btn btn-secondary" style={{ width: '100%' }}>
            Launch Deployment Simulator
          </button>
        </div>

        {/* Library Management System */}
        <div className="card">
          <div className="card-header">
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Object-Oriented Design &amp; SOLID
              </span>
              <h3 className="card-title" style={{ marginTop: '0.2rem' }}>
                Library Management System
              </h3>
            </div>
            <span className="badge badge-outline">SOLID OOP</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
            Implements the five SOLID principles with polymorphic fine strategies, member quotas, storage isolation, and Email/SMS notifications:
            <strong className="mono" style={{ display: 'block', marginTop: '0.35rem', color: 'var(--text-primary)' }}>
              SRP &nbsp;•&nbsp; OCP &nbsp;•&nbsp; LSP &nbsp;•&nbsp; ISP &nbsp;•&nbsp; DIP
            </strong>
          </p>
          <button onClick={() => setCurrentTab('library')} className="btn btn-secondary" style={{ width: '100%' }}>
            Launch Library System
          </button>
        </div>
      </div>

      {/* Session Activity Stats */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Laboratory Session Activity</h3>
            <p className="card-subtitle">Live counts tracked strictly from your interactive operations in this session</p>
          </div>
          <span className="badge badge-pass">Live Metrics</span>
        </div>

        <div className="grid-4">
          <div className="stat-box">
            <div className="stat-label">COCOMO Estimates</div>
            <div className="stat-value">{stats.cocomoEstimations}</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Cost Evaluations</div>
          </div>

          <div className="stat-box">
            <div className="stat-label">Deployments Simulated</div>
            <div className="stat-value">{stats.deploymentsSimulated}</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>DevOps Actions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
