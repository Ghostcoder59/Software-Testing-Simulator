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
          An interactive laboratory platform providing practical, mathematical, and algorithmic simulations for 
          core Software Engineering disciplines: <strong>Structural White-Box Testing (EXP-8)</strong>, 
          <strong>Functional Black-Box Testing (EXP-9)</strong>, <strong>Project Cost & Effort Estimation (EXP-3)</strong>, 
          and <strong>Modern DevOps Deployment Strategies (EXP-9)</strong>.
        </p>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button onClick={() => setCurrentTab('complexity')} className="btn btn-primary">
            EXP-8: Cyclomatic Complexity &rarr;
          </button>
          <button onClick={() => setCurrentTab('blackbox')} className="btn btn-secondary">
            EXP-9: Black-Box Testing &rarr;
          </button>
          <button onClick={() => setCurrentTab('cocomo')} className="btn btn-secondary">
            EXP-3: COCOMO Model &rarr;
          </button>
          <button onClick={() => setCurrentTab('deployment')} className="btn btn-secondary">
            EXP-9: Deployment Strategies &rarr;
          </button>
        </div>
      </div>

      {/* Grid of 4 Module Cards */}
      <div className="grid-2">
        {/* Module 1: Cyclomatic Complexity */}
        <div className="card">
          <div className="card-header">
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                White-Box Testing
              </span>
              <h3 className="card-title" style={{ marginTop: '0.2rem' }}>
                Cyclomatic Complexity (EXP-8)
              </h3>
            </div>
            <span className="badge badge-outline">EXP-8</span>
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
            Measures the number of linearly independent execution paths through a program using Control Flow Graphs (CFG):
            <strong className="mono" style={{ display: 'block', marginTop: '0.35rem', color: 'var(--text-primary)' }}>
              V(G) = E - N + 2P
            </strong>
          </p>

          <button onClick={() => setCurrentTab('complexity')} className="btn btn-secondary" style={{ width: '100%' }}>
            Launch EXP-8 Calculator
          </button>
        </div>

        {/* Module 2: Black-Box Testing */}
        <div className="card">
          <div className="card-header">
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Black-Box Testing
              </span>
              <h3 className="card-title" style={{ marginTop: '0.2rem' }}>
                BVA & Equivalence Partitioning (EXP-9)
              </h3>
            </div>
            <span className="badge badge-outline">EXP-9</span>
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
            Validates functional specifications using Boundary Value Analysis and Equivalence Partitioning on a college grading policy:
            <strong className="mono" style={{ display: 'block', marginTop: '0.35rem', color: 'var(--text-primary)' }}>
              Marks-to-Grade Validation (0 – 100)
            </strong>
          </p>

          <button onClick={() => setCurrentTab('blackbox')} className="btn btn-secondary" style={{ width: '100%' }}>
            Launch EXP-9 Testing Simulator
          </button>
        </div>

        {/* Module 3: COCOMO Cost Estimation */}
        <div className="card">
          <div className="card-header">
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Software Metrics & Estimation
              </span>
              <h3 className="card-title" style={{ marginTop: '0.2rem' }}>
                Basic COCOMO Cost Model (EXP-3)
              </h3>
            </div>
            <span className="badge badge-outline">EXP-3</span>
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
            Estimates development effort (Person-Months), project duration (Months), and team size across Organic, Semi-Detached, and Embedded modes:
            <strong className="mono" style={{ display: 'block', marginTop: '0.35rem', color: 'var(--text-primary)' }}>
              E = a·(KLOC)^b &nbsp;|&nbsp; T = c·(E)^d &nbsp;|&nbsp; Staff = E/T
            </strong>
          </p>

          <button onClick={() => setCurrentTab('cocomo')} className="btn btn-secondary" style={{ width: '100%' }}>
            Launch EXP-3 COCOMO Estimator
          </button>
        </div>

        {/* Module 4: Deployment Strategies */}
        <div className="card">
          <div className="card-header">
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Release Engineering & DevOps
              </span>
              <h3 className="card-title" style={{ marginTop: '0.2rem' }}>
                Deployment Strategies (EXP-9)
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
      </div>

      {/* Real Statistics Tracking */}
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
            <div className="stat-label">Complexity Calculations</div>
            <div className="stat-value">{stats.complexityCalculations}</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>EXP-8 Evaluations</div>
          </div>

          <div className="stat-box">
            <div className="stat-label">Tests Cases Executed</div>
            <div className="stat-value">{stats.testsExecuted}</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>EXP-9 Executions</div>
          </div>

          <div className="stat-box">
            <div className="stat-label">COCOMO Estimates</div>
            <div className="stat-value">{stats.cocomoEstimations}</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>EXP-3 Evaluations</div>
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
