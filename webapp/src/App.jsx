import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';

// Route-level lazy loading to optimize initial page performance and bundle size
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const SentimentExplorerPage = lazy(() => import('./pages/SentimentExplorerPage'));
const TopicExplorerPage = lazy(() => import('./pages/TopicExplorerPage'));
const CompanySignalsPage = lazy(() => import('./pages/CompanySignalsPage'));
const MethodologyPage = lazy(() => import('./pages/MethodologyPage'));
const InsightsPage = lazy(() => import('./pages/InsightsPage'));
const LimitationsPage = lazy(() => import('./pages/LimitationsPage'));

function PageLoader() {
  return (
    <div className="py-24 flex flex-col items-center justify-center space-y-3">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-mono text-slate-400">Loading workforce intelligence module...</span>
    </div>
  );
}

export default function App() {
  const getInitialTab = () => {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['landing', 'dashboard', 'sentiment', 'topics', 'companies', 'methodology', 'insights', 'limitations'];
    return validTabs.includes(hash) ? hash : 'landing';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('wi_dark_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('wi_dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-slate-950 text-slate-100 antialiased font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-slate-50 text-slate-900 antialiased font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200';
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />

      {/* Main Content Area with Lazy Loading Suspense Boundary */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Suspense fallback={<PageLoader />}>
          {activeTab === 'landing' && <LandingPage setActiveTab={setActiveTab} />}
          {activeTab === 'dashboard' && <DashboardPage setActiveTab={setActiveTab} />}
          {activeTab === 'sentiment' && <SentimentExplorerPage />}
          {activeTab === 'topics' && <TopicExplorerPage />}
          {activeTab === 'companies' && <CompanySignalsPage />}
          {activeTab === 'methodology' && <MethodologyPage />}
          {activeTab === 'insights' && <InsightsPage />}
          {activeTab === 'limitations' && <LimitationsPage />}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
