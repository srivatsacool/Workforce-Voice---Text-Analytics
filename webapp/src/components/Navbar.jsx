import React, { useState, useRef, useEffect } from 'react';
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
  BookOpen,
  ChevronDown,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useWorldTheme } from '../context/worldTheme';

export default function Navbar({ activeTab, setActiveTab, darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const timeoutRef = useRef(null);
  const navContainerRef = useRef(null);
  const { world, setWorld } = useWorldTheme();

  const navigationClusters = [
    {
      id: 'landing',
      label: 'Overview',
      icon: Home,
      type: 'link',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      type: 'dropdown',
      items: [
        { 
          id: 'dashboard', 
          label: 'Executive Dashboard', 
          desc: 'Cross-company KPIs, signal divergence & review inspector', 
          icon: BarChart3,
          badge: 'Core'
        },
        { 
          id: 'sentiment', 
          label: 'Sentiment & ML Polarity', 
          desc: 'VADER empirical distributions & Logistic Regression weights', 
          icon: HeartHandshake,
          badge: 'ML'
        },
        { 
          id: 'topics', 
          label: 'Thematic Clusters (LDA)', 
          desc: '6 latent themes, co-occurrences & topic balance', 
          icon: Layers,
          badge: 'NLP'
        },
        { 
          id: 'companies', 
          label: 'Company Archetypes', 
          desc: '90 employer profiles, subratings & thematic fingerprints', 
          icon: Building2,
          badge: '90 Corps'
        },
      ]
    },
    {
      id: 'governance',
      label: 'Governance & Rigor',
      icon: ShieldCheck,
      type: 'dropdown',
      items: [
        { 
          id: 'methodology', 
          label: '9-Stage Pipeline', 
          desc: 'Data ingestion, EDA, NLP tokenization & model specifications', 
          icon: Cpu,
          badge: 'Pipeline'
        },
        { 
          id: 'insights', 
          label: 'Executive Insights', 
          desc: '4-part non-causal framework & Priority Action Matrix', 
          icon: Lightbulb,
          badge: 'Signals'
        },
        { 
          id: 'limitations', 
          label: 'Limitations & Ethics', 
          desc: 'Sampling bias, causal boundaries & responsible AI guidelines', 
          icon: AlertTriangle,
          badge: 'Ethics'
        },
      ]
    },
    {
      id: 'worlds',
      label: 'Design Studio',
      icon: Sparkles,
      type: 'link',
    }
  ];

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleNavClick = (id) => {
    setActiveTab(id);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMouseEnter = (id) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(id);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(prev => prev === id ? null : id);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/90 dark:bg-slate-950/90 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3.5 cursor-pointer group shrink-0"
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

          {/* Desktop Hierarchical Navigation */}
          <nav ref={navContainerRef} className="hidden lg:flex items-center gap-2">
            {navigationClusters.map((cluster) => {
              if (cluster.type === 'link') {
                const Icon = cluster.icon;
                const isActive = activeTab === cluster.id;
                return (
                  <button
                    key={cluster.id}
                    onClick={() => handleNavClick(cluster.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 ring-1 ring-blue-400/40' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-850 hover:bg-slate-800/70'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{cluster.label}</span>
                  </button>
                );
              }

              // Dropdown Cluster
              const ClusterIcon = cluster.icon;
              const isChildActive = cluster.items.some(item => item.id === activeTab);
              const isOpen = openDropdown === cluster.id;

              return (
                <div 
                  key={cluster.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(cluster.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => toggleDropdown(cluster.id)}
                    aria-expanded={isOpen}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all ${
                      isChildActive
                        ? 'bg-blue-600/90 text-white shadow-md shadow-blue-600/20 ring-1 ring-blue-400/50'
                        : isOpen
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                    }`}
                  >
                    <ClusterIcon className="w-4 h-4" />
                    <span>{cluster.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-300' : 'text-slate-400'}`} />
                  </button>

                  {/* Dropdown Floating Flyout Card */}
                  {isOpen && (
                    <div 
                      className="absolute top-full left-0 mt-2.5 w-80 sm:w-88 rounded-2xl bg-slate-950/95 border border-slate-800 shadow-2xl shadow-black/80 p-2 backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150 space-y-1"
                    >
                      <div className="px-3 py-1.5 border-b border-slate-800/80 flex items-center justify-between mb-1">
                        <span className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider">
                          {cluster.label}
                        </span>
                        <span className="text-xs font-mono text-blue-400">
                          {cluster.items.length} Modules
                        </span>
                      </div>

                      {cluster.items.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = activeTab === subItem.id;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => handleNavClick(subItem.id)}
                            className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left cursor-pointer transition-all ${
                              isSubActive
                                ? 'bg-blue-600/20 border border-blue-500/40 text-white shadow-sm'
                                : 'hover:bg-slate-900/90 border border-transparent text-slate-300 hover:text-white'
                            }`}
                          >
                            <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                              isSubActive ? 'bg-blue-600 text-white' : 'bg-slate-900 text-blue-400 border border-slate-800'
                            }`}>
                              <SubIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className={`text-sm font-semibold truncate ${isSubActive ? 'text-white' : 'text-slate-200'}`}>
                                  {subItem.label}
                                </span>
                                {subItem.badge && (
                                  <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60 shrink-0">
                                    {subItem.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 leading-relaxed">
                                {subItem.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
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
                <span className="hidden xl:inline text-xs font-medium">Editorial</span>
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
                <span className="hidden xl:inline text-xs font-medium">Cybernetic</span>
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
                <span className="hidden xl:inline text-xs font-medium">Biomorphic</span>
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
            </button>

            {/* GitHub Repo Link */}
            <a
              href="https://github.com/srivatsacool/Workforce-Voice---Text-Analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-2 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/80 transition-colors font-mono font-medium"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/98 px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Mobile World Switcher */}
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 mb-2">
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block mb-2">
              Active Design World
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setWorld('editorial')}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs transition-all ${
                  world === 'editorial' 
                    ? 'bg-amber-600/30 text-amber-300 font-bold border border-amber-500/40' 
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Editorial</span>
              </button>
              <button
                onClick={() => setWorld('cybernetic')}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs transition-all ${
                  world === 'cybernetic' 
                    ? 'bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-400/40' 
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cybernetic</span>
              </button>
              <button
                onClick={() => setWorld('biomorphic')}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs transition-all ${
                  world === 'biomorphic' 
                    ? 'bg-purple-500/25 text-fuchsia-300 font-bold border border-purple-400/40' 
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Biomorphic</span>
              </button>
            </div>
          </div>

          {/* Navigation Clusters in Mobile Drawer */}
          <div className="space-y-3">
            {navigationClusters.map((cluster) => {
              if (cluster.type === 'link') {
                const Icon = cluster.icon;
                const isActive = activeTab === cluster.id;
                return (
                  <button
                    key={cluster.id}
                    onClick={() => handleNavClick(cluster.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'bg-slate-900/60 border border-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                      <span>{cluster.label}</span>
                    </div>
                    {isActive && <Check className="w-4 h-4 text-white" />}
                  </button>
                );
              }

              // Categorized Section in Mobile
              const ClusterIcon = cluster.icon;
              const isParentActive = cluster.items.some(item => item.id === activeTab);

              return (
                <div key={cluster.id} className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between px-1 pb-1 border-b border-slate-800/60">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                      <ClusterIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>{cluster.label}</span>
                    </div>
                    {isParentActive && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {cluster.items.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = activeTab === subItem.id;
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => handleNavClick(subItem.id)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                            isSubActive
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <SubIcon className={`w-4 h-4 shrink-0 ${isSubActive ? 'text-white' : 'text-blue-400'}`} />
                            <div className="truncate">
                              <div className="text-sm font-semibold">{subItem.label}</div>
                              <div className={`text-xs truncate ${isSubActive ? 'text-blue-100' : 'text-slate-400'}`}>
                                {subItem.desc}
                              </div>
                            </div>
                          </div>
                          {isSubActive && <Check className="w-4 h-4 shrink-0 text-white ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
