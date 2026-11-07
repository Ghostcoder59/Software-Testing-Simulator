import React, { useState, useEffect } from 'react';
import { calculateComplexity, getComplexityExamples } from '../services/api';
import GraphViewer from '../components/GraphViewer';

export default function ComplexityPage({ onCalculationPerformed }) {
  const [nodes, setNodes] = useState(4);
  const [edges, setEdges] = useState(4);
  const [components, setComponents] = useState(1);

  const [examples, setExamples] = useState([]);
  const [selectedExampleId, setSelectedExampleId] = useState('');
  const [activePseudocode, setActivePseudocode] = useState('');

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load predefined examples on mount
  useEffect(() => {
    async function loadExamples() {
      try {
        const data = await getComplexityExamples();
        setExamples(data);
        if (data.length > 0) {
          // Select second example (If-Else) by default
          const defaultEx = data[1] || data[0];
          setSelectedExampleId(defaultEx.id);
          setNodes(defaultEx.nodes);
          setEdges(defaultEx.edges);
          setComponents(defaultEx.components);
          setActivePseudocode(defaultEx.pseudocode);
          // Initial calculation
          handleCalculate(defaultEx.nodes, defaultEx.edges, defaultEx.components, defaultEx.graph_representation);
        }
      } catch (err) {
        console.error('Failed to load examples:', err);
      }
    }
    loadExamples();
  }, []);

  const handleExampleSelect = (e) => {
    const exId = e.target.value;
    setSelectedExampleId(exId);
    const found = examples.find((x) => x.id === exId);
    if (found) {
      setNodes(found.nodes);
      setEdges(found.edges);
      setComponents(found.components);
      setActivePseudocode(found.pseudocode);
      handleCalculate(found.nodes, found.edges, found.components, found.graph_representation);
    }
  };

  const handleCalculate = async (nVal = nodes, eVal = edges, pVal = components, overrideGraph = null) => {
    setLoading(true);
    setError(null);

    try {
      const data = await calculateComplexity(nVal, eVal, pVal);
      if (!data.valid) {
        setError(data.error_message || 'Inconsistent graph parameters.');
        setResult(data);
      } else {
        if (overrideGraph) {
          data.graph_representation = overrideGraph;
        }
        setResult(data);
        if (onCalculationPerformed) {
          onCalculationPerformed();
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred while evaluating the graph.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCalculate(nodes, edges, components);
  };

  return (
    <div className="page-container">
      {/* Overview Banner */}
      <div className="card highlight">
        <div className="card-header">
          <div>
            <h2 className="card-title">Cyclomatic Complexity Calculator</h2>
            <p className="card-subtitle">
              Measure source code structural complexity using McCabe's graph-theoretic metric: <code>V(G) = E - N + 2P</code>
            </p>
          </div>
          <span className="card-tag">White-Box Testing</span>
        </div>

        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Cyclomatic complexity represents the number of linearly independent paths through a program's 
          Control Flow Graph (CFG). It defines the minimum number of test cases required to achieve 
          exhaustive branch coverage and assess software maintenance risk.
        </p>
      </div>

      <div className="grid-2">
        {/* Input Parameters Form */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">CFG Input Parameters</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              V(G) = E - N + 2P
            </span>
          </div>

          {/* Predefined Examples Selector */}
          <div className="form-group">
            <label className="form-label">Predefined Reference Example</label>
            <select
              value={selectedExampleId}
              onChange={handleExampleSelect}
              className="form-select"
            >
              <option value="">-- Choose textbook CFG pattern --</option>
              {examples.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name} (N={ex.nodes}, E={ex.edges}, V(G)={ex.expected_vg})
                </option>
              ))}
            </select>
            <p className="form-help">
              Select an archetype to auto-populate canonical graph values and view its corresponding pseudocode.
            </p>
          </div>

          {/* Pseudocode snippet display */}
          {activePseudocode && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                Program Pseudocode
              </div>
              <pre
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  border: '1px solid var(--border-light)',
                  overflowX: 'auto',
                }}
              >
                {activePseudocode}
              </pre>
            </div>
          )}

          {/* Inputs */}
          <form onSubmit={handleSubmit}>
            <div className="grid-3">
              <div className="form-group">
                <label className="form-label">Nodes (N)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={nodes}
                  onChange={(e) => setNodes(parseInt(e.target.value) || 0)}
                  className="form-input mono"
                />
                <span className="form-help">Vertices / Statements</span>
              </div>

              <div className="form-group">
                <label className="form-label">Edges (E)</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  required
                  value={edges}
                  onChange={(e) => setEdges(parseInt(e.target.value) || 0)}
                  className="form-input mono"
                />
                <span className="form-help">Directed Control Flows</span>
              </div>

              <div className="form-group">
                <label className="form-label">Components (P)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  required
                  value={components}
                  onChange={(e) => setComponents(parseInt(e.target.value) || 1)}
                  className="form-input mono"
                />
                <span className="form-help">Connected Subroutines</span>
              </div>
            </div>

            {error && (
              <div className="callout" style={{ borderLeftColor: '#09090b', backgroundColor: '#f4f4f5', marginTop: '0.5rem' }}>
                <div className="callout-title">Validation Warning</div>
                <div className="callout-text">{error}</div>
              </div>
            )}

            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1 }}>
                {loading ? 'Evaluating...' : 'Calculate Cyclomatic Complexity'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setNodes(4);
                  setEdges(4);
                  setComponents(1);
                  setSelectedExampleId('');
                  setActivePseudocode('');
                  handleCalculate(4, 4, 1);
                }}
                className="btn btn-secondary"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Visual CFG Preview */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Control Flow Graph (CFG)</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Directed Graph Representation
            </span>
          </div>
          
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            Nodes represent statements/decisions; arrows denote control flow transfer.
          </p>

          <GraphViewer
            graphData={result ? result.graph_representation : null}
            title="Sample Graph"
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            <span>● Solid Circle = Start / Terminal Node</span>
            <span>◇ Diamond = Predicate / Decision</span>
            <span>○ White Circle = Sequential Statement</span>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && result.valid && (
        <div className="card highlight" style={{ marginTop: '1rem' }}>
          <div className="card-header">
            <h3 className="card-title">Calculation Analysis & Results</h3>
            <span className="badge badge-pass">Valid Graph</span>
          </div>

          {/* Metric Highlights */}
          <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
            <div className="stat-box">
              <div className="stat-label">Cyclomatic Complexity V(G)</div>
              <div className="stat-value">{result.cyclomatic_complexity}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Formula: E - N + 2P
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-label">Independent Basis Paths</div>
              <div className="stat-value">{result.independent_paths}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Minimum test suite size
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-label">McCabe Risk Rating</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '0.6rem', color: 'var(--text-primary)' }}>
                {result.risk_level}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Structural defect hazard
              </div>
            </div>
          </div>

          {/* Step-by-Step Derivation */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
              Step-by-Step Arithmetic Derivation
            </div>
            <div className="calc-breakdown">
              {result.steps.map((step, idx) => (
                <div key={idx} className="step-line">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Interpretation & Recommendations */}
          <div className="grid-2">
            <div className="callout">
              <div className="callout-title">Engineering Interpretation</div>
              <div className="callout-text">{result.interpretation}</div>
            </div>

            <div className="callout">
              <div className="callout-title">Testing & Refactoring Recommendation</div>
              <div className="callout-text">{result.recommendation}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
