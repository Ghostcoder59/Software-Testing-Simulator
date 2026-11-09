import React, { useState } from 'react';

const tabs = [
  { id: 'unit', label: 'Unit Testing' },
  { id: 'integration', label: 'Integration Testing' },
];

function UnitTestingPanel() {
  const [results, setResults] = useState([]);
  const [running, setRunning] = useState(false);

  const testCases = [
    { id: 'UT-001', name: 'Add two positive numbers', module: 'Calculator', input: 'add(2, 3)', expected: '5', actual: '5', status: 'pass' },
    { id: 'UT-002', name: 'Add negative numbers', module: 'Calculator', input: 'add(-1, -5)', expected: '-6', actual: '-6', status: 'pass' },
    { id: 'UT-003', name: 'Divide by zero', module: 'Calculator', input: 'divide(10, 0)', expected: 'Error', actual: 'Error', status: 'pass' },
    { id: 'UT-004', name: 'String concatenation', module: 'StringUtils', input: 'concat("Hello", " World")', expected: '"Hello World"', actual: '"Hello World"', status: 'pass' },
    { id: 'UT-005', name: 'Empty string length', module: 'StringUtils', input: 'length("")', expected: '0', actual: '0', status: 'pass' },
    { id: 'UT-006', name: 'Array sort ascending', module: 'ArrayUtils', input: 'sort([3,1,2])', expected: '[1,2,3]', actual: '[1,2,3]', status: 'pass' },
    { id: 'UT-007', name: 'Null input handling', module: 'Validator', input: 'validate(null)', expected: 'false', actual: 'false', status: 'pass' },
    { id: 'UT-008', name: 'Email validation (valid)', module: 'Validator', input: 'isEmail("a@b.com")', expected: 'true', actual: 'true', status: 'pass' },
    { id: 'UT-009', name: 'Email validation (invalid)', module: 'Validator', input: 'isEmail("not-email")', expected: 'false', actual: 'false', status: 'pass' },
    { id: 'UT-010', name: 'Boundary: max integer', module: 'Calculator', input: 'add(MAX_INT, 1)', expected: 'Overflow Error', actual: 'Overflow Error', status: 'pass' },
  ];

  const runTests = () => {
    setRunning(true);
    setResults([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < testCases.length) {
        setResults((prev) => [...prev, testCases[i]]);
        i++;
      } else {
        clearInterval(interval);
        setRunning(false);
      }
    }, 200);
  };

  return (
    <div>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">Experiment 7 – Unit Testing Simulation</h3>
            <p className="card-subtitle">Test individual modules in isolation</p>
          </div>
          <span className="badge badge-outline">White-Box</span>
        </div>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.75rem' }}>
          Unit testing verifies that individual units (functions, methods) of source code work correctly in isolation.
          Each test targets a single responsibility with known inputs and expected outputs.
        </p>
        <button onClick={runTests} disabled={running} className="btn btn-primary" style={{ marginTop: '0.75rem' }}>
          {running ? 'Running Tests…' : 'Run All Unit Tests'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Test Results</h3>
            <span className="badge badge-pass">{results.length} / {testCases.length} executed</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', marginTop: '0.75rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>ID</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Test Name</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Module</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Input</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Expected</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Actual</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((tc) => (
                  <tr key={tc.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.5rem', fontWeight: 600 }}>{tc.id}</td>
                    <td style={{ padding: '0.5rem' }}>{tc.name}</td>
                    <td style={{ padding: '0.5rem' }}><span className="badge badge-outline">{tc.module}</span></td>
                    <td style={{ padding: '0.5rem', fontFamily: 'monospace', fontSize: '0.78rem' }}>{tc.input}</td>
                    <td style={{ padding: '0.5rem', fontFamily: 'monospace', fontSize: '0.78rem' }}>{tc.expected}</td>
                    <td style={{ padding: '0.5rem', fontFamily: 'monospace', fontSize: '0.78rem' }}>{tc.actual}</td>
                    <td style={{ padding: '0.5rem' }}>
                      <span className={`badge ${tc.status === 'pass' ? 'badge-pass' : 'badge-fail'}`}>
                        {tc.status === 'pass' ? '✓ Pass' : '✗ Fail'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function IntegrationTestingPanel() {
  const [results, setResults] = useState([]);
  const [running, setRunning] = useState(false);

  const testCases = [
    { id: 'IT-001', name: 'User registration → Login flow', modules: 'Auth + DB', input: 'Register user, then login', expected: 'Session token returned', actual: 'Session token returned', status: 'pass' },
    { id: 'IT-002', name: 'Order → Payment processing', modules: 'Order + Payment', input: 'Place order, process payment', expected: 'Order confirmed, payment success', actual: 'Order confirmed, payment success', status: 'pass' },
    { id: 'IT-003', name: 'Cart → Inventory check', modules: 'Cart + Inventory', input: 'Add item to cart', expected: 'Stock decremented', actual: 'Stock decremented', status: 'pass' },
    { id: 'IT-004', name: 'API → Database persistence', modules: 'REST API + DB', input: 'POST /api/users', expected: 'Record created in DB', actual: 'Record created in DB', status: 'pass' },
    { id: 'IT-005', name: 'Email notification after order', modules: 'Order + Notification', input: 'Complete order', expected: 'Confirmation email sent', actual: 'Confirmation email sent', status: 'pass' },
    { id: 'IT-006', name: 'Search → Cache → DB fallback', modules: 'Search + Cache + DB', input: 'Search query', expected: 'Results from cache or DB', actual: 'Results from cache or DB', status: 'pass' },
  ];

  const runTests = () => {
    setRunning(true);
    setResults([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < testCases.length) {
        setResults((prev) => [...prev, testCases[i]]);
        i++;
      } else {
        clearInterval(interval);
        setRunning(false);
      }
    }, 350);
  };

  const approaches = [
    { name: 'Top‑Down', description: 'Start testing from the top module, replacing lower modules with stubs.', pros: 'Early validation of high‑level logic', cons: 'Stubs needed for lower modules' },
    { name: 'Bottom‑Up', description: 'Start testing from the lowest modules, using drivers for higher modules.', pros: 'No stubs needed, easier to test utilities', cons: 'UI tested last' },
    { name: 'Big Bang', description: 'All modules are integrated at once and tested as a whole.', pros: 'Simple for small systems', cons: 'Hard to isolate faults' },
    { name: 'Sandwich / Hybrid', description: 'Combines top‑down and bottom‑up approaches simultaneously.', pros: 'Balanced coverage', cons: 'Complex to manage' },
  ];

  return (
    <div>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">Experiment 8 – Integration Testing Simulation</h3>
            <p className="card-subtitle">Test module interactions and data flow</p>
          </div>
          <span className="badge badge-outline">Integration</span>
        </div>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.75rem' }}>
          Integration testing verifies that different modules or services work correctly together. It focuses on
          data flow, API contracts, and interaction between components.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <h4>Integration Testing Approaches</h4>
        <div className="grid-2" style={{ marginTop: '0.75rem' }}>
          {approaches.map((a) => (
            <div className="stat-box" key={a.name}>
              <div className="stat-label">{a.name}</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>{a.description}</p>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                <strong>+</strong> {a.pros} &nbsp;|&nbsp; <strong>–</strong> {a.cons}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <button onClick={runTests} disabled={running} className="btn btn-primary">
          {running ? 'Running Integration Tests…' : 'Run All Integration Tests'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Integration Test Results</h3>
            <span className="badge badge-pass">{results.length} / {testCases.length} executed</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', marginTop: '0.75rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>ID</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Test Name</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Modules</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Expected</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Actual</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((tc) => (
                  <tr key={tc.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.5rem', fontWeight: 600 }}>{tc.id}</td>
                    <td style={{ padding: '0.5rem' }}>{tc.name}</td>
                    <td style={{ padding: '0.5rem' }}><span className="badge badge-outline">{tc.modules}</span></td>
                    <td style={{ padding: '0.5rem', fontSize: '0.78rem' }}>{tc.expected}</td>
                    <td style={{ padding: '0.5rem', fontSize: '0.78rem' }}>{tc.actual}</td>
                    <td style={{ padding: '0.5rem' }}>
                      <span className={`badge ${tc.status === 'pass' ? 'badge-pass' : 'badge-fail'}`}>
                        {tc.status === 'pass' ? '✓ Pass' : '✗ Fail'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TestingPage() {
  const [activeTab, setActiveTab] = useState('unit');

  return (
    <div className="page-container">
      <div className="card highlight">
        <div className="card-header">
          <div>
            <h2 className="card-title">Module 3: Testing &amp; Quality Assurance</h2>
            <p className="card-subtitle">Unit Testing &amp; Integration Testing Simulations</p>
          </div>
          <span className="card-tag">2 Experiments</span>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Simulate unit‑level and integration‑level testing strategies with interactive test runners,
          demonstrating test case design, execution, and result analysis.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`btn ${activeTab === t.id ? 'btn-primary' : 'btn-secondary'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'unit' ? <UnitTestingPanel /> : <IntegrationTestingPanel />}
    </div>
  );
}

