import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import SentimentExplorerPage from './pages/SentimentExplorerPage';
import TopicExplorerPage from './pages/TopicExplorerPage';
import CompanySignalsPage from './pages/CompanySignalsPage';
import MethodologyPage from './pages/MethodologyPage';
import InsightsPage from './pages/InsightsPage';
import LimitationsPage from './pages/LimitationsPage';

export default function App() {
  // Sync tab with URL hash if present
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

  // Update hash when activeTab changes
  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  // Update HTML class for dark/light mode
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

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'landing' && <LandingPage setActiveTab={setActiveTab} />}
        {activeTab === 'dashboard' && <DashboardPage setActiveTab={setActiveTab} />}
        {activeTab === 'sentiment' && <SentimentExplorerPage />}
        {activeTab === 'topics' && <TopicExplorerPage />}
        {activeTab === 'companies' && <CompanySignalsPage />}
        {activeTab === 'methodology' && <MethodologyPage />}
        {activeTab === 'insights' && <InsightsPage />}
        {activeTab === 'limitations' && <LimitationsPage />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
