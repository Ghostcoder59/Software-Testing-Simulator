import React, { useState, useEffect } from 'react';
import { estimateCocomo } from '../services/api';

export default function CocomoPage({ onEstimatePerformed }) {
  const [kloc, setKloc] = useState(50);
  const [mode, setMode] = useState('semi-detached');
  const [costPerPm, setCostPerPm] = useState(5000);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const presets = [
    { label: 'Organic (10 KLOC)', kloc: 10, mode: 'organic', cost: 5000 },
    { label: 'Semi-Detached (50 KLOC) [Lab Manual]', kloc: 50, mode: 'semi-detached', cost: 5000 },
    { label: 'Embedded (100 KLOC)', kloc: 100, mode: 'embedded', cost: 7500 },
  ];

  const handleCalculate = async (size = kloc, selectedMode = mode, rate = costPerPm) => {
    setLoading(true);
    setError(null);
    try {
      const data = await estimateCocomo(size, selectedMode, rate);
      setResult(data);
      if (onEstimatePerformed) onEstimatePerformed();
    } catch (err) {
      setError(err.message || 'Failed to calculate COCOMO estimate.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCalculate(50, 'semi-detached', 5000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCalculate(kloc, mode, costPerPm);
  };

  const handleApplyPreset = (p) => {
    setKloc(p.kloc);
    setMode(p.mode);
    setCostPerPm(p.cost);
    handleCalculate(p.kloc, p.mode, p.cost);
  };

  return (
    <div className="page-container">
      {/* Banner */}
      <div className="card highlight">
        <div className="card-header">
          <div>
            <h2 className="card-title">Basic COCOMO Cost & Effort Estimation (EXP-3)</h2>
            <p className="card-subtitle">
              Barry Boehm's Constructive Cost Model for Software Resource Planning
            </p>
          </div>
          <span className="card-tag">Experiment 3</span>
        </div>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Basic COCOMO estimates software development effort ($E$), duration ($T$), and team size ($P$) 
          empirically based on software size in <strong>KLOC</strong> (Thousands of Lines of Code) across 
          three organizational project complexities: <strong>Organic</strong>, <strong>Semi-Detached</strong>, and <strong>Embedded</strong>.
        </p>
      </div>

      <div className="grid-2">
        {/* Input Form */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Project Estimation Parameters</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              E = a·(KLOC)^b
            </span>
          </div>

          {/* Quick Presets */}
          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
              Standard Lab Benchmarks:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="btn btn-secondary btn-sm mono"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Software Size (KLOC)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                required
                value={kloc}
                onChange={(e) => setKloc(parseFloat(e.target.value) || 0)}
                className="form-input mono"
                placeholder="e.g. 50 (50,000 lines of code)"
              />
              <span className="form-help">Thousands of delivered source instructions (KLOC = LOC / 1,000)</span>
            </div>

            <div className="form-group">
              <label className="form-label">Project Development Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="form-select"
              >
                <option value="organic">Organic Mode (Small, straightforward, familiar team)</option>
                <option value="semi-detached">Semi-Detached Mode (Medium size, mixed experience)</option>
                <option value="embedded">Embedded Mode (Tight hardware/operating constraints)</option>
              </select>
              <span className="form-help">Selects model coefficients a, b, c, d based on domain complexity.</span>
            </div>

            <div className="form-group">
              <label className="form-label">Cost per Person-Month ($ USD)</label>
              <input
                type="number"
                min="500"
                step="100"
                required
                value={costPerPm}
                onChange={(e) => setCostPerPm(parseFloat(e.target.value) || 0)}
                className="form-input mono"
              />
              <span className="form-help">Average loaded monthly personnel salary & operational overhead</span>
            </div>

            {error && (
              <div className="callout" style={{ borderLeftColor: '#09090b', marginTop: '0.5rem' }}>
                <div className="callout-title">Validation Error</div>
                <div className="callout-text">{error}</div>
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: '0.5rem' }}>
              {loading ? 'Estimating...' : 'Calculate COCOMO Estimates'}
            </button>
          </form>
        </div>

        {/* Model Reference Table */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">COCOMO Model Coefficients</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Boehm Benchmark Table</span>
          </div>

          <div className="table-container" style={{ marginBottom: '1rem' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Project Mode</th>
                  <th style={{ textAlign: 'center' }}>a</th>
                  <th style={{ textAlign: 'center' }}>b</th>
                  <th style={{ textAlign: 'center' }}>c</th>
                  <th style={{ textAlign: 'center' }}>d</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: mode === 'organic' ? '#f4f4f5' : 'transparent', fontWeight: mode === 'organic' ? 700 : 400 }}>
                  <td>Organic</td>
                  <td style={{ textAlign: 'center' }} className="mono">2.4</td>
                  <td style={{ textAlign: 'center' }} className="mono">1.05</td>
                  <td style={{ textAlign: 'center' }} className="mono">2.5</td>
                  <td style={{ textAlign: 'center' }} className="mono">0.38</td>
                </tr>
                <tr style={{ backgroundColor: mode === 'semi-detached' ? '#f4f4f5' : 'transparent', fontWeight: mode === 'semi-detached' ? 700 : 400 }}>
                  <td>Semi-Detached</td>
                  <td style={{ textAlign: 'center' }} className="mono">3.0</td>
                  <td style={{ textAlign: 'center' }} className="mono">1.12</td>
                  <td style={{ textAlign: 'center' }} className="mono">2.5</td>
                  <td style={{ textAlign: 'center' }} className="mono">0.35</td>
                </tr>
                <tr style={{ backgroundColor: mode === 'embedded' ? '#f4f4f5' : 'transparent', fontWeight: mode === 'embedded' ? 700 : 400 }}>
                  <td>Embedded</td>
                  <td style={{ textAlign: 'center' }} className="mono">3.6</td>
                  <td style={{ textAlign: 'center' }} className="mono">1.20</td>
                  <td style={{ textAlign: 'center' }} className="mono">2.5</td>
                  <td style={{ textAlign: 'center' }} className="mono">0.32</td>
                </tr>
              </tbody>
            </table>
          </div>

          {result && (
            <div className="callout" style={{ marginTop: '0.5rem' }}>
              <div className="callout-title">{result.mode_name} Characteristics</div>
              <div className="callout-text">{result.description}</div>
              <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <strong>Staffing Strategy:</strong> {result.recommendation}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="card highlight">
          <div className="card-header">
            <div>
              <h3 className="card-title">Project Estimation Report</h3>
              <p className="card-subtitle">
                Software Size: <strong>{result.kloc.toFixed(2)} KLOC</strong> ({result.mode_name})
              </p>
            </div>
            <span className="badge badge-pass">Calculated</span>
          </div>

          <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
            <div className="stat-box">
              <div className="stat-label">Development Effort</div>
              <div className="stat-value">{result.effort}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Person-Months (PM)
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-label">Project Duration</div>
              <div className="stat-value">{result.time}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Months schedule
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-label">Average Team Size</div>
              <div className="stat-value">{result.staff}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Engineers / Staff
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-label">Estimated Total Cost</div>
              <div className="stat-value" style={{ fontSize: '1.5rem' }}>
                ${result.estimated_cost.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                At loaded monthly rate
              </div>
            </div>
          </div>

          {/* Formula Step-by-Step Breakdown */}
          <div style={{ marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
              Step-by-Step Mathematical Derivation
            </div>
            <div className="calc-breakdown">
              {result.formula_steps.map((step, idx) => (
                <div key={idx} className="step-line">{step}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
