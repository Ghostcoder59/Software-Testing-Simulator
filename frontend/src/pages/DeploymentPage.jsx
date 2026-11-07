import React, { useState, useEffect } from 'react';
import { simulateBlueGreen, simulateCanary, simulateRollingUpdate } from '../services/api';

export default function DeploymentPage({ onDeploymentSimulated }) {
  const [activeStrategy, setActiveStrategy] = useState('blue-green'); // 'blue-green' | 'canary' | 'rolling'

  // Blue-Green State
  const [bgSwitch, setBgSwitch] = useState(false);
  const [bgHealthy, setBgHealthy] = useState(true);
  const [bgResult, setBgResult] = useState(null);

  // Canary State
  const [canaryPct, setCanaryPct] = useState(10);
  const [simulateError, setSimulateError] = useState(false);
  const [canaryResult, setCanaryResult] = useState(null);

  // Rolling State
  const [totalServers, setTotalServers] = useState(6);
  const [batchSize, setBatchSize] = useState(2);
  const [currentStep, setCurrentStep] = useState(0);
  const [rollingResult, setRollingResult] = useState(null);

  // Load initial states
  useEffect(() => {
    updateBlueGreen(false, true);
    updateCanary(10, false);
    updateRolling(6, 2, 0);
  }, []);

  const updateBlueGreen = async (toGreen, healthy) => {
    try {
      const data = await simulateBlueGreen(toGreen, healthy);
      setBgResult(data);
      if (onDeploymentSimulated) onDeploymentSimulated();
    } catch (err) {
      console.error(err);
    }
  };

  const updateCanary = async (pct, hasError) => {
    try {
      const data = await simulateCanary(pct, hasError);
      setCanaryResult(data);
      if (onDeploymentSimulated) onDeploymentSimulated();
    } catch (err) {
      console.error(err);
    }
  };

  const updateRolling = async (total, batch, step) => {
    try {
      const data = await simulateRollingUpdate(total, batch, step);
      setRollingResult(data);
      if (onDeploymentSimulated) onDeploymentSimulated();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      {/* Banner */}
      <div className="card highlight">
        <div className="card-header">
          <div>
            <h2 className="card-title">Release & Deployment Strategies Simulator (EXP-9)</h2>
            <p className="card-subtitle">
              Simulating Zero-Downtime Deployment Paradigms: Blue-Green, Canary Releases, and Rolling Updates
            </p>
          </div>
          <span className="card-tag">DevOps & Release</span>
        </div>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Modern software engineering employs progressive delivery patterns to release updates with minimal 
          service interruption, rapid disaster rollback capabilities, and incremental risk validation.
        </p>

        {/* Strategy Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveStrategy('blue-green')}
            className={`btn btn-sm ${activeStrategy === 'blue-green' ? 'btn-primary' : 'btn-secondary'}`}
          >
            1. Blue-Green Deployment
          </button>
          <button
            onClick={() => setActiveStrategy('canary')}
            className={`btn btn-sm ${activeStrategy === 'canary' ? 'btn-primary' : 'btn-secondary'}`}
          >
            2. Canary Release
          </button>
          <button
            onClick={() => setActiveStrategy('rolling')}
            className={`btn btn-sm ${activeStrategy === 'rolling' ? 'btn-primary' : 'btn-secondary'}`}
          >
            3. Rolling Update
          </button>
        </div>
      </div>

      {/* STRATEGY 1: BLUE-GREEN DEPLOYMENT */}
      {activeStrategy === 'blue-green' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Blue-Green Deployment Simulation</h3>
              <p className="card-subtitle">
                Two identical environments: one serves live production traffic while the other is updated and tested in isolation.
              </p>
            </div>
            <span className="badge badge-outline">Zero Downtime</span>
          </div>

          {/* Environment Cards */}
          <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
            {/* Blue Env */}
            <div
              className="card"
              style={{
                border: bgResult?.active_environment === 'Blue' ? '2px solid var(--border-dark)' : '1px solid var(--border-light)',
                backgroundColor: bgResult?.active_environment === 'Blue' ? '#ffffff' : 'var(--bg-subtle)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ fontWeight: 700, fontSize: '1rem' }}>Blue Environment</h4>
                <span className={`badge ${bgResult?.active_environment === 'Blue' ? 'badge-pass' : 'badge-pending'}`}>
                  {bgResult?.active_environment === 'Blue' ? '100% Traffic (Live)' : 'Idle / Rollback'}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Application Version: <strong>v1.0 (Stable)</strong>
              </p>
              <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Status: Serving production users safely.
              </div>
            </div>

            {/* Green Env */}
            <div
              className="card"
              style={{
                border: bgResult?.active_environment === 'Green' ? '2px solid var(--border-dark)' : '1px solid var(--border-light)',
                backgroundColor: bgResult?.active_environment === 'Green' ? '#ffffff' : 'var(--bg-subtle)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ fontWeight: 700, fontSize: '1rem' }}>Green Environment</h4>
                <span className={`badge ${bgResult?.active_environment === 'Green' ? 'badge-pass' : 'badge-pending'}`}>
                  {bgResult?.active_environment === 'Green' ? '100% Traffic (Live)' : 'Staging / Pre-release'}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Application Version: <strong>v2.0 (New Release)</strong>
              </p>
              <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Health Check: {bgHealthy ? '● Passing (Green)' : '▲ Failed (Error)'}
              </div>
            </div>
          </div>

          {/* Interactive Controls */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <button
              onClick={() => {
                const next = !bgSwitch;
                setBgSwitch(next);
                updateBlueGreen(next, bgHealthy);
              }}
              className="btn btn-primary"
            >
              {bgSwitch ? 'Rollback Traffic to Blue (v1.0)' : 'Switch 100% Traffic to Green (v2.0)'}
            </button>

            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.84rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={!bgHealthy}
                onChange={(e) => {
                  const bad = e.target.checked;
                  setBgHealthy(!bad);
                  updateBlueGreen(bgSwitch, !bad);
                }}
              />
              Simulate Staging Health Check Failure
            </label>
          </div>

          {bgResult && (
            <div className="callout">
              <div className="callout-title">Traffic Router Status</div>
              <div className="callout-text">{bgResult.status_message}</div>
            </div>
          )}
        </div>
      )}

      {/* STRATEGY 2: CANARY RELEASE */}
      {activeStrategy === 'canary' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Canary Progressive Release Simulation</h3>
              <p className="card-subtitle">
                Gradually shifts a percentage of user traffic to the new version while monitoring telemetry and error budgets.
              </p>
            </div>
            <span className="badge badge-outline">Progressive Delivery</span>
          </div>

          {/* Slider & Quick Buttons */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">
              Canary Traffic Allocation: <strong className="mono" style={{ fontSize: '1.1rem' }}>{canaryPct}%</strong> to v2.0 ({100 - canaryPct}% to v1.0)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={canaryPct}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                setCanaryPct(val);
                updateCanary(val, simulateError);
              }}
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {[0, 10, 25, 50, 100].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setCanaryPct(p);
                    updateCanary(p, simulateError);
                  }}
                  className={`btn btn-sm mono ${canaryPct === p ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>

          {/* Visual Traffic Split Bar */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>v1.0 Stable ({canaryResult?.traffic_v1}%)</span>
              <span>v2.0 Canary ({canaryResult?.traffic_v2}%)</span>
            </div>
            <div style={{ display: 'flex', height: '24px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-dark)' }}>
              <div
                style={{
                  width: `${canaryResult?.traffic_v1 || 0}%`,
                  backgroundColor: '#09090b',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {canaryResult?.traffic_v1 > 10 ? `v1.0 (${canaryResult.traffic_v1}%)` : ''}
              </div>
              <div
                style={{
                  width: `${canaryResult?.traffic_v2 || 0}%`,
                  backgroundColor: simulateError ? '#71717a' : '#e4e4e7',
                  color: '#09090b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700
                }}
              >
                {canaryResult?.traffic_v2 > 10 ? `v2.0 (${canaryResult.traffic_v2}%)` : ''}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.84rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={simulateError}
                onChange={(e) => {
                  const bad = e.target.checked;
                  setSimulateError(bad);
                  updateCanary(canaryPct, bad);
                }}
              />
              Simulate High Error Rate in Canary Release
            </label>
          </div>

          {canaryResult && (
            <div className="grid-2">
              <div className="callout">
                <div className="callout-title">Health Status: {canaryResult.health}</div>
                <div className="callout-text">{canaryResult.status_message}</div>
              </div>
              <div className="callout">
                <div className="callout-title">DevOps Action Recommendation</div>
                <div className="callout-text">{canaryResult.recommended_action}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STRATEGY 3: ROLLING UPDATE */}
      {activeStrategy === 'rolling' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Rolling Update Fleet Simulator</h3>
              <p className="card-subtitle">
                Progressively upgrades nodes in batches so the service remains 100% available without downtime.
              </p>
            </div>
            <span className="badge badge-outline">Batch Deployment</span>
          </div>

          {/* Configuration */}
          <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Total Cluster Servers</label>
              <select
                value={totalServers}
                onChange={(e) => {
                  const n = parseInt(e.target.value) || 6;
                  setTotalServers(n);
                  setCurrentStep(0);
                  updateRolling(n, batchSize, 0);
                }}
                className="form-select mono"
              >
                <option value={4}>4 Servers</option>
                <option value={6}>6 Servers (Standard)</option>
                <option value={8}>8 Servers</option>
                <option value={10}>10 Servers</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Batch Size (Update at a time)</label>
              <select
                value={batchSize}
                onChange={(e) => {
                  const b = parseInt(e.target.value) || 2;
                  setBatchSize(b);
                  setCurrentStep(0);
                  updateRolling(totalServers, b, 0);
                }}
                className="form-select mono"
              >
                <option value={1}>1 server at a time (Slow, highest safety)</option>
                <option value={2}>2 servers at a time (Standard batch)</option>
                <option value={3}>3 servers at a time (Fast rollout)</option>
              </select>
            </div>
          </div>

          {/* Server Fleet Grid */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              Cluster Instance Fleet ({rollingResult?.updated_servers}/{totalServers} Upgraded):
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
              {rollingResult?.servers.map((s) => (
                <div
                  key={s.server_id}
                  style={{
                    border: '1px solid var(--border-dark)',
                    backgroundColor: s.version === 'v2.0' ? '#09090b' : '#ffffff',
                    color: s.version === 'v2.0' ? '#ffffff' : '#09090b',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.85rem',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', opacity: 0.8 }}>Server #{s.server_id}</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                    {s.version}
                  </div>
                  <div style={{ fontSize: '0.7rem', marginTop: '0.3rem', opacity: 0.9 }}>
                    {s.version === 'v2.0' ? '● Upgraded' : '○ Live (v1.0)'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stepper Controls */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <button
              onClick={() => {
                const nextStep = Math.min(rollingResult.total_steps, currentStep + 1);
                setCurrentStep(nextStep);
                updateRolling(totalServers, batchSize, nextStep);
              }}
              disabled={rollingResult?.is_complete}
              className="btn btn-primary"
            >
              Deploy Next Batch (+{batchSize}) &rarr;
            </button>
            <button
              onClick={() => {
                setCurrentStep(0);
                updateRolling(totalServers, batchSize, 0);
              }}
              className="btn btn-secondary"
            >
              Reset Cluster to v1.0
            </button>
          </div>

          {rollingResult && (
            <div className="callout">
              <div className="callout-title">
                Rolling Progress: Step {rollingResult.current_step} of {rollingResult.total_steps}
              </div>
              <div className="callout-text">{rollingResult.status_message}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
