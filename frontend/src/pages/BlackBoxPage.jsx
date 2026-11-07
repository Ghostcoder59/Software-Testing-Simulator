import React, { useState, useEffect } from 'react';
import {
  generateBlackboxTests,
  runBlackboxTest,
  runBlackboxSuite,
  evaluateMark
} from '../services/api';

export default function BlackBoxPage({ onTestRun, onSuiteRun }) {
  // Test Case Generation & Suite State
  const [techniqueFilter, setTechniqueFilter] = useState('ALL'); // 'ALL' | 'BVA' | 'EP'
  const [testCases, setTestCases] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    passed: 0,
    failed: 0,
    pending: 0,
    pass_rate: 0,
  });
  const [loading, setLoading] = useState(false);
  const [executingId, setExecutingId] = useState(null);
  const [tableFilter, setTableFilter] = useState('ALL'); // 'ALL' | 'PASS' | 'FAIL' | 'PENDING'

  // Interactive Single Mark Evaluator State
  const [singleInput, setSingleInput] = useState('85');
  const [singleResult, setSingleResult] = useState(null);
  const [singleLoading, setSingleLoading] = useState(false);

  // Auto-generate default test cases on mount
  useEffect(() => {
    handleGenerateTests('ALL');
  }, []);

  const handleGenerateTests = async (tech = techniqueFilter) => {
    setLoading(true);
    try {
      const data = await generateBlackboxTests(tech);
      setTestCases(data);
      setSummary({
        total: data.length,
        passed: 0,
        failed: 0,
        pending: data.length,
        pass_rate: 0,
      });
    } catch (err) {
      console.error('Error generating tests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRunSingle = async (tc) => {
    setExecutingId(tc.id);
    try {
      const updated = await runBlackboxTest(tc);
      setTestCases((prev) => {
        const next = prev.map((item) => (item.id === tc.id ? updated : item));
        // Update summary
        const p = next.filter((x) => x.status === 'PASS').length;
        const f = next.filter((x) => x.status === 'FAIL').length;
        const pend = next.filter((x) => x.status === 'PENDING').length;
        const rate = (p + f) > 0 ? Math.round((p / (p + f)) * 100) : 0;
        setSummary({
          total: next.length,
          passed: p,
          failed: f,
          pending: pend,
          pass_rate: rate,
        });
        return next;
      });
      if (onTestRun) onTestRun();
    } catch (err) {
      console.error('Failed to run test:', err);
    } finally {
      setExecutingId(null);
    }
  };

  const handleRunAll = async () => {
    if (testCases.length === 0) return;
    setLoading(true);
    try {
      const res = await runBlackboxSuite(testCases);
      setTestCases(res.results);
      setSummary({
        total: res.total,
        passed: res.passed,
        failed: res.failed,
        pending: res.pending,
        pass_rate: res.pass_rate,
      });
      if (onSuiteRun) onSuiteRun(res.total);
    } catch (err) {
      console.error('Failed to execute test suite:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetTests = () => {
    setTestCases((prev) =>
      prev.map((tc) => ({
        ...tc,
        actual_output: null,
        status: 'PENDING',
      }))
    );
    setSummary((prev) => ({
      ...prev,
      passed: 0,
      failed: 0,
      pending: prev.total,
      pass_rate: 0,
    }));
  };

  const handleEvaluateSingleMark = async (e) => {
    e.preventDefault();
    setSingleLoading(true);
    try {
      const data = await evaluateMark(singleInput);
      setSingleResult(data);
    } catch (err) {
      console.error('Failed to evaluate mark:', err);
    } finally {
      setSingleLoading(false);
    }
  };

  // Filter test cases based on table filter
  const displayedCases = testCases.filter((tc) => {
    if (tableFilter === 'ALL') return true;
    return tc.status === tableFilter;
  });

  return (
    <div className="page-container">
      {/* Overview Banner */}
      <div className="card highlight">
        <div className="card-header">
          <div>
            <h2 className="card-title">Black-Box Testing Simulator</h2>
            <p className="card-subtitle">
              Verify software behavior using Boundary Value Analysis (BVA) and Equivalence Partitioning (EP)
            </p>
          </div>
          <span className="card-tag">Functional Testing</span>
        </div>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Black-box testing derives test scenarios strictly from functional specifications without examining source code. 
          Here, we validate a college <strong>Marks-to-Grade conversion specification</strong> across valid, boundary, and invalid domains.
        </p>
      </div>

      {/* Grid: Grading Policy & Interactive Single-Value Tester */}
      <div className="grid-2">
        {/* Specification Reference */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Specification Policy: Marks to Grade</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Range: 0 – 100
            </span>
          </div>

          <div className="table-container" style={{ marginBottom: '0.75rem' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Input Range (Marks)</th>
                  <th>Expected Grade</th>
                  <th>Performance Level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mono"><strong>90 – 100</strong></td>
                  <td><strong>Grade A</strong></td>
                  <td>Excellent / Distinction</td>
                </tr>
                <tr>
                  <td className="mono"><strong>80 – 89</strong></td>
                  <td><strong>Grade B</strong></td>
                  <td>Very Good</td>
                </tr>
                <tr>
                  <td className="mono"><strong>70 – 79</strong></td>
                  <td><strong>Grade C</strong></td>
                  <td>Good / Competent</td>
                </tr>
                <tr>
                  <td className="mono"><strong>60 – 69</strong></td>
                  <td><strong>Grade D</strong></td>
                  <td>Satisfactory / Pass</td>
                </tr>
                <tr>
                  <td className="mono"><strong>0 – 59</strong></td>
                  <td><strong>Grade F</strong></td>
                  <td>Fail / Unsatisfactory</td>
                </tr>
                <tr>
                  <td className="mono"><strong>&lt; 0 or &gt; 100</strong></td>
                  <td><span className="badge badge-fail">INVALID</span></td>
                  <td>Domain Violation Rejection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Single Mark Evaluator */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Interactive Mark Tester</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Live Specification Verification
            </span>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Enter any mark value (e.g., boundary point <code>59</code>, valid <code>85</code>, or invalid <code>-5</code>) to examine its partition and validation result.
          </p>

          <form onSubmit={handleEvaluateSingleMark}>
            <div className="form-group">
              <label className="form-label">Student Mark Value</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={singleInput}
                  onChange={(e) => setSingleInput(e.target.value)}
                  placeholder="e.g. 90, 59, 101, -5"
                  className="form-input mono"
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn-primary" disabled={singleLoading}>
                  {singleLoading ? 'Testing...' : 'Test Mark'}
                </button>
              </div>
            </div>
          </form>

          {/* Quick preset buttons */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '0.2rem' }}>
              Test Quick Presets:
            </span>
            {[-1, 0, 59, 60, 89, 90, 100, 101, 'abc'].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setSingleInput(String(preset));
                  evaluateMark(preset).then(setSingleResult);
                }}
                className="btn btn-secondary btn-sm mono"
              >
                {String(preset)}
              </button>
            ))}
          </div>

          {singleResult && (
            <div className="callout" style={{ borderLeftColor: singleResult.is_valid ? '#09090b' : '#71717a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <div className="callout-title">
                  Result: <strong>{singleResult.grade}</strong>
                </div>
                <span className={`badge ${singleResult.is_valid ? 'badge-pass' : 'badge-fail'}`}>
                  {singleResult.is_valid ? 'Valid Range' : 'Invalid Range'}
                </span>
              </div>
              <div className="callout-text">{singleResult.message}</div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                <strong>Partition Class:</strong> {singleResult.partition} {singleResult.is_boundary ? '● (Boundary Point)' : ''}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Test Suite Control Center */}
      <div className="card highlight">
        <div className="card-header">
          <div>
            <h3 className="card-title">Automated Test Suite Generator & Runner</h3>
            <p className="card-subtitle">
              Generates rigorous test suites demonstrating Boundary Value Analysis and Equivalence Partitioning
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleRunAll}
              className="btn btn-primary"
              disabled={loading || testCases.length === 0}
            >
              Run Complete Test Suite ({testCases.length})
            </button>
            <button
              onClick={handleResetTests}
              className="btn btn-secondary"
              disabled={loading}
            >
              Reset Statuses
            </button>
          </div>
        </div>

        {/* Generator Filters & Summary Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Filter Technique:</span>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {['ALL', 'BVA', 'EP'].map((tech) => (
                <button
                  key={tech}
                  onClick={() => {
                    setTechniqueFilter(tech);
                    handleGenerateTests(tech);
                  }}
                  className={`btn btn-sm ${techniqueFilter === tech ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {tech === 'ALL' ? 'Combined (BVA + EP)' : tech === 'BVA' ? 'BVA Only' : 'EP Only'}
                </button>
              ))}
            </div>
          </div>

          {/* Table filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>View:</span>
            {['ALL', 'PASS', 'FAIL', 'PENDING'].map((status) => (
              <button
                key={status}
                onClick={() => setTableFilter(status)}
                className={`btn btn-sm ${tableFilter === status ? 'btn-outline' : 'btn-secondary'}`}
                style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Bar */}
        <div className="grid-4" style={{ marginBottom: '1.25rem' }}>
          <div className="stat-box">
            <div className="stat-label">Total Tests</div>
            <div className="stat-value">{summary.total}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Passed</div>
            <div className="stat-value">{summary.passed}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Failed</div>
            <div className="stat-value">{summary.failed}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Pass Rate</div>
            <div className="stat-value">{summary.pass_rate}%</div>
          </div>
        </div>

        {/* Results Table */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '90px' }}>Test ID</th>
                <th style={{ width: '130px' }}>Technique</th>
                <th style={{ width: '90px' }}>Input</th>
                <th style={{ width: '110px' }}>Expected</th>
                <th style={{ width: '110px' }}>Actual</th>
                <th style={{ width: '95px' }}>Status</th>
                <th>Selection Justification & Rationale</th>
                <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedCases.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No test cases matching current filter.
                  </td>
                </tr>
              ) : (
                displayedCases.map((tc) => (
                  <tr key={tc.id}>
                    <td className="mono"><strong>{tc.id}</strong></td>
                    <td>
                      <span className="badge badge-outline" style={{ fontSize: '0.68rem' }}>
                        {tc.technique.includes('BVA') ? 'BVA' : 'EP'}
                      </span>
                    </td>
                    <td className="mono" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                      {String(tc.input_value)}
                    </td>
                    <td className="mono" style={{ fontSize: '0.82rem' }}>
                      {tc.expected_output}
                    </td>
                    <td className="mono" style={{ fontSize: '0.82rem' }}>
                      {tc.actual_output ? (
                        <strong>{tc.actual_output}</strong>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                      )}
                    </td>
                    <td>
                      {tc.status === 'PASS' ? (
                        <span className="badge badge-pass">PASS</span>
                      ) : tc.status === 'FAIL' ? (
                        <span className="badge badge-fail">FAIL</span>
                      ) : (
                        <span className="badge badge-pending">PENDING</span>
                      )}
                    </td>
                    <td style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
                      {tc.reason}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => handleRunSingle(tc)}
                        disabled={executingId === tc.id}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.25rem 0.6rem' }}
                      >
                        {executingId === tc.id ? '...' : 'Run'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
