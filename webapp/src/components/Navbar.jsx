import React, { useState } from 'react';
import { 
  BarChart3, 
  Layers, 
  HeartHandshake, 
  Building2, 
  Cpu, 
  Lightbulb, 
  AlertTriangle, 
  Home, 
  Sun, 
  Moon, 
  Menu, 
  X,
  ExternalLink
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Overview', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'sentiment', label: 'Sentiment', icon: HeartHandshake },
    { id: 'topics', label: 'Topics', icon: Layers },
    { id: 'companies', label: 'Company Signals', icon: Building2 },
    { id: 'methodology', label: 'Methodology', icon: Cpu },
    { id: 'insights', label: 'Executive Insights', icon: Lightbulb },
    { id: 'limitations', label: 'Limitations', icon: AlertTriangle },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 dark:bg-slate-950/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white font-heading">
                  WORKFORCE INTELLIGENCE
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  90 US EMPLOYERS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Organizational Analytics & NLP Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
            </button>

            {/* GitHub Repo Link */}
            <a
              href="https://github.com/srivatsacool/Workforce-Voice---Text-Analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/80 transition-colors font-mono"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            {/* Kaggle Dataset Badge Link */}
            <a
              href="https://www.kaggle.com/datasets/scrapifier/glassdoor-employee-reviews-top-us-employers"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-xs text-slate-400 hover:text-blue-400 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-colors"
            >
              <span>Kaggle Dataset</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
