import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  BarChart3, 
  Cpu, 
  Layers, 
  MessageSquare, 
  FileText, 
  ShieldAlert, 
  Brain, 
  Clock, 
  Activity, 
  Flame, 
  ShieldCheck,
  Compass,
  Radio,
  ChevronRight
} from 'lucide-react';
import kpiData from '../data/kpis.json';
import workforceHeroVisual from '../assets/workforce_hero_visual.jpg';
import divergenceSignalMatrix from '../assets/signal_divergence_matrix.jpg';
import topicClustersVisual from '../assets/topic_clusters_visual.jpg';

export default function LandingPage({ setActiveTab }) {
  const [activeVisualTab, setActiveVisualTab] = useState('divergence');

  const pipelineSteps = [
    { code: '01', title: 'REVIEWS', desc: '8,785 unstructured Glassdoor texts', icon: MessageSquare },
    { code: '02', title: 'NLP', desc: 'Tokenization, negation retention & lemmatization', icon: FileText },
    { code: '03', title: 'SENTIMENT', desc: 'VADER intensity & pros/cons asymmetry', icon: Sparkles },
    { code: '04', title: 'CLASSIFICATION', desc: 'TF-IDF + Balanced Logistic Regression (82.4%)', icon: Brain },
    { code: '05', title: 'TOPICS', desc: 'LDA unsupervised discovery (6 latent themes)', icon: Layers },
    { code: '06', title: 'WORKFORCE SIGNALS', desc: 'Organizational friction & retention anchors', icon: BarChart3 },
  ];

  const highlights = [
    { label: 'Validated Reviews', value: kpiData.total_reviews.toLocaleString(), sub: '90 Top US Employers', metric: 'N=8,785' },
    { label: 'Average Star Rating', value: kpiData.avg_rating_overall.toFixed(2), sub: 'Median 4.0 / 5.0 Stars', metric: 'Scalar Mean' },
    { label: 'Positive Text Valence', value: `${kpiData.pct_positive_sentiment}%`, sub: 'Culture & Camaraderie Anchor', metric: 'VADER > +0.05' },
    { label: 'Negative Text Friction', value: `${kpiData.pct_negative_sentiment}%`, sub: 'Supervisory & Shift Friction', metric: 'VADER < -0.05' },
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section with Impeccable Visual World */}
      <section className="relative pt-6 md:pt-12 text-center max-w-5xl mx-auto px-4">
        {/* Ambient atmospheric glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

        {/* Live System Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-slate-900/90 dark:bg-slate-900/90 border border-slate-800 text-blue-400 mb-6 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="tracking-wide">EXECUTIVE WORKFORCE SIGNALS • 90 TOP US EMPLOYERS</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading uppercase leading-none mb-6">
          WORKFORCE <br />
          <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            INTELLIGENCE
          </span>
        </h1>

        {/* Subtitle / Core Thesis */}
        <p className="text-base sm:text-xl font-medium text-slate-700 dark:text-slate-200 max-w-3xl mx-auto mb-4 tracking-tight leading-snug">
          "Using NLP, machine learning, and topic modeling to transform employee-generated text into structured workforce signals and identify recurring organizational themes and potential friction areas."
        </p>

        {/* Operations Context Copy */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Decoupling numerical ratings from unstructured employee narratives to isolate frontline supervisory breakdowns, shift scheduling volatility, and compensation disparities across Fortune 500 enterprises.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 transition-all cursor-pointer"
          >
            <span>Explore Workforce Signals</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => { setActiveTab('methodology'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm border border-slate-800 transition-all cursor-pointer"
          >
            <span>Analytical Methodology</span>
            <Cpu className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Executive Command Center Visual Viewport */}
        <div className="relative mx-auto max-w-5xl rounded-2xl overflow-hidden border border-slate-800/90 shadow-2xl bg-slate-950 group">
          <div className="relative aspect-video w-full overflow-hidden">
            <img 
              src={workforceHeroVisual} 
              alt="Workforce Intelligence Command Center and Neural Acoustic Signal Architecture" 
              className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
            />
            {/* Soft vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
            
            {/* Viewport HUD Overlays */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-cyan-400">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>LIVE TELEMETRY LATTICE • 8,785 VECTORS</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800/90 text-left">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white font-heading tracking-wide">
                  Neural Acoustic & Qualitative Signal Architecture
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Translating unstructured employee voice into verifiable latent thematic clusters and sentiment polarity.
                </p>
              </div>
              <button
                onClick={() => { setActiveTab('sentiment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-semibold whitespace-nowrap transition-colors"
              >
                <span>Inspect Polarity</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Metric Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 text-left">
          {highlights.map((h, i) => (
            <div 
              key={i} 
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 backdrop-blur-sm shadow-sm hover:border-blue-500/40 transition-all duration-200"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-2">
                <span>{h.metric}</span>
                <Activity className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight mb-1">
                {h.value}
              </div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-300">
                {h.label}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {h.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Critical Sampling Horizon Alert */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Critical Analytical Limitation: Temporal Concentration
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-300 font-semibold">
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

      {/* Visual Intelligence Showcase: Divergent Voice & Latent Topics */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-3">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span>VISUAL SIGNAL INTELLIGENCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Decoding Employee Narratives
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
            Explore the core empirical findings: scalar rating divergence and unsupervised thematic clustering.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveVisualTab('divergence')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeVisualTab === 'divergence'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Rating–Text Divergence Prism
            </button>
            <button
              onClick={() => setActiveVisualTab('topics')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeVisualTab === 'topics'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Six Latent Topic Clusters (LDA)
            </button>
          </div>
        </div>

        {/* Visual Showcase Card */}
        {activeVisualTab === 'divergence' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 shadow-sm items-center">
            <div className="lg:col-span-7 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <img 
                src={divergenceSignalMatrix} 
                alt="Rating-Text Divergence Visual Prism: Positive Camaraderie vs Negative Friction"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <span>EMPIRICAL PHENOMENON</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                The Rating–Text Divergence (Divergent Voice)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Scalar ratings mask vital operational realities. Through statistical text scoring, we uncover that:
              </p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>38.4% of 1-Star reviews</strong> contain net-positive text, driven by deep collegial peer loyalty despite severe institutional friction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>8.2% of 5-Star reviews</strong> express acute operational complaints regarding shift fatigue and supervisory rigidity.</span>
                </li>
              </ul>
              <button
                onClick={() => { setActiveTab('sentiment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 pt-2 cursor-pointer"
              >
                <span>Inspect Divergence Explorer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 shadow-sm items-center">
            <div className="lg:col-span-7 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <img 
                src={topicClustersVisual} 
                alt="Six Latent Topic Clusters Map (Compensation, Shifts, Leadership, Culture, Career, Work-Life Balance)"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <span>UNSUPERVISED DISCOVERY (k=6)</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                6 Latent Workforce Thematic Domains
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Latent Dirichlet Allocation (LDA) partitions 8,785 employee narratives into six distinct operational vectors without human bias:
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                <div className="p-2 rounded bg-slate-800/40 border border-slate-800">1. Compensation & Benefits</div>
                <div className="p-2 rounded bg-slate-800/40 border border-slate-800">2. Shift Scheduling</div>
                <div className="p-2 rounded bg-slate-800/40 border border-slate-800">3. Frontline Supervision</div>
                <div className="p-2 rounded bg-slate-800/40 border border-slate-800">4. Team Culture Anchor</div>
                <div className="p-2 rounded bg-slate-800/40 border border-slate-800">5. Career Mobility</div>
                <div className="p-2 rounded bg-slate-800/40 border border-slate-800">6. Work-Life Balance</div>
              </div>
              <button
                onClick={() => { setActiveTab('topics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-2 cursor-pointer"
              >
                <span>Deep Dive into Topics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Analytical Pipeline Architecture */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2 font-semibold">
            Methodology Architecture
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            The Analytical Intelligence Pipeline
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
            Systematic progression from raw, unstructured commentary to multi-dimensional organizational signals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="relative p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 hover:border-blue-500/40 transition-colors flex flex-col justify-between group shadow-sm text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                      {step.code}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white tracking-wider font-heading mb-1">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-rose-600/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Isolating Organizational Friction
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Discontent rarely manifests as uniform dissatisfaction. Our pipeline isolates acute friction in first-line supervisory communication (Topic 3: 42% in 1-2⭐) and hourly scheduling volatility (Topic 2) from overarching brand reputation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Detecting Retention Anchors
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Workplace Culture & Camaraderie (Topic 1) shows the strongest positive workforce signal in this dataset (91.4% positive sentiment), suggesting an area for further organizational investigation into how peer support frequently associates with positive workforce experience.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Methodological Guardrails
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We never equate review sentiment with causal operational productivity or turnover causality. Signals highlight targeted areas for internal investigation (pulse surveys, scheduling audits, supervisory coaching).
            </p>
          </div>

        </div>
      </section>

      {/* Quick Launchpad to Dashboard */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
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
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            Launch Interactive Dashboard
          </button>
        </div>
      </section>

    </div>
  );
}
