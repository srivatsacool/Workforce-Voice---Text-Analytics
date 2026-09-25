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
  Building
} from 'lucide-react';
import kpiData from '../data/kpis.json';

export default function LandingPage({ setActiveTab }) {
  const pipelineSteps = [
    { code: '01', title: 'REVIEWS', desc: '8,785 unstructured Glassdoor texts', icon: MessageSquare },
    { code: '02', title: 'NLP', desc: 'Tokenization, negation retention & lemmatization', icon: FileText },
    { code: '03', title: 'SENTIMENT', desc: 'VADER intensity & pros/cons asymmetry', icon: Sparkles },
    { code: '04', title: 'CLASSIFICATION', desc: 'TF-IDF + Balanced Logistic Regression (82.4%)', icon: Brain },
    { code: '05', title: 'TOPICS', desc: 'LDA unsupervised discovery (6 latent themes)', icon: Layers },
    { code: '06', title: 'WORKFORCE INTELLIGENCE', desc: 'Signal matrices & executive decisions', icon: BarChart3 },
  ];

  const highlights = [
    { label: 'Validated Reviews', value: kpiData.total_reviews.toLocaleString(), sub: '90 Top US Employers' },
    { label: 'Average Star Rating', value: kpiData.avg_rating_overall.toFixed(2), sub: 'Median 4.0 / 5.0 Stars' },
    { label: 'Positive Text Valence', value: `${kpiData.pct_positive_sentiment}%`, sub: '19.2% Negative Friction' },
    { label: 'ML Prediction Accuracy', value: `${(kpiData.ml_model_performance.accuracy * 100).toFixed(1)}%`, sub: 'Macro F1: 77.7%' },
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 text-center max-w-5xl mx-auto px-4">
        {/* Glow ambient background effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-900 border border-slate-800 text-blue-400 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>PORTFOLIO RESEARCH PROJECT • 90 TOP US EMPLOYERS</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-heading uppercase leading-none mb-6">
          WORKFORCE <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
            INTELLIGENCE
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl font-medium text-slate-200 max-w-3xl mx-auto mb-4 tracking-tight">
          "Turning employee-generated data into organizational signals."
        </p>

        {/* Supporting Copy */}
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          An NLP and analytics pipeline combining sentiment analysis, machine learning, topic modeling, and interactive visualization to understand workforce experience at scale.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all cursor-pointer"
          >
            <span>Explore Intelligence</span>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-left">
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

      {/* Analytical Pipeline Architecture */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2 font-semibold">
            Methodology Architecture
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            The Analytical Intelligence Pipeline
          </h3>
          <p className="text-slate-400 text-sm mt-2">
            How unstructured employee reviews are systematically transformed into multi-dimensional organizational signals.
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

      {/* Positioning / Value Pillars */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/90 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white font-heading">
              Beyond Vanity Ratings
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Star ratings compress complex employee experiences into a single number. Our pipeline decouples numerical ratings from textual sentiment to expose the "divergent voice"—critical friction embedded in 4-star companies and hidden cultural anchors in 1-star environments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/90 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white font-heading">
              Unsupervised Thematic Discovery
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rather than forcing reviews into arbitrary predefined HR categories, Latent Dirichlet Allocation (LDA) surfaces the 6 empirical themes that employees naturally write about: Compensation, Culture, Scheduling, Management, Career, and Operational Stress.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/90 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white font-heading">
              Methodological Rigor
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We explicitly reject unsupported causal claims. Employee reviews reflect voluntary, self-selected perceptions, not direct productivity or operational performance. All findings are structured as: Observation → Interpretation → Implication → Limitation.
            </p>
          </div>

        </div>
      </section>

      {/* Quick Launchpad to Analytical Views */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-xl font-bold text-white font-heading">
              Ready to explore organizational workforce signals?
            </h3>
            <p className="text-xs text-slate-400">
              Access the interactive dashboard with live filtering across 90 employers, 6 thematic dimensions, and 8,785 review texts.
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
