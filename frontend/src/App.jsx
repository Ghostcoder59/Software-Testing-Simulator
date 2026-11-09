import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import ComplexityPage from './pages/ComplexityPage';
import BlackBoxPage from './pages/BlackBoxPage';
import CocomoPage from './pages/CocomoPage';
import DeploymentPage from './pages/DeploymentPage';
import LibraryPage from './pages/LibraryPage';
import { checkBackendHealth } from './services/api';

export default function App() {
  const [currentTab, setCurrentTab] = useState('overview');
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking' | 'connected' | 'offline'

  // Real stats tracked strictly from actual executions in this session
  const [stats, setStats] = useState({
    complexityCalculations: 0,
    testsExecuted: 0,
    suitesRun: 0,
    cocomoEstimations: 0,
    deploymentsSimulated: 0,
  });

  const handleCalculationPerformed = () => {
    setStats((prev) => ({
      ...prev,
      complexityCalculations: prev.complexityCalculations + 1,
    }));
  };

  const handleTestRun = () => {
    setStats((prev) => ({
      ...prev,
      testsExecuted: prev.testsExecuted + 1,
    }));
  };

  const handleSuiteRun = (count = 1) => {
    setStats((prev) => ({
      ...prev,
      suitesRun: prev.suitesRun + 1,
      testsExecuted: prev.testsExecuted + count,
    }));
  };

  const handleCocomoPerformed = () => {
    setStats((prev) => ({
      ...prev,
      cocomoEstimations: prev.cocomoEstimations + 1,
    }));
  };

  const handleDeploymentSimulated = () => {
    setStats((prev) => ({
      ...prev,
      deploymentsSimulated: prev.deploymentsSimulated + 1,
    }));
  };

  // Verify backend connectivity on mount and periodically
  useEffect(() => {
    let isMounted = true;

    async function probeBackend() {
      try {
        await checkBackendHealth();
        if (isMounted) setBackendStatus('connected');
      } catch (err) {
        if (isMounted) setBackendStatus('offline');
      }
    }

    probeBackend();
    const interval = setInterval(probeBackend, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="app-container">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="app-main">
        <Header currentTab={currentTab} backendStatus={backendStatus} />

        {currentTab === 'overview' && (
          <Overview setCurrentTab={setCurrentTab} stats={stats} />
        )}

        {currentTab === 'complexity' && (
          <ComplexityPage onCalculationPerformed={handleCalculationPerformed} />
        )}

        {currentTab === 'blackbox' && (
          <BlackBoxPage onTestRun={handleTestRun} onSuiteRun={handleSuiteRun} />
        )}

        {currentTab === 'cocomo' && (
          <CocomoPage onEstimatePerformed={handleCocomoPerformed} />
        )}

        {currentTab === 'deployment' && (
          <DeploymentPage onDeploymentSimulated={handleDeploymentSimulated} />
        )}

        {currentTab === 'library' && (
          <LibraryPage />
        )}
      </main>
    </div>
  );
}
