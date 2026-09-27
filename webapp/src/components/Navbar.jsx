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
  ExternalLink,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useWorldTheme } from '../context/worldTheme';

export default function Navbar({ activeTab, setActiveTab, darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { world, setWorld } = useWorldTheme();

  const navItems = [
    { id: 'landing', label: 'Overview', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'sentiment', label: 'Sentiment', icon: HeartHandshake },
    { id: 'topics', label: 'Topics', icon: Layers },
    { id: 'companies', label: 'Company Signals', icon: Building2 },
    { id: 'worlds', label: 'Design Worlds', icon: Sparkles },
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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/90 dark:bg-slate-950/90 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-extrabold text-lg tracking-tight text-white font-heading">
                  WORKFORCE INTELLIGENCE
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  90 US EMPLOYERS
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Organizational Analytics & Strategic NLP Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* 3-World Theme Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 border border-slate-800 text-xs">
              <button
                onClick={() => setWorld('editorial')}
                title="World 01: Editorial Gazette (Financial Times & Bloomberg Whitepaper)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  world === 'editorial' 
                    ? 'bg-amber-600/30 text-amber-300 font-semibold border border-amber-500/40 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="hidden lg:inline text-xs font-medium">Editorial</span>
              </button>

              <button
                onClick={() => setWorld('cybernetic')}
                title="World 02: Cybernetic Matrix (NASA Mission Control Telemetry)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  world === 'cybernetic' 
                    ? 'bg-cyan-500/25 text-cyan-300 font-semibold border border-cyan-400/40 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="hidden lg:inline text-xs font-medium">Cybernetic</span>
              </button>

              <button
                onClick={() => setWorld('biomorphic')}
                title="World 03: Biomorphic Canvas (Neural Acoustic Voice Waves)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  world === 'biomorphic' 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-fuchsia-300 font-semibold border border-purple-400/40 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4 text-fuchsia-400" />
                <span className="hidden lg:inline text-xs font-medium">Biomorphic</span>
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
            </button>

            {/* GitHub Repo Link */}
            <a
              href="https://github.com/srivatsacool/Workforce-Voice---Text-Analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-2 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/80 transition-colors font-mono font-medium"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            {/* Kaggle Dataset Badge Link */}
            <a
              href="https://www.kaggle.com/datasets/scrapifier/glassdoor-employee-reviews-top-us-employers"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 px-3 py-2 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-colors"
            >
              <span>Kaggle Dataset</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-4 space-y-2">
          {/* Mobile World Switcher */}
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 mb-2">
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block mb-1.5">
              Active Design World
            </span>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => setWorld('editorial')}
                className={`flex items-center justify-center gap-1 py-1.5 rounded text-xs transition-all ${
                  world === 'editorial' 
                    ? 'bg-amber-600/30 text-amber-300 font-bold border border-amber-500/40' 
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                <BookOpen className="w-3 h-3 text-amber-400" />
                <span>Editorial</span>
              </button>
              <button
                onClick={() => setWorld('cybernetic')}
                className={`flex items-center justify-center gap-1 py-1.5 rounded text-xs transition-all ${
                  world === 'cybernetic' 
                    ? 'bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-400/40' 
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span>Cybernetic</span>
              </button>
              <button
                onClick={() => setWorld('biomorphic')}
                className={`flex items-center justify-center gap-1 py-1.5 rounded text-xs transition-all ${
                  world === 'biomorphic' 
                    ? 'bg-purple-500/25 text-fuchsia-300 font-bold border border-purple-400/40' 
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                <Sparkles className="w-3 h-3 text-fuchsia-400" />
                <span>Biomorphic</span>
              </button>
            </div>
          </div>

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
