import React from 'react';
import { ShieldCheck, Database, GitBranch, ExternalLink } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-24 border-t border-slate-800/80 bg-slate-950/80 text-slate-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="font-extrabold text-white tracking-tight text-base font-heading">
              WORKFORCE INTELLIGENCE
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Transforming unstructured employee reviews into actionable organizational signals, thematic friction points, and retention anchors using NLP and topic modeling.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Empirical Research Architecture
              </span>
            </div>
          </div>

          {/* Analytical Navigation */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs mb-4">
              Analytical Modules
            </h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-slate-400 text-sm"
                >
                  Intelligence Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('sentiment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-slate-400 text-sm"
                >
                  Sentiment & Divergence
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('topics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-slate-400 text-sm"
                >
                  LDA Topic Landscape
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('companies'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-slate-400 text-sm"
                >
                  Company Signals Explorer
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Methodology */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs mb-4">
              Governance & Rigor
            </h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => { setActiveTab('methodology'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-slate-400 text-sm"
                >
                  9-Stage Pipeline & Governance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('insights'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-slate-400 text-sm"
                >
                  Executive Findings & Priority Matrix
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('limitations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-amber-400/90 hover:text-amber-300 text-sm font-medium"
                >
                  Methodological Limitations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('worlds'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-slate-400 text-sm"
                >
                  Design Worlds Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Dataset & Provenance */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs mb-4">
              Data Provenance
            </h4>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Kaggle Glassdoor corpus of 90 Top US Employers (8,785 validated reviews with 100% pros/cons text).
            </p>
            <div className="space-y-3">
              <div>
                <a 
                  href="https://github.com/srivatsacool/Workforce-Voice---Text-Analytics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm font-mono"
                >
                  <GitBranch className="w-4 h-4 text-blue-400" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
              <div>
                <a 
                  href="https://www.kaggle.com/datasets/scrapifier/glassdoor-employee-reviews-top-us-employers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                >
                  <Database className="w-4 h-4" />
                  <span>Kaggle Dataset Source (CC0)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Methodological Disclaimer Bar */}
        <div className="pt-8 border-t border-slate-900 text-slate-400 text-xs leading-relaxed flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            <strong className="text-slate-300 font-semibold">Methodological Note:</strong> Employee review data represents self-selected qualitative signals reflecting employee perceptions. They highlight areas for operational investigation and do not constitute direct or causal measurements of employee productivity, operational performance, or executive efficacy.
          </p>
          <div className="whitespace-nowrap font-mono text-slate-400 text-xs">
            v1.1.0 • Enterprise Edition
          </div>
        </div>
      </div>
    </footer>
  );
}
