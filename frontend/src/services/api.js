// API client for communicating with the FastAPI backend

const RAW_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
// Strip trailing slash if present to avoid '//api/...' URL duplication
const BASE_URL = RAW_URL.replace(/\/+$/, '');

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

// Module 1: Cyclomatic Complexity
export async function calculateComplexity(nodes, edges, components = 1) {
  const res = await fetch(`${BASE_URL}/api/complexity/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodes: Number(nodes), edges: Number(edges), components: Number(components) }),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || `Server error: ${res.status}`);
  }
  return await res.json();
}

export async function getComplexityExamples() {
  const res = await fetch(`${BASE_URL}/api/complexity/examples`);
  if (!res.ok) throw new Error(`Failed to load examples: ${res.status}`);
  return await res.json();
}

// Module 2: Black-Box Testing
export async function generateBlackboxTests(technique = 'ALL') {
  const res = await fetch(`${BASE_URL}/api/blackbox/generate-tests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ technique }),
  });
  if (!res.ok) throw new Error(`Failed to generate test cases: ${res.status}`);
  return await res.json();
}

export async function runBlackboxTest(testCase) {
  const res = await fetch(`${BASE_URL}/api/blackbox/run-test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ test_case: testCase }),
  });
  if (!res.ok) throw new Error(`Failed to execute test case: ${res.status}`);
  return await res.json();
}

export async function runBlackboxSuite(testCases) {
  const res = await fetch(`${BASE_URL}/api/blackbox/run-suite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ test_cases: testCases }),
  });
  if (!res.ok) throw new Error(`Failed to execute test suite: ${res.status}`);
  return await res.json();
}

export async function evaluateMark(mark) {
  const res = await fetch(`${BASE_URL}/api/blackbox/evaluate-mark`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mark }),
  });
  if (!res.ok) throw new Error(`Failed to evaluate mark: ${res.status}`);
  return await res.json();
}

// Module 3: Basic COCOMO Estimation
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

// Module 4: Release & Deployment Strategies
export async function simulateBlueGreen(switchToGreen, greenHealthy = true) {
  const res = await fetch(`${BASE_URL}/api/deployment/blue-green`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ switch_to_green: switchToGreen, green_healthy: greenHealthy }),
  });
  if (!res.ok) throw new Error(`Blue-Green error: ${res.status}`);
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
