
import React from 'react';

export default function Overview({ setCurrentTab, stats }) {
  return (
    <div className="page-container">

      {/* Hero Welcome Card */}
      <div className="card highlight">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              Software Engineering Laboratory Simulation Suite
            </h2>
            <p className="card-subtitle">
              SRM University Delhi-NCR — Department of Computer Science
              (Course: 23MCA153)
            </p>
          </div>
          <span className="card-tag">MCA Practical Suite</span>
        </div>

        <p style={{
          fontSize: '0.88rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '1rem'
        }}>
          An interactive Software Engineering laboratory platform
          featuring three dedicated simulation tools:
          <strong> COCOMO Cost Estimation</strong>,
          <strong> Release &amp; Deployment Strategies</strong>, and
          <strong> Library Management System using SOLID Principles</strong>.
          Explore software estimation, deployment techniques, and
          object-oriented design through interactive simulations.
        </p>

        <div style={{
          display: 'flex',
          gap: '0.6rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setCurrentTab('cocomo')}
            className="btn btn-primary"
          >
            COCOMO Estimator →
          </button>

          <button
            onClick={() => setCurrentTab('deployment')}
            className="btn btn-secondary"
          >
            Deployment Strategies →
          </button>

          <button
            onClick={() => setCurrentTab('library')}
            className="btn btn-secondary"
          >
            Library System →
          </button>
        </div>
      </div>

      {/* Module Cards */}
      <div className="grid-2">

        {/* COCOMO */}
        <div className="card">
          <div className="card-header">
            <div>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--text-muted)'
              }}>
                Software Metrics &amp; Estimation
              </span>

              <h3 className="card-title" style={{ marginTop: '0.2rem' }}>
                Basic COCOMO Cost Model
              </h3>
            </div>

            <span className="badge badge-outline">Estimation</span>
          </div>

          <p style={{
            fontSize: '0.84rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.5',
            marginBottom: '1rem'
          }}>
            Estimates development effort (Person-Months), project
            duration (Months), and team size across Organic,
            Semi-Detached, and Embedded modes.

            <strong className="mono" style={{
              display: 'block',
              marginTop: '0.35rem',
              color: 'var(--text-primary)'
            }}>
              E = a·(KLOC)^b | T = c·(E)^d | Staff = E/T
            </strong>
          </p>

          <button
            onClick={() => setCurrentTab('cocomo')}
            className="btn btn-secondary"
            style={{ width: '100%' }}
          >
            Launch COCOMO Estimator
          </button>
        </div>

        {/* Deployment Strategies */}
        <div className="card">
          <div className="card-header">
            <div>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--text-muted)'
              }}>
                Release Engineering &amp; DevOps
              </span>

              <h3 className="card-title" style={{ marginTop: '0.2rem' }}>
                Release &amp; Deployment Strategies
              </h3>
            </div>

            <span className="badge badge-outline">DevOps</span>
          </div>

          <p style={{
            fontSize: '0.84rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.5',
            marginBottom: '1rem'
          }}>
            Simulates progressive delivery paradigms: Blue-Green
            zero-downtime traffic switching, Canary percentage
            rollouts, and Rolling batch updates.

            <strong className="mono" style={{
              display: 'block',
              marginTop: '0.35rem',
              color: 'var(--text-primary)'
            }}>
              Blue-Green • Canary • Rolling Fleet
            </strong>
          </p>

          <button
            onClick={() => setCurrentTab('deployment')}
            className="btn btn-secondary"
            style={{ width: '100%' }}
          >
            Launch Deployment Simulator
          </button>
        </div>

        {/* Library Management System */}
        <div className="card">
          <div className="card-header">
            <div>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--text-muted)'
              }}>
                Object-Oriented Design &amp; SOLID
              </span>

              <h3 className="card-title" style={{ marginTop: '0.2rem' }}>
                Library Management System
              </h3>
            </div>

            <span className="badge badge-outline">SOLID OOP</span>
          </div>

          <p style={{
            fontSize: '0.84rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.5',
            marginBottom: '1rem'
          }}>
            Implements the five SOLID principles with polymorphic
            fine strategies, member quotas, storage isolation,
            and Email/SMS notifications.

            <strong className="mono" style={{
              display: 'block',
              marginTop: '0.35rem',
              color: 'var(--text-primary)'
            }}>
              SRP • OCP • LSP • ISP • DIP
            </strong>
          </p>

          <button
            onClick={() => setCurrentTab('library')}
            className="btn btn-secondary"
            style={{ width: '100%' }}
          >
            Launch Library System
          </button>
        </div>

      </div>

      {/* Session Activity Stats */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              Laboratory Session Activity
            </h3>
            <p className="card-subtitle">
              Live counts tracked strictly from your interactive
              operations in this session
            </p>
          </div>

          <span className="badge badge-pass">Live Metrics</span>
        </div>

        <div className="grid-4">
          <div className="stat-box">
            <div className="stat-label">COCOMO Estimates</div>
            <div className="stat-value">
              {stats.cocomoEstimations}
            </div>
            <div style={{
              fontSize: '0.74rem',
              color: 'var(--text-muted)',
              marginTop: '0.2rem'
            }}>
              Cost Evaluations
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-label">Deployments Simulated</div>
            <div className="stat-value">
              {stats.deploymentsSimulated}
            </div>
            <div style={{
              fontSize: '0.74rem',
              color: 'var(--text-muted)',
              marginTop: '0.2rem'
            }}>
              DevOps Actions
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
