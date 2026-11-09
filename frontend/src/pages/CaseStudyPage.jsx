import React, { useState } from 'react';

const caseStudies = [
  {
    id: 'student-mgmt',
    title: 'Student Management System',
    domain: 'Education',
    description: 'Design and develop a complete Student Management System applying SDLC models, COCOMO estimation, SRS documentation, UML diagrams, SOLID principles, and testing strategies.',
    experiments: [
      { exp: 'Experiment 1', task: 'Choose an appropriate SDLC model and justify your choice.' },
      { exp: 'Experiment 2', task: 'Draw a Use Case Diagram for the system.' },
      { exp: 'Experiment 3', task: 'Estimate effort and cost using Basic COCOMO (assume 15 KLOC, Semi‑Detached).' },
      { exp: 'Experiment 4', task: 'Identify and implement SOLID principles in the class design.' },
      { exp: 'Experiment 5', task: 'Draw Class and Sequence diagrams for enrollment and grading.' },
      { exp: 'Experiment 6', task: 'Generate an SRS document following IEEE 830.' },
      { exp: 'Experiment 7', task: 'Design unit test cases for the grading module.' },
      { exp: 'Experiment 8', task: 'Design integration test cases for registration → enrollment flow.' },
      { exp: 'Experiment 9', task: 'Plan a deployment strategy (Blue‑Green / Canary / Rolling).' },
    ],
  },
  {
    id: 'library-mgmt',
    title: 'Library Management System',
    domain: 'Library / Academic',
    description: 'Apply all nine experiments to a Library Management System, covering book catalog management, member management, borrowing, returning, fine policies, and notifications.',
    experiments: [
      { exp: 'Experiment 1', task: 'Compare Waterfall vs Agile for this project. Which is more suitable?' },
      { exp: 'Experiment 2', task: 'Draw a Use Case Diagram with Librarian, Member, and Admin actors.' },
      { exp: 'Experiment 3', task: 'Estimate effort using Basic COCOMO (assume 10 KLOC, Organic).' },
      { exp: 'Experiment 4', task: 'Implement SOLID principles (already available in Library System module).' },
      { exp: 'Experiment 5', task: 'Draw Class and Sequence diagrams for borrow/return flow.' },
      { exp: 'Experiment 6', task: 'Generate an SRS document for the Library System.' },
      { exp: 'Experiment 7', task: 'Design unit test cases for fine calculation logic.' },
      { exp: 'Experiment 8', task: 'Design integration test cases for borrow → notify → fine flow.' },
      { exp: 'Experiment 9', task: 'Plan a Canary deployment for the library system upgrade.' },
    ],
  },
  {
    id: 'food-ordering',
    title: 'Online Food Ordering System',
    domain: 'E‑Commerce / Food Tech',
    description: 'Build and document a complete Online Food Ordering System, applying all SE laboratory experiments from requirements to deployment.',
    experiments: [
      { exp: 'Experiment 1', task: 'Select an SDLC model. Justify why Agile is recommended.' },
      { exp: 'Experiment 2', task: 'Draw a Use Case Diagram with Customer, Restaurant, and Delivery Agent.' },
      { exp: 'Experiment 3', task: 'Estimate effort using Basic COCOMO (assume 25 KLOC, Embedded).' },
      { exp: 'Experiment 4', task: 'Apply SOLID principles to Order, Payment, and Delivery classes.' },
      { exp: 'Experiment 5', task: 'Draw Class and Sequence diagrams for order placement flow.' },
      { exp: 'Experiment 6', task: 'Generate an SRS document for the ordering platform.' },
      { exp: 'Experiment 7', task: 'Design unit test cases for payment processing module.' },
      { exp: 'Experiment 8', task: 'Design integration tests for order → payment → delivery pipeline.' },
      { exp: 'Experiment 9', task: 'Plan a Blue‑Green deployment strategy.' },
    ],
  },
];

export default function CaseStudyPage({ setCurrentTab }) {
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});

  const toggleTask = (studyId, expIndex) => {
    const key = `${studyId}-${expIndex}`;
    setCompletedTasks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getProgress = (study) => {
    const total = study.experiments.length;
    const done = study.experiments.filter((_, i) => completedTasks[`${study.id}-${i}`]).length;
    return { done, total, pct: Math.round((done / total) * 100) };
  };

  return (
    <div className="page-container">
      <div className="card highlight">
        <div className="card-header">
          <div>
            <h2 className="card-title">Module 4: Case‑Study Workspace</h2>
            <p className="card-subtitle">End‑to‑End Project Scenarios Applying All 9 Experiments</p>
          </div>
          <span className="card-tag">3 Case Studies</span>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Select a project scenario and work through all nine experiments in context. Track your
          progress as you apply SDLC models, UML diagrams, COCOMO estimation, SOLID principles,
          SRS documentation, testing strategies, and deployment planning.
        </p>
      </div>

      {selectedStudy === null ? (
        <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {caseStudies.map((cs) => {
            const { done, total, pct } = getProgress(cs);
            return (
              <div className="card" key={cs.id}>
                <div className="card-header">
                  <div>
                    <h3 className="card-title">{cs.title}</h3>
                    <p className="card-subtitle">{cs.domain}</p>
                  </div>
                  <span className="badge badge-outline">{cs.domain}</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {cs.description}
                </p>
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    <span>{done} / {total} experiments</span>
                    <span>{pct}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: 'var(--accent)', borderRadius: '3px', transition: 'width 0.3s' }} />
                  </div>
                </div>
                <button onClick={() => setSelectedStudy(cs.id)} className="btn btn-secondary" style={{ width: '100%' }}>
                  Open Workspace →
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        (() => {
          const cs = caseStudies.find((c) => c.id === selectedStudy);
          const { done, total, pct } = getProgress(cs);
          return (
            <div>
              <button onClick={() => setSelectedStudy(null)} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
                ← Back to Case Studies
              </button>

              <div className="card" style={{ marginBottom: '1rem' }}>
                <div className="card-header">
                  <div>
                    <h3 className="card-title">{cs.title}</h3>
                    <p className="card-subtitle">{cs.domain} — {done}/{total} experiments completed ({pct}%)</p>
                  </div>
                  <span className="badge badge-pass">{pct}% Complete</span>
                </div>
                <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginTop: '0.75rem' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'var(--accent)', borderRadius: '4px', transition: 'width 0.3s' }} />
                </div>
              </div>

              {cs.experiments.map((exp, i) => {
                const key = `${cs.id}-${i}`;
                const isDone = completedTasks[key];
                return (
                  <div className="card" key={i} style={{ marginBottom: '0.75rem', opacity: isDone ? 0.7 : 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <input
                        type="checkbox"
                        checked={isDone || false}
                        onChange={() => toggleTask(cs.id, i)}
                        style={{ marginTop: '0.3rem', width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '0.9rem' }}>{exp.exp}</strong>
                          {isDone && <span className="badge badge-pass">✓ Done</span>}
                        </div>
                        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '0.3rem', textDecoration: isDone ? 'line-through' : 'none' }}>
                          {exp.task}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()
      )}
    </div>
  );
}

