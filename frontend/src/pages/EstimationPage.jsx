import React, { useState } from 'react';

const tabs = [
  { id: 'cocomo', label: 'COCOMO Estimation' },
  { id: 'srs', label: 'SRS Document Generator' },
];

function SrsGenerator() {
  const [projectName, setProjectName] = useState('Student Management System');
  const [selectedScenario, setSelectedScenario] = useState('student-mgmt');

  const scenarios = {
    'student-mgmt': {
      name: 'Student Management System',
      purpose: 'To develop a web‑based system that manages student enrollment, attendance, grades, and fee records for an educational institution.',
      scope: 'The system will handle student registration, course enrollment, attendance tracking, grade management, fee payment processing, and report generation.',
      users: ['Admin', 'Faculty', 'Student', 'Accountant'],
      functionalReqs: [
        'FR‑1: The system shall allow administrators to add, update, and delete student records.',
        'FR‑2: Students shall be able to view their grades, attendance, and fee status.',
        'FR‑3: Faculty shall be able to record attendance and enter grades.',
        'FR‑4: The system shall generate reports in PDF and CSV formats.',
        'FR‑5: The system shall support email notifications for fee reminders.',
        'FR‑6: The system shall allow course registration with prerequisite validation.',
      ],
      nonFunctionalReqs: [
        'NFR‑1: The system shall respond to user queries within 2 seconds.',
        'NFR‑2: The system shall support 500 concurrent users.',
        'NFR‑3: All data transmissions shall be encrypted using TLS 1.2+.',
        'NFR‑4: The system shall have 99.5% uptime availability.',
        'NFR‑5: The system shall be accessible on mobile and desktop browsers.',
      ],
    },
    'library-mgmt': {
      name: 'Library Management System',
      purpose: 'To develop a system for managing library resources including books, members, borrowing, and returning with fine calculation.',
      scope: 'The system will handle book catalog management, member registration, issue/return of books, fine calculation, and inventory reports.',
      users: ['Librarian', 'Member', 'Admin'],
      functionalReqs: [
        'FR‑1: Librarian shall be able to add, update, and remove books from the catalog.',
        'FR‑2: Members shall be able to search and reserve books.',
        'FR‑3: The system shall track borrowed books and due dates.',
        'FR‑4: The system shall automatically calculate fines for overdue books.',
        'FR‑5: The system shall generate inventory and borrowing reports.',
        'FR‑6: Members shall receive email reminders before due dates.',
      ],
      nonFunctionalReqs: [
        'NFR‑1: The system shall handle 200 concurrent users.',
        'NFR‑2: Search results shall be returned within 1 second.',
        'NFR‑3: Data shall be backed up daily.',
        'NFR‑4: The system shall comply with WCAG 2.1 accessibility standards.',
      ],
    },
    'food-ordering': {
      name: 'Online Food Ordering System',
      purpose: 'To develop an online platform for ordering food from restaurants with delivery tracking.',
      scope: 'The system will support restaurant browsing, menu display, cart management, order placement, payment processing, and delivery tracking.',
      users: ['Customer', 'Restaurant Owner', 'Delivery Agent', 'Admin'],
      functionalReqs: [
        'FR‑1: Customers shall browse restaurants by location and cuisine.',
        'FR‑2: Customers shall add menu items to a cart and place orders.',
        'FR‑3: The system shall process payments via credit card, UPI, and wallet.',
        'FR‑4: Restaurant owners shall update menus and manage orders.',
        'FR‑5: Delivery agents shall receive order assignments and update delivery status.',
        'FR‑6: Customers shall track delivery status in real‑time.',
      ],
      nonFunctionalReqs: [
        'NFR‑1: The system shall process payments within 5 seconds.',
        'NFR‑2: The platform shall support 1000 concurrent users.',
        'NFR‑3: The system shall be available 99.9% of the time.',
        'NFR‑4: All payment data shall comply with PCI‑DSS standards.',
      ],
    },
  };

  const scenario = scenarios[selectedScenario];

  return (
    <div>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h3 style={{ marginBottom: '0.75rem' }}>Select Project Scenario</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {Object.entries(scenarios).map(([key, s]) => (
            <button
              key={key}
              onClick={() => { setSelectedScenario(key); setProjectName(s.name); }}
              className={`btn ${selectedScenario === key ? 'btn-primary' : 'btn-secondary'}`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <div className="card-header">
          <h3 className="card-title">Software Requirements Specification</h3>
          <span className="badge badge-outline">IEEE 830</span>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <h4>1. Introduction</h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.5rem' }}>
            <strong>1.1 Purpose:</strong> {scenario.purpose}
          </p>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.5rem' }}>
            <strong>1.2 Scope:</strong> {scenario.scope}
          </p>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.5rem' }}>
            <strong>1.3 Project Name:</strong> {scenario.name}
          </p>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <h4>2. Users / Stakeholders</h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            {scenario.users.map((u) => (
              <span key={u} className="badge badge-outline">{u}</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <h4>3. Functional Requirements</h4>
          <ul style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '0.5rem' }}>
            {scenario.functionalReqs.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <h4>4. Non‑Functional Requirements</h4>
          <ul style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '0.5rem' }}>
            {scenario.nonFunctionalReqs.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function EstimationPage({ setCurrentTab }) {
  const [activeTab, setActiveTab] = useState('cocomo');

  return (
    <div className="page-container">
      <div className="card highlight">
        <div className="card-header">
          <div>
            <h2 className="card-title">Module 2: Software Estimation &amp; Documentation</h2>
            <p className="card-subtitle">COCOMO Cost Estimation &amp; SRS Document Generation</p>
          </div>
          <span className="card-tag">2 Experiments</span>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Estimate project effort, cost, and timeline using the Basic COCOMO model, and generate
          IEEE 830 compliant Software Requirements Specification documents for prescribed project scenarios.
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

      {activeTab === 'cocomo' ? (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Experiment 3 – Basic COCOMO</h3>
              <p className="card-subtitle">Organic, Semi‑Detached, Embedded</p>
            </div>
            <span className="badge badge-outline">Estimation</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.75rem', marginBottom: '1rem' }}>
            The full COCOMO calculator is available in its dedicated page with step‑by‑step
            calculations, project scenarios, and formula breakdowns.
          </p>
          <button onClick={() => setCurrentTab('cocomo')} className="btn btn-primary">
            Open COCOMO Calculator →
          </button>
        </div>
      ) : (
        <>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className="card-header">
              <div>
                <h3 className="card-title">Experiment 6 – SRS Document Generator</h3>
                <p className="card-subtitle">IEEE 830 Standard</p>
              </div>
              <span className="badge badge-outline">Documentation</span>
            </div>
          </div>
          <SrsGenerator />
        </>
      )}
    </div>
  );
}

