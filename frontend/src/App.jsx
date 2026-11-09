import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import SdlcPage from './pages/SdlcPage';
import EstimationPage from './pages/EstimationPage';
import TestingPage from './pages/TestingPage';
import CaseStudyPage from './pages/CaseStudyPage';
import CocomoPage from './pages/CocomoPage';
import DeploymentPage from './pages/DeploymentPage';
import LibraryPage from './pages/LibraryPage';
import { checkBackendHealth } from './services/api';

export default function App() {
  const [currentTab, setCurrentTab] = useState('overview');
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking' | 'connected' | 'offline'

  // Real stats tracked strictly from actual executions in this session
  const [stats, setStats] = useState({
    cocomoEstimations: 0,
    deploymentsSimulated: 0,
  });

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

        {currentTab === 'sdlc' && (
          <SdlcPage setCurrentTab={setCurrentTab} />
        )}

        {currentTab === 'estimation' && (
          <EstimationPage setCurrentTab={setCurrentTab} />
        )}

        {currentTab === 'testing' && (
          <TestingPage />
        )}

        {currentTab === 'case' && (
          <CaseStudyPage setCurrentTab={setCurrentTab} />
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
