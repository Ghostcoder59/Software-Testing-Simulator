import React from 'react';

export default function Overview({ setCurrentTab, stats }) {
  return (
    <div className="page-container">
      {/* Hero Welcome Card */}
      <div className="card highlight">
        <div className="card-header">
          <div>
            <h2 className="card-title">Software Quality and Testing Simulator</h2>
            <p className="card-subtitle">
              College of Engineering — Software Engineering Laboratory Simulation Suite
            </p>
          </div>
          <span className="card-tag">Academic Edition</span>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
          This simulation platform provides practical, interactive verification tools for two essential 
          disciplines in software engineering: <strong>White-Box Structural Analysis (EXP-8)</strong> via 
          Cyclomatic Complexity and <strong>Black-Box Behavioral Verification (EXP-9)</strong> via 
          Boundary Value Analysis and Equivalence Partitioning.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentTab('complexity')}
            className="btn btn-primary"
          >
            Launch Cyclomatic Complexity (EXP-8) &rarr;
          </button>
          <button
            onClick={() => setCurrentTab('blackbox')}
            className="btn btn-secondary"
          >
            Launch Black-Box Testing (EXP-9) &rarr;
          </button>
        </div>
      </div>

      {/* Module Overview Cards */}
      <div className="grid-2">
        {/* Module A */}
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

          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.25rem' }}>
            Measures the number of linearly independent paths through program source code using McCabe's Control Flow Graph (CFG) formula:
            <br />
            <strong className="mono" style={{ display: 'block', marginTop: '0.4rem', color: 'var(--text-primary)' }}>
              V(G) = E - N + 2P
            </strong>
          </p>

          <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
            <li>Validation engine verifying $E \ge N - P$ graph consistency</li>
            <li>Step-by-step arithmetic derivation of basis paths</li>
            <li>McCabe risk rating and maintenance refactoring guidance</li>
            <li>Interactive visual Control Flow Graph canvas</li>
          </ul>

          <button
            onClick={() => setCurrentTab('complexity')}
            className="btn btn-secondary"
            style={{ width: '100%' }}
          >
            Open EXP-8 Module
          </button>
        </div>

        {/* Module B */}
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

          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.25rem' }}>
            Validates software against specifications without access to source code, focusing on defect-prone boundary regions and equivalence classes:
            <br />
            <strong className="mono" style={{ display: 'block', marginTop: '0.4rem', color: 'var(--text-primary)' }}>
              Marks-to-Grade Validation System (0 – 100)
            </strong>
          </p>

          <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
            <li>Boundary Value Analysis (Min-1, Min, Nominal, Max, Max+1, thresholds)</li>
            <li>Equivalence Partitioning (disjoint valid and invalid classes)</li>
            <li>Interactive single-mark testing sandbox with instant partition feedback</li>
            <li>Automated batch test runner with PASS/FAIL metrics</li>
          </ul>

          <button
            onClick={() => setCurrentTab('blackbox')}
            className="btn btn-secondary"
            style={{ width: '100%' }}
          >
            Open EXP-9 Module
          </button>
        </div>
      </div>

      {/* Real Statistics Tracking */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Laboratory Session Activity</h3>
            <p className="card-subtitle">Live metrics collected exclusively from your interactive operations</p>
          </div>
          <span className="badge badge-pass">Live Tracking</span>
        </div>

        <div className="grid-3">
          <div className="stat-box">
            <div className="stat-label">Complexity Calculations</div>
            <div className="stat-value">{stats.complexityCalculations}</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              CFG equations evaluated
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-label">Individual Tests Run</div>
            <div className="stat-value">{stats.testsExecuted}</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Single test cases executed
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-label">Complete Suites Run</div>
            <div className="stat-value">{stats.suitesRun}</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Full test suites executed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
