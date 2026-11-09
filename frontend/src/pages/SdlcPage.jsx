import React, { useState } from 'react';

const experiments = [
  {
    id: 'sdlc-models',
    title: 'Experiment 1 – SDLC Models',
    subtitle: 'Waterfall, Incremental, Prototyping, Agile',
    description:
      'Interactive workflow simulations showing phases, characteristics, and comparisons of major Software Development Life Cycle models.',
    badge: 'SDLC',
    content: (
      <>
        <h3 style={{ marginBottom: '1rem' }}>Software Development Life Cycle Models</h3>

        {/* Waterfall */}
        <div className="card" style={{ marginBottom: '1rem' }}>
          <h4>Waterfall Model</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            A linear‑sequential approach where each phase must be completed before the next begins.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            {['Requirements', 'System Design', 'Implementation', 'Testing', 'Deployment', 'Maintenance'].map((p) => (
              <span key={p} className="badge badge-outline">{p}</span>
            ))}
          </div>
          <p style={{ marginTop: '0.75rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            <strong>Strengths:</strong> Simple, well‑documented, easy to manage.
            <br />
            <strong>Weaknesses:</strong> Inflexible to change, late testing, high risk.
          </p>
        </div>

        {/* Incremental */}
        <div className="card" style={{ marginBottom: '1rem' }}>
          <h4>Incremental Model</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            The system is developed and delivered in increments (builds). Each increment adds functionality.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            {['Increment 1: Core', 'Increment 2: Extended', 'Increment 3: Enhanced', 'Increment 4: Final'].map((p) => (
              <span key={p} className="badge badge-outline">{p}</span>
            ))}
          </div>
          <p style={{ marginTop: '0.75rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            <strong>Strengths:</strong> Early delivery of partial system, flexible, lower initial cost.
            <br />
            <strong>Weaknesses:</strong> Requires careful planning, integration issues possible.
          </p>
        </div>

        {/* Prototyping */}
        <div className="card" style={{ marginBottom: '1rem' }}>
          <h4>Prototyping Model</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            A working prototype is built first to understand requirements, then refined iteratively.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            {['Gather Requirements', 'Build Prototype', 'User Evaluation', 'Refine Prototype', 'Final System'].map((p) => (
              <span key={p} className="badge badge-outline">{p}</span>
            ))}
          </div>
          <p style={{ marginTop: '0.75rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            <strong>Strengths:</strong> Reduces misunderstanding, user involvement, early feedback.
            <br />
            <strong>Weaknesses:</strong> Users may mistake prototype for final product, scope creep.
          </p>
        </div>

        {/* Agile */}
        <div className="card" style={{ marginBottom: '1rem' }}>
          <h4>Agile Model</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            Iterative and adaptive development with short sprints, continuous feedback, and collaboration.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            {['Sprint Planning', 'Daily Standup', 'Development', 'Sprint Review', 'Sprint Retrospective'].map((p) => (
              <span key={p} className="badge badge-outline">{p}</span>
            ))}
          </div>
          <p style={{ marginTop: '0.75rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            <strong>Strengths:</strong> Highly adaptive, customer satisfaction, rapid delivery.
            <br />
            <strong>Weaknesses:</strong> Requires experienced team, less predictable timeline.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="card">
          <h4>Model Comparison</h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', marginTop: '0.75rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Criteria</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Waterfall</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Incremental</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Prototyping</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Agile</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Flexibility', 'Low', 'Medium', 'Medium', 'High'],
                  ['Risk', 'High', 'Medium', 'Low', 'Low'],
                  ['User Involvement', 'Low', 'Medium', 'High', 'High'],
                  ['Delivery', 'End', 'Incremental', 'Prototype → Final', 'Sprint‑based'],
                  ['Best For', 'Well‑defined projects', 'Large systems', 'Unclear requirements', 'Evolving requirements'],
                ].map(([criterion, ...values]) => (
                  <tr key={criterion} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.5rem', fontWeight: 600 }}>{criterion}</td>
                    {values.map((v, i) => (
                      <td key={i} style={{ padding: '0.5rem', color: 'var(--text-secondary)' }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'atm-usecase',
    title: 'Experiment 2 – ATM Use Case Diagram',
    subtitle: 'Actors, Use Cases, Include & Extend Relationships',
    description:
      'A clear interactive UML use case diagram for an ATM system showing actors, use cases, include and extend relationships.',
    badge: 'UML',
    content: (
      <>
        <h3 style={{ marginBottom: '1rem' }}>ATM Use Case Diagram</h3>

        <div className="card" style={{ marginBottom: '1rem' }}>
          <h4>Actors</h4>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            <div className="stat-box" style={{ flex: '1', minWidth: '180px' }}>
              <div className="stat-label">Primary Actor</div>
              <div className="stat-value" style={{ fontSize: '1.1rem' }}>Customer</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Interacts with ATM to perform banking operations</div>
            </div>
            <div className="stat-box" style={{ flex: '1', minWidth: '180px' }}>
              <div className="stat-label">Secondary Actor</div>
              <div className="stat-value" style={{ fontSize: '1.1rem' }}>Bank System</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Processes transactions and manages accounts</div>
            </div>
            <div className="stat-box" style={{ flex: '1', minWidth: '180px' }}>
              <div className="stat-label">Secondary Actor</div>
              <div className="stat-value" style={{ fontSize: '1.1rem' }}>Technician</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Performs maintenance and cash replenishment</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '1rem' }}>
          <h4>Use Cases</h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', marginTop: '0.75rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Use Case</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Actor</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Withdraw Cash', 'Customer', 'Customer withdraws money from their account'],
                  ['Deposit Cash', 'Customer', 'Customer deposits money into their account'],
                  ['Check Balance', 'Customer', 'Customer checks available balance'],
                  ['Transfer Funds', 'Customer', 'Customer transfers money between accounts'],
                  ['Change PIN', 'Customer', 'Customer changes their ATM PIN'],
                  ['Print Statement', 'Customer', 'Customer requests a mini statement'],
                  ['Authenticate', 'Bank System', 'Validates PIN and card details'],
                  ['Replenish Cash', 'Technician', 'Technician refills ATM cash'],
                ].map(([uc, actor, desc]) => (
                  <tr key={uc} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.5rem', fontWeight: 600 }}>{uc}</td>
                    <td style={{ padding: '0.5rem' }}><span className="badge badge-outline">{actor}</span></td>
                    <td style={{ padding: '0.5rem', color: 'var(--text-secondary)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid-2">
          <div className="card">
            <h4>«include» Relationships</h4>
            <ul style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <li>Withdraw Cash <strong>«includes»</strong> Authenticate</li>
              <li>Deposit Cash <strong>«includes»</strong> Authenticate</li>
              <li>Transfer Funds <strong>«includes»</strong> Authenticate</li>
              <li>Check Balance <strong>«includes»</strong> Authenticate</li>
              <li>Change PIN <strong>«includes»</strong> Authenticate</li>
            </ul>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              «include» means the included use case is always executed as part of the base use case.
            </p>
          </div>
          <div className="card">
            <h4>«extend» Relationships</h4>
            <ul style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <li>Withdraw Cash <strong>«extends»</strong> Print Receipt</li>
              <li>Deposit Cash <strong>«extends»</strong> Print Receipt</li>
              <li>Withdraw Cash <strong>«extends»</strong> Insufficient Funds Warning</li>
              <li>Transfer Funds <strong>«extends»</strong> Print Receipt</li>
            </ul>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              «extend» means the extending use case is optionally executed under certain conditions.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'solid',
    title: 'Experiment 4 – SOLID Principles',
    subtitle: 'SRP, OCP, LSP, ISP, DIP',
    description:
      'Library Management System demonstrating all five SOLID principles with book management, member management, borrowing, returning, fine policies, storage interfaces, and notification interfaces.',
    badge: 'OOP',
    linkTo: 'library',
    linkLabel: 'Open Library System →',
  },
  {
    id: 'uml-diagrams',
    title: 'Experiment 5 – UML Class & Sequence Diagrams',
    subtitle: 'Online Food Ordering System',
    description:
      'UML class diagram showing classes, attributes, relationships and a sequence diagram showing actors, lifelines, and interaction sequences for an Online Food Ordering System.',
    badge: 'UML',
    content: (
      <>
        <h3 style={{ marginBottom: '1rem' }}>Online Food Ordering System – UML Diagrams</h3>

        <div className="card" style={{ marginBottom: '1rem' }}>
          <h4>Class Diagram – Key Classes</h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', marginTop: '0.75rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Class</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Attributes</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Key Methods</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Customer', 'customerId, name, email, phone, address', 'register(), login(), placeOrder(), viewOrderHistory()'],
                  ['Restaurant', 'restaurantId, name, location, rating, menu[]', 'addMenuItem(), updateMenu(), acceptOrder()'],
                  ['MenuItem', 'itemId, name, price, category, isAvailable', 'updatePrice(), toggleAvailability()'],
                  ['Order', 'orderId, items[], totalAmount, status, timestamp', 'calculateTotal(), updateStatus(), cancel()'],
                  ['Payment', 'paymentId, amount, method, status', 'processPayment(), refund(), generateReceipt()'],
                  ['DeliveryAgent', 'agentId, name, phone, currentLocation, isAvailable', 'acceptDelivery(), updateLocation(), markDelivered()'],
                ].map(([cls, attrs, methods]) => (
                  <tr key={cls} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.5rem', fontWeight: 600 }}>{cls}</td>
                    <td style={{ padding: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{attrs}</td>
                    <td style={{ padding: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{methods}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '1rem' }}>
          <h4>Class Relationships</h4>
          <ul style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.8, columns: 2 }}>
            <li>Customer <strong>1 ──── *</strong> Order (places)</li>
            <li>Order <strong>* ──── *</strong> MenuItem (contains)</li>
            <li>Order <strong>1 ──── 1</strong> Payment (has)</li>
            <li>Restaurant <strong>1 ──── *</strong> MenuItem (offers)</li>
            <li>Order <strong>1 ──── 1</strong> DeliveryAgent (assigned to)</li>
            <li>Restaurant <strong>1 ──── *</strong> Order (receives)</li>
          </ul>
        </div>

        <div className="card">
          <h4>Sequence Diagram – Order Placement Flow</h4>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '0.5rem' }}>
            <ol>
              <li><strong>Customer → App:</strong> Browse restaurants and menu</li>
              <li><strong>App → Restaurant:</strong> Fetch available menu items</li>
              <li><strong>Restaurant → App:</strong> Return menu items list</li>
              <li><strong>App → Customer:</strong> Display menu items</li>
              <li><strong>Customer → App:</strong> Add items to cart and place order</li>
              <li><strong>App → Order:</strong> Create new order with items</li>
              <li><strong>Order → Payment:</strong> Initiate payment processing</li>
              <li><strong>Payment → PaymentGateway:</strong> Process transaction</li>
              <li><strong>PaymentGateway → Payment:</strong> Return confirmation</li>
              <li><strong>Payment → Order:</strong> Update order status to "Confirmed"</li>
              <li><strong>Order → Restaurant:</strong> Notify restaurant of new order</li>
              <li><strong>Restaurant → Order:</strong> Accept and start preparing</li>
              <li><strong>Order → DeliveryAgent:</strong> Assign delivery agent</li>
              <li><strong>DeliveryAgent → Customer:</strong> Deliver order and mark as complete</li>
            </ol>
          </div>
        </div>
      </>
    ),
  },
];

export default function SdlcPage({ setCurrentTab }) {
  const [activeExperiment, setActiveExperiment] = useState(null);

  return (
    <div className="page-container">
      <div className="card highlight">
        <div className="card-header">
          <div>
            <h2 className="card-title">Module 1: Software Development &amp; Design</h2>
            <p className="card-subtitle">SDLC Models, UML Diagrams, SOLID Principles &amp; Object‑Oriented Design</p>
          </div>
          <span className="card-tag">4 Experiments</span>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Explore interactive simulations of major SDLC models, UML use case and class diagrams,
          and object‑oriented design principles applied to real‑world systems.
        </p>
      </div>

      {activeExperiment === null ? (
        <div className="grid-2">
          {experiments.map((exp) => (
            <div className="card" key={exp.id}>
              <div className="card-header">
                <div>
                  <h3 className="card-title" style={{ marginTop: '0.2rem' }}>{exp.title}</h3>
                  <p className="card-subtitle">{exp.subtitle}</p>
                </div>
                <span className="badge badge-outline">{exp.badge}</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                {exp.description}
              </p>
              {exp.linkTo ? (
                <button onClick={() => setCurrentTab(exp.linkTo)} className="btn btn-secondary" style={{ width: '100%' }}>
                  {exp.linkLabel}
                </button>
              ) : (
                <button onClick={() => setActiveExperiment(exp.id)} className="btn btn-secondary" style={{ width: '100%' }}>
                  View Experiment →
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setActiveExperiment(null)} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
            ← Back to Experiments
          </button>
          {experiments.find((e) => e.id === activeExperiment)?.content}
        </div>
      )}
    </div>
  );
}

