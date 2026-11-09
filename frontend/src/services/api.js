// API client for communicating with the FastAPI backend (cleaned version)

const RAW_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
// Strip trailing slash if present to avoid '//api/...' URL duplication
const BASE_URL = RAW_URL.replace(/\/+$/, '');

/**
 * Check backend health endpoint.
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to connect to backend:', err);
    throw err;
  }
}

/* ------------------------------------------------------------------
 * Module 3: Basic COCOMO Estimation
 * ------------------------------------------------------------------ */
export async function estimateCocomo(kloc, mode, costPerPm = 5000.0) {
  const res = await fetch(`${BASE_URL}/api/cocomo/estimate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kloc: Number(kloc), mode, cost_per_pm: Number(costPerPm) }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Server error: ${res.status}`);
  }
  return await res.json();
}

/* ------------------------------------------------------------------
 * Module 4: Release & Deployment Strategies
 * ------------------------------------------------------------------ */
export async function simulateBlueGreen(switchToGreen, greenHealthy = true) {
  const res = await fetch(`${BASE_URL}/api/deployment/blue-green`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ switch_to_green: switchToGreen, green_healthy: greenHealthy }),
  });
  if (!res.ok) throw new Error(`Blue‑Green error: ${res.status}`);
  return await res.json();
}

export async function simulateCanary(percentage, simulateError = false) {
  const res = await fetch(`${BASE_URL}/api/deployment/canary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ percentage: Number(percentage), simulate_error: simulateError }),
  });
  if (!res.ok) throw new Error(`Canary error: ${res.status}`);
  return await res.json();
}

export async function simulateRollingUpdate(totalServers, batchSize, currentStep) {
  const res = await fetch(`${BASE_URL}/api/deployment/rolling`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ total_servers: Number(totalServers), batch_size: Number(batchSize), current_step: Number(currentStep) }),
  });
  if (!res.ok) throw new Error(`Rolling update error: ${res.status}`);
  return await res.json();
}

/* ------------------------------------------------------------------
 * Module 5: Library Management System (SOLID Principles & OOP)
 * ------------------------------------------------------------------ */
export async function getLibraryState() {
  const res = await fetch(`${BASE_URL}/api/library/state`);
  if (!res.ok) throw new Error(`Failed to fetch library state: ${res.status}`);
  return await res.json();
}

export async function resetLibraryState() {
  const res = await fetch(`${BASE_URL}/api/library/reset`, { method: 'POST' });
  if (!res.ok) throw new Error(`Failed to reset library: ${res.status}`);
  return await res.json();
}

export async function addLibraryBook(id, title, author) {
  const res = await fetch(`${BASE_URL}/api/library/add-book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: Number(id), title, author }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Add book error: ${res.status}`);
  }
  return await res.json();
}

export async function borrowLibraryBook(memberId, bookId, channel = 'Email') {
  const res = await fetch(`${BASE_URL}/api/library/borrow`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ member_id: Number(memberId), book_id: Number(bookId), notification_channel: channel }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Borrow error: ${res.status}`);
  }
  return await res.json();
}

export async function returnLibraryBook(memberId, bookId, daysOverdue = 0, channel = 'Email') {
  const res = await fetch(`${BASE_URL}/api/library/return`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      member_id: Number(memberId),
      book_id: Number(bookId),
      days_overdue: Number(daysOverdue),
      notification_channel: channel,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Return error: ${res.status}`);
  }
  return await res.json();
}

export async function calculateLibraryFine(category, daysOverdue) {
  const res = await fetch(`${BASE_URL}/api/library/calculate-fine`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, days_overdue: Number(daysOverdue) }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Calculate fine error: ${res.status}`);
  }
  return await res.json();
}

export async function getSolidInfo() {
  const res = await fetch(`${BASE_URL}/api/library/solid-info`);
  if (!res.ok) throw new Error(`Failed to load SOLID info: ${res.status}`);
  return await res.json();
}
