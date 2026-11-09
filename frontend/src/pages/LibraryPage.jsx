import React, { useState, useEffect } from 'react';
import {
  getLibraryState, resetLibraryState, addLibraryBook,
  borrowLibraryBook, returnLibraryBook, calculateLibraryFine, getSolidInfo
} from '../services/api';

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'architecture' | 'fineCalculator'
  const [state, setState] = useState({ books: [], members: [], notifications: [], active_notifier: 'Email' });
  const [solidInfo, setSolidInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);

  // Form states
  const [selectedMember, setSelectedMember] = useState(1);
  const [selectedBook, setSelectedBook] = useState(101);
  const [notificationChannel, setNotificationChannel] = useState('Email');
  const [overdueDays, setOverdueDays] = useState(0);

  // Add book state
  const [newBookId, setNewBookId] = useState(106);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');

  // Fine test state
  const [calcCategory, setCalcCategory] = useState('Student');
  const [calcDays, setCalcDays] = useState(5);
  const [fineResult, setFineResult] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const [libState, sInfo] = await Promise.all([
        getLibraryState(),
        getSolidInfo().catch(() => null)
      ]);
      setState(libState);
      setSolidInfo(sInfo);
      if (libState.books.length > 0) setSelectedBook(libState.books[0].id);
      if (libState.members.length > 0) setSelectedMember(libState.members[0].id);
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', text: 'Failed to connect to backend: ' + err.message });
    } finally {
      setLoading(false);
    }
  }

  async function handleBorrow() {
    try {
      setFeedback(null);
      const res = await borrowLibraryBook(selectedMember, selectedBook, notificationChannel);
      setFeedback({ type: res.success ? 'success' : 'error', text: res.message, principle: res.solid_principle });
      const updated = await getLibraryState();
      setState(updated);
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    }
  }

  async function handleReturn() {
    try {
      setFeedback(null);
      const res = await returnLibraryBook(selectedMember, selectedBook, overdueDays, notificationChannel);
      setFeedback({ type: res.success ? 'success' : 'error', text: res.message, principle: res.solid_principle });
      const updated = await getLibraryState();
      setState(updated);
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    }
  }

  async function handleAddBook(e) {
    e.preventDefault();
    if (!newBookTitle.trim()) return;
    try {
      setFeedback(null);
      const res = await addLibraryBook(newBookId, newBookTitle, newBookAuthor || 'Academic Press');
      setFeedback({ type: res.success ? 'success' : 'error', text: res.message, principle: res.solid_principle });
      setNewBookId(prev => prev + 1);
      setNewBookTitle('');
      setNewBookAuthor('');
      const updated = await getLibraryState();
      setState(updated);
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    }
  }

  async function handleReset() {
    if (!window.confirm('Reset library to default benchmark state?')) return;
    try {
      const reset = await resetLibraryState();
      setState(reset);
      setFeedback({ type: 'success', text: 'Library state reset to default catalogue and members.' });
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    }
  }

  async function handleCalculateFine(e) {
    e.preventDefault();
    try {
      const res = await calculateLibraryFine(calcCategory, calcDays);
      setFineResult(res);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-medium border border-border bg-card rounded mb-3">
            <span className="w-2 h-2 rounded-full bg-foreground inline-block"></span>
            Object-Oriented Design & SOLID Architecture
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Library Management System</h1>
          <p className="text-muted text-sm mt-1">
            Implementation of the five <strong>SOLID principles</strong> featuring polymorphic fine policies, decoupled storage interfaces, and dynamic notification dispatch.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-mono border border-border bg-card hover:bg-card-hover rounded transition-colors"
          >
            Reset Catalog
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-2">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'simulator'
              ? 'border-foreground font-semibold text-foreground'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          Interactive Catalog & Operations
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'architecture'
              ? 'border-foreground font-semibold text-foreground'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          SOLID Principles & UML Architecture
        </button>
        <button
          onClick={() => setActiveTab('fineCalculator')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'fineCalculator'
              ? 'border-foreground font-semibold text-foreground'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          Polymorphic Fine Strategy (OCP)
        </button>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded border text-sm ${
            feedback.type === 'success'
              ? 'border-foreground/40 bg-card text-foreground'
              : 'border-foreground/80 bg-foreground text-background'
          }`}
        >
          <div className="font-semibold">{feedback.text}</div>
          {feedback.principle && (
            <div className="text-xs font-mono opacity-80 mt-1">
              Architecture Concept: {feedback.principle}
            </div>
          )}
        </div>
      )}

      {/* TAB 1: SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-8">
          {/* Top Row: Operation Console & Member Roster */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Borrow & Return Controls */}
            <div className="border border-border bg-card rounded-lg p-5 lg:col-span-2 space-y-5">
              <div className="border-b border-border pb-3">
                <h2 className="text-base font-semibold">Circulation Desk (Borrow / Return)</h2>
                <p className="text-xs text-muted mt-0.5">
                  Executes book loan workflow adhering to Liskov Substitution (limits) and Dependency Inversion (notifications).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Select Member */}
                <div>
                  <label className="block text-xs font-mono font-medium mb-1.5">1. Select Member:</label>
                  <select
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(Number(e.target.value))}
                    className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                  >
                    {state.members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.category} — Borrowed: {m.borrowed}/{m.limit})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Book */}
                <div>
                  <label className="block text-xs font-mono font-medium mb-1.5">2. Select Book:</label>
                  <select
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(Number(e.target.value))}
                    className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                  >
                    {state.books.map((b) => (
                      <option key={b.id} value={b.id}>
                        [{b.id}] {b.title.substring(0, 32)}... ({b.issued ? `Issued to ID ${b.borrower_id}` : 'Available'})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Notification Channel */}
                <div>
                  <label className="block text-xs font-mono font-medium mb-1.5">
                    3. Notification Gateway (DIP Abstraction):
                  </label>
                  <div className="flex gap-2">
                    {['Email', 'SMS'].map((ch) => (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => setNotificationChannel(ch)}
                        className={`flex-1 py-1.5 px-3 text-xs font-mono rounded border transition-colors ${
                          notificationChannel === ch
                            ? 'bg-foreground text-background border-foreground font-bold'
                            : 'bg-background text-foreground border-border hover:bg-card-hover'
                        }`}
                      >
                        {ch === 'Email' ? '📧 Email Notifier' : '📱 SMS Gateway'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Overdue Days (for return) */}
                <div>
                  <label className="block text-xs font-mono font-medium mb-1.5">
                    4. Overdue Days (for Return):
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={overdueDays}
                    onChange={(e) => setOverdueDays(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-background border border-border rounded px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-foreground"
                    placeholder="0 days"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={handleBorrow}
                  className="px-5 py-2 text-sm font-medium bg-foreground text-background rounded hover:opacity-90 transition-opacity"
                >
                  Issue Book (Borrow)
                </button>
                <button
                  onClick={handleReturn}
                  className="px-5 py-2 text-sm font-medium border border-border bg-background hover:bg-card-hover rounded transition-colors"
                >
                  Return Book & Assess Fine
                </button>
              </div>
            </div>

            {/* Member Profiles Card */}
            <div className="border border-border bg-card rounded-lg p-5 space-y-4">
              <div className="border-b border-border pb-3">
                <h2 className="text-base font-semibold">Registered Member Profiles</h2>
                <p className="text-xs text-muted mt-0.5">Liskov Substitution & Fine Tiers</p>
              </div>

              <div className="space-y-3">
                {state.members.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMember(m.id)}
                    className={`p-3 rounded border text-xs cursor-pointer transition-colors ${
                      selectedMember === m.id
                        ? 'border-foreground bg-background font-medium'
                        : 'border-border bg-card hover:bg-card-hover'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm">{m.name}</span>
                      <span className="px-1.5 py-0.5 rounded border border-border font-mono text-[10px]">
                        {m.category}
                      </span>
                    </div>
                    <div className="text-muted flex justify-between text-[11px] font-mono">
                      <span>Borrow Limit: {m.limit} books</span>
                      <span>Fine: ₹{m.fine_per_day}/day</span>
                    </div>
                    <div className="mt-2 w-full bg-border/40 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-foreground h-full transition-all"
                        style={{ width: `${Math.min(100, (m.borrowed / m.limit) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-[10px] font-mono text-muted mt-1">
                      {m.borrowed} / {m.limit} borrowed
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Book Catalog Table */}
          <div className="border border-border bg-card rounded-lg p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-3">
              <div>
                <h2 className="text-base font-semibold">Library Book Inventory (Storage API)</h2>
                <p className="text-xs text-muted mt-0.5">
                  Single Responsibility: Inventory repository handles catalog queries independently of notification and borrowing rules.
                </p>
              </div>
              <span className="text-xs font-mono text-muted">
                Total Books: {state.books.length} | Available: {state.books.filter(b => !b.issued).length}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border bg-background text-muted font-mono uppercase text-[11px]">
                    <th className="py-2.5 px-3">ID</th>
                    <th className="py-2.5 px-3">Title</th>
                    <th className="py-2.5 px-3">Author</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Current Borrower</th>
                    <th className="py-2.5 px-3 text-right">Quick Select</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-mono">
                  {state.books.map((b) => (
                    <tr
                      key={b.id}
                      className={`hover:bg-background/80 transition-colors ${
                        selectedBook === b.id ? 'bg-background font-bold' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3">{b.id}</td>
                      <td className="py-2.5 px-3 font-sans font-medium">{b.title}</td>
                      <td className="py-2.5 px-3 font-sans text-muted">{b.author}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono border ${
                            b.issued
                              ? 'border-foreground/80 bg-foreground text-background'
                              : 'border-border bg-background text-foreground'
                          }`}
                        >
                          {b.issued ? 'ISSUED' : 'AVAILABLE'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-muted">
                        {b.issued ? `${b.borrower_name} (ID: ${b.borrower_id})` : '—'}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => setSelectedBook(b.id)}
                          className="px-2 py-1 text-[11px] border border-border rounded hover:bg-card-hover font-mono"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Book & Notification Log */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add Book Form */}
            <form onSubmit={handleAddBook} className="border border-border bg-card rounded-lg p-5 space-y-4">
              <div className="border-b border-border pb-3">
                <h2 className="text-base font-semibold">Add New Book (SRP Storage API)</h2>
                <p className="text-xs text-muted mt-0.5">
                  Demonstrates SRP: The catalog storage accepts new entries without touching borrower logic.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium mb-1">Book ID:</label>
                  <input
                    type="number"
                    value={newBookId}
                    onChange={(e) => setNewBookId(parseInt(e.target.value) || 0)}
                    className="w-full bg-background border border-border rounded px-3 py-1.5 text-xs font-mono"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-mono font-medium mb-1">Book Title:</label>
                  <input
                    type="text"
                    value={newBookTitle}
                    onChange={(e) => setNewBookTitle(e.target.value)}
                    placeholder="e.g. Design Patterns: Elements of Reusable OO Software"
                    className="w-full bg-background border border-border rounded px-3 py-1.5 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium mb-1">Author / Publisher:</label>
                <input
                  type="text"
                  value={newBookAuthor}
                  onChange={(e) => setNewBookAuthor(e.target.value)}
                  placeholder="e.g. Erich Gamma, Richard Helm"
                  className="w-full bg-background border border-border rounded px-3 py-1.5 text-xs"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 text-xs font-mono font-medium bg-foreground text-background rounded hover:opacity-90"
              >
                + Add Book to Storage
              </button>
            </form>

            {/* Notification Dispatch Console */}
            <div className="border border-border bg-card rounded-lg p-5 space-y-3">
              <div className="border-b border-border pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-base font-semibold">Notification Dispatch Log</h2>
                  <p className="text-xs text-muted mt-0.5">Dependency Inversion Principle (DIP)</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-border">
                  Channel: {state.active_notifier}
                </span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {state.notifications.slice().reverse().map((n, idx) => (
                  <div key={idx} className="p-2.5 rounded border border-border bg-background text-xs font-mono">
                    <div className="flex justify-between text-[10px] text-muted mb-1">
                      <span>[{n.channel}] &rarr; {n.recipient}</span>
                      <span>{n.timestamp}</span>
                    </div>
                    <div className="break-words text-foreground font-sans text-xs">
                      {n.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ARCHITECTURE & SOLID PRINCIPLES */}
      {activeTab === 'architecture' && (
        <div className="space-y-8">
          <div className="border border-border bg-card rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-bold">SOLID Principles in Object-Oriented Software Design</h2>
            <p className="text-sm text-muted">
              How the five SOLID design principles are implemented in the Library Management System (Lab Manual Practical No. 4):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {[
                {
                  letter: 'S',
                  name: 'Single Responsibility (SRP)',
                  desc: 'A class or function should have only one reason to change.',
                  app: 'Book Storage API, Member Roster, Fine Calculator, and Notifier are cleanly decoupled into standalone services.',
                  cCode: 'Separate storage_add(), borrow_book(), and notifier_send() functions.'
                },
                {
                  letter: 'O',
                  name: 'Open/Closed Principle (OCP)',
                  desc: 'Entities should be open for extension, but closed for modification.',
                  app: 'Fine calculation is abstracted as a polymorphic rate policy (Student: ₹2/d, Faculty: ₹1/d, Guest: ₹4/d). Adding new roles requires zero modification to loan code.',
                  cCode: 'Function pointer strategy int (*fine)(int days) in Member struct.'
                },
                {
                  letter: 'L',
                  name: 'Liskov Substitution (LSP)',
                  desc: 'Derived classes must be substitutable for their base types.',
                  app: 'Student, Faculty, and Guest instances seamlessly fulfill the Member contract with custom quotas (3, 5, 2) without runtime casting.',
                  cCode: 'Generic Member pointer passed to borrow_book(Library*, Member*, int).'
                },
                {
                  letter: 'I',
                  name: 'Interface Segregation (ISP)',
                  desc: 'Clients should not depend on interfaces they do not consume.',
                  app: 'StorageAPI (Add, Find, Count) is segregated from NotificationService (Send) and FineStrategy.',
                  cCode: 'Distinct StorageAPI and Notifier structs with dedicated function pointers.'
                },
                {
                  letter: 'D',
                  name: 'Dependency Inversion (DIP)',
                  desc: 'High-level modules must depend on abstractions, not concretions.',
                  app: 'The Library circulation engine depends on the abstract NotifierInterface, enabling zero-code swapping between Email and SMS gateways.',
                  cCode: 'Library struct holds Notifier* pointer; dispatches via lib->notifier->send().'
                }
              ].map((item) => (
                <div key={item.letter} className="border border-border bg-background p-4 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-7 h-7 rounded bg-foreground text-background flex items-center justify-center font-mono font-bold text-sm">
                        {item.letter}
                      </span>
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                    </div>
                    <p className="text-xs text-muted mb-3">{item.desc}</p>
                    <div className="text-xs bg-card p-2.5 rounded border border-border mb-2">
                      <strong className="block text-[10px] font-mono uppercase text-muted mb-1">Architecture Implementation:</strong>
                      {item.app}
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-muted border-t border-border pt-2 mt-2">
                    C Lab implementation: <code>{item.cCode}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* UML Class Diagram Card */}
          <div className="border border-border bg-card rounded-lg p-6 space-y-4">
            <div className="border-b border-border pb-3">
              <h2 className="text-base font-semibold">UML Class & Architecture Diagram</h2>
              <p className="text-xs text-muted mt-0.5">
                Structural relationship between Storage, Members, Fine Strategies, and Notifiers.
              </p>
            </div>

            <div className="p-4 bg-background border border-border rounded font-mono text-xs overflow-x-auto leading-relaxed">
              <pre className="text-foreground">
{`+---------------------------------------------------------------------------------------+
|                                    LIBRARY SYSTEM                                     |
+---------------------------------------------------------------------------------------+
                                           |
                   +-----------------------+-----------------------+
                   | (depends on)                                  | (depends on)
                   v                                               v
        +----------------------+                        +----------------------+
        |   <<interface>>      |                        |   <<interface>>      |
        |     StorageAPI       |                        |   NotifierInterface  |
        +----------------------+                        +----------------------+
        | + add(Book): bool    |                        | + send(to, msg)      |
        | + find(id): Book     |                        +----------------------+
        | + list(): Book[]     |                                   ^
        +----------------------+                                   |
                   ^                                 +-------------+-------------+
                   | (implements)                    |                           |
        +----------------------+           +-------------------+       +-------------------+
        |    MemoryStorage     |           |   EmailNotifier   |       |    SMSNotifier    |
        +----------------------+           +-------------------+       +-------------------+
        | - books: Book[]      |           | + send(): Log     |       | + send(): Log     |
        +----------------------+           +-------------------+       +-------------------+

                                           |
                                  operates on Members
                                           |
                                           v
                          +----------------------------------+
                          |              Member              |
                          +----------------------------------+
                          | + id: int                        |
                          | + name: string                   |
                          | + category: MemberCategory       |
                          | + limit: int                     |
                          | + borrowed: int                  |
                          | + fine_strategy: FinePolicy      |
                          +----------------------------------+
                                           |
                     +---------------------+---------------------+
                     |                     |                     |
                     v                     v                     v
            +-----------------+   +-----------------+   +-----------------+
            |  StudentMember  |   |  FacultyMember  |   |   GuestMember   |
            +-----------------+   +-----------------+   +-----------------+
            | limit: 3 books  |   | limit: 5 books  |   | limit: 2 books  |
            | fine: ₹2 / day  |   | fine: ₹1 / day  |   | fine: ₹4 / day  |
            +-----------------+   +-----------------+   +-----------------+`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FINE CALCULATOR */}
      {activeTab === 'fineCalculator' && (
        <div className="space-y-6">
          <div className="border border-border bg-card rounded-lg p-6 space-y-4">
            <div className="border-b border-border pb-3">
              <h2 className="text-base font-semibold">Open/Closed Principle (OCP) Fine Calculator</h2>
              <p className="text-xs text-muted mt-0.5">
                Demonstrates how late return fines are determined dynamically through polymorphic strategy policies.
              </p>
            </div>

            <form onSubmit={handleCalculateFine} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-xs font-mono font-medium mb-1.5">Member Category:</label>
                <select
                  value={calcCategory}
                  onChange={(e) => setCalcCategory(e.target.value)}
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
                >
                  <option value="Student">Student (₹2 / day)</option>
                  <option value="Faculty">Faculty (₹1 / day)</option>
                  <option value="Guest">Guest / Scholar (₹4 / day)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium mb-1.5">Days Overdue:</label>
                <input
                  type="number"
                  min="0"
                  value={calcDays}
                  onChange={(e) => setCalcDays(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm font-mono"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 text-sm font-medium bg-foreground text-background rounded hover:opacity-90"
                >
                  Calculate Late Fine
                </button>
              </div>
            </form>

            {/* Results Display */}
            {fineResult && (
              <div className="mt-6 p-5 border border-border bg-background rounded-lg space-y-3 font-mono">
                <div className="text-xs uppercase text-muted tracking-wider">Calculation Breakdown:</div>
                <div className="text-2xl font-bold text-foreground">
                  Total Fine: ₹{fineResult.total_fine.toFixed(2)}
                </div>
                <div className="text-xs text-muted">
                  Formula Applied: <code>{fineResult.formula}</code>
                </div>
                <div className="text-xs text-foreground/90 bg-card p-3 rounded border border-border">
                  <strong>Architectural Guarantee:</strong> {fineResult.principle_applied}
                </div>
              </div>
            )}
          </div>

          {/* Comparative Table */}
          <div className="border border-border bg-card rounded-lg p-5 space-y-3">
            <h3 className="text-sm font-semibold">Fine & Borrowing Quotas by Member Role</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted font-mono uppercase text-[11px]">
                    <th className="py-2 px-3">Role</th>
                    <th className="py-2 px-3">Max Quota</th>
                    <th className="py-2 px-3">Daily Fine Rate</th>
                    <th className="py-2 px-3">7-Day Overdue Example</th>
                    <th className="py-2 px-3">Policy Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-mono">
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-semibold">Student</td>
                    <td className="py-2.5 px-3">3 books</td>
                    <td className="py-2.5 px-3">₹2.00 / day</td>
                    <td className="py-2.5 px-3">₹14.00</td>
                    <td className="py-2.5 px-3 font-sans text-muted">Standard academic loan with student subsidy</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-semibold">Faculty</td>
                    <td className="py-2.5 px-3">5 books</td>
                    <td className="py-2.5 px-3">₹1.00 / day</td>
                    <td className="py-2.5 px-3">₹7.00</td>
                    <td className="py-2.5 px-3 font-sans text-muted">Extended research quota with subsidized fine</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-semibold">Guest / Visitor</td>
                    <td className="py-2.5 px-3">2 books</td>
                    <td className="py-2.5 px-3">₹4.00 / day</td>
                    <td className="py-2.5 px-3">₹28.00</td>
                    <td className="py-2.5 px-3 font-sans text-muted">Strict turnover policy for non-institution members</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
