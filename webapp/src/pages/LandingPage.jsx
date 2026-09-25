import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  BarChart3, 
  Database, 
  Cpu, 
  Layers, 
  MessageSquare, 
  CheckCircle2, 
  FileText,
  ShieldAlert,
  TrendingUp,
  Brain,
  AlertTriangle,
  Clock,
  Activity,
  Flame,
  ShieldCheck
} from 'lucide-react';
import kpiData from '../data/kpis.json';

export default function LandingPage({ setActiveTab }) {
  const pipelineSteps = [
    { code: '01', title: 'REVIEWS', desc: '8,785 unstructured Glassdoor texts', icon: MessageSquare },
    { code: '02', title: 'NLP', desc: 'Tokenization, negation retention & lemmatization', icon: FileText },
    { code: '03', title: 'SENTIMENT', desc: 'VADER intensity & pros/cons asymmetry', icon: Sparkles },
    { code: '04', title: 'CLASSIFICATION', desc: 'TF-IDF + Balanced Logistic Regression (82.4%)', icon: Brain },
    { code: '05', title: 'TOPICS', desc: 'LDA unsupervised discovery (6 latent themes)', icon: Layers },
    { code: '06', title: 'WORKFORCE SIGNALS', desc: 'Organizational friction & retention anchors', icon: BarChart3 },
  ];

  const highlights = [
    { label: 'Validated Reviews', value: kpiData.total_reviews.toLocaleString(), sub: '90 Top US Employers' },
    { label: 'Average Star Rating', value: kpiData.avg_rating_overall.toFixed(2), sub: 'Median 4.0 / 5.0 Stars' },
    { label: 'Positive Text Valence', value: `${kpiData.pct_positive_sentiment}%`, sub: 'Culture & Camaraderie Anchor' },
    { label: 'Negative Text Friction', value: `${kpiData.pct_negative_sentiment}%`, sub: 'Supervisory & Schedule Friction' },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-10 md:pt-16 text-center max-w-5xl mx-auto px-4">
        {/* Glow ambient background effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Framing Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-900 border border-slate-800 text-blue-400 mb-6 shadow-sm">
          <Activity className="w-3.5 h-3.5 text-blue-400" />
          <span>OPERATIONS & WORKFORCE ANALYTICS • 90 TOP US EMPLOYERS</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-heading uppercase leading-none mb-6">
          WORKFORCE <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
            INTELLIGENCE
          </span>
        </h1>

        {/* Subtitle / Core Thesis */}
        <p className="text-base sm:text-xl font-medium text-slate-200 max-w-3xl mx-auto mb-4 tracking-tight leading-snug">
          "Using NLP, machine learning, and topic modeling to transform employee-generated text into structured workforce signals and identify recurring organizational themes and potential friction areas."
        </p>

        {/* Operations Context Copy */}
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Decoupling numerical ratings from unstructured employee commentary to isolate frontline supervisory breakdowns, shift scheduling friction, and compensation disparities across Fortune 500 organizations.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all cursor-pointer"
          >
            <span>Explore Workforce Signals</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => { setActiveTab('methodology'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm border border-slate-800 transition-all cursor-pointer"
          >
            <span>View Methodology</span>
            <Cpu className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Metric Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 text-left">
          {highlights.map((h, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-1">
                {h.value}
              </div>
              <div className="text-xs font-semibold text-slate-300">
                {h.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {h.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMINENT TEMPORAL HORIZON & SAMPLING LIMITATION BANNER */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Critical Analytical Limitation: Temporal Concentration
                </span>
                <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-amber-500/15 text-amber-300 font-semibold">
                  96.9% in 2026
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                While review timestamps span 2014–2026, <strong>8,509 of 8,785 reviews (96.9%)</strong> are concentrated in the recent 2026 collection cycle. This dataset represents a <strong>high-resolution contemporary cross-sectional snapshot</strong> of post-pandemic workplace friction, not a decade-long historical trend. Findings reflect self-selected employee signals rather than direct measures of operational productivity.
              </p>
            </div>
          </div>

          <button
            onClick={() => { setActiveTab('limitations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-3.5 py-1.5 rounded-lg bg-slate-950 border border-amber-500/30 hover:border-amber-400 text-amber-300 hover:text-amber-200 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0"
          >
            Review Governance Rules
          </button>
        </div>
      </section>

      {/* Analytical Pipeline Architecture */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2 font-semibold">
            Methodology Architecture
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            The Analytical Intelligence Pipeline
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Systematic progression from raw, unstructured commentary to multi-dimensional organizational signals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="relative p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-blue-500/40 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                      {step.code}
                    </span>
                    <Icon className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h4 className="text-xs font-bold text-white tracking-wider font-heading mb-1">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Positioning / Operations Value Pillars */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/90 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-rose-600/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-heading">
              Isolating Organizational Friction
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Discontent rarely manifests as uniform dissatisfaction. Our pipeline isolates acute friction in first-line supervisory communication (Topic 3: 42% in 1-2⭐) and hourly scheduling volatility (Topic 2) from overarching brand reputation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/90 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-heading">
              Detecting Retention Anchors
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Workplace Culture & Camaraderie (Topic 1) shows the strongest positive workforce signal in this dataset (91.4% positive sentiment), suggesting an area for further organizational investigation into how peer support frequently associates with positive workforce experience.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/90 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-heading">
              Methodological Guardrails
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never equate review sentiment with causal operational productivity or turnover causality. Signals highlight targeted areas for internal investigation (pulse surveys, scheduling audits, supervisory coaching).
            </p>
          </div>

        </div>
      </section>

      {/* Quick Launchpad to Dashboard */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-xl font-bold text-white font-heading">
              Explore the Organizational Friction Matrix
            </h3>
            <p className="text-xs text-slate-400">
              Cross-tabulate sentiment, ratings, and LDA topic distributions across 90 US employers with interactive multi-dimensional filters.
            </p>
          </div>

          <button
            onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            Launch Interactive Dashboard
          </button>
        </div>
      </section>

    </div>
  );
}
