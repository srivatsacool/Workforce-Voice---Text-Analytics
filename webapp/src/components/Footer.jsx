import React from 'react';
import { ShieldCheck, Database, GitBranch, ExternalLink } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/70 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="font-bold text-slate-200 tracking-tight text-sm font-heading">
              WORKFORCE INTELLIGENCE
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Turning employee-generated text into actionable workforce and organizational insights using NLP, machine learning, and topic modeling.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                Empirical Research
              </span>
            </div>
          </div>

          {/* Analytical Navigation */}
          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Analytical Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors"
                >
                  Intelligence Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('sentiment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors"
                >
                  Sentiment & Divergence
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('topics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors"
                >
                  LDA Topic Landscape
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('companies'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors"
                >
                  Company Signals Explorer
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Methodology */}
          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Governance & Methodology
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => { setActiveTab('methodology'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors"
                >
                  8-Stage NLP Pipeline
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('insights'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors"
                >
                  Executive Findings
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('limitations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors text-amber-400/90 hover:text-amber-300"
                >
                  Methodological Limitations
                </button>
              </li>
            </ul>
          </div>

          {/* Dataset & Provenance */}
          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Data Provenance
            </h4>
            <p className="text-slate-400 text-xs mb-3">
              Based on the Kaggle Glassdoor dataset of 90 Top US Employers (8,785 validated employee reviews).
            </p>
            <a 
              href="https://www.kaggle.com/datasets/scrapifier/glassdoor-employee-reviews-top-us-employers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors text-xs font-medium"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Kaggle Dataset Source (CC0)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Methodological Disclaimer Bar */}
        <div className="pt-6 border-t border-slate-900 text-slate-500 text-[11px] leading-relaxed flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            <strong className="text-slate-400">Methodological Note:</strong> Employee review data represents self-selected qualitative signals reflecting employee perceptions. They do not constitute direct or causal measurements of employee productivity, operational performance, or executive efficacy.
          </p>
          <div className="whitespace-nowrap font-mono text-slate-500 text-[10px]">
            v1.0.0 • Cloudflare Pages Ready
          </div>
        </div>
      </div>
    </footer>
  );
}
