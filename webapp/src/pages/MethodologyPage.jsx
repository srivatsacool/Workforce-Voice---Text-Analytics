import React, { useState } from 'react';
import { 
  Cpu, 
  Database, 
  FileCheck, 
  Sparkles, 
  Layers, 
  Brain, 
  BarChart3, 
  Code2, 
  ShieldCheck, 
  ArrowDown, 
  CheckCircle2 
} from 'lucide-react';

export default function MethodologyPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'step1',
      code: '01',
      name: 'Dynamic Data Ingestion',
      icon: Database,
      what: 'Dynamic discovery of Glassdoor employee review CSV from data/raw/ without hardcoding fragile filenames. Parsing 8,785 review records across 90 top US employers with 31 raw attributes.',
      why: 'Enterprise pipelines require cross-platform portability. Ingesting raw unstructured data with full schema auditing ensures reproducibility from clean environments.',
      output: 'Validated raw pandas DataFrame (8,785 rows × 31 columns) covering Fortune 500 retail, tech, finance, and healthcare.'
    },
    {
      id: 'step2',
      code: '02',
      name: 'Data Cleaning & Normalization',
      icon: FileCheck,
      what: 'Deduplicating reviewIds, parsing ISO8601 timestamps, validating 1-5 star bounds, concatenating summary, pros, and cons into unified review_text, and computing verbosity metrics (word count and length categories).',
      why: 'Raw review data contains mixed timestamp formats and missing text. Structuring review length is essential because disgruntled employees write significantly longer reviews (median 38 words) than satisfied employees (median 20 words).',
      output: 'data/processed/glassdoor_cleaned.csv (8,785 clean rows with engineered text length and temporal features).'
    },
    {
      id: 'step3',
      code: '03',
      name: 'Reproducible NLP Preprocessing',
      icon: Code2,
      what: 'Regex-based URL and punctuation cleaning, lowercasing, WordNet lemmatization, retention of negation tokens (not, no, never, barely), and strategic removal of uninformative corporate review filler (work, job, company, people).',
      why: 'Standard aggressive stopword lists strip negation words, destroying sentiment polarity. Furthermore, generic words like "work" appear in 90% of reviews and obscure topic clustering.',
      output: 'Cleaned, lemmatized token streams preserving semantic valence and ready for vectorization.'
    },
    {
      id: 'step4',
      code: '04',
      name: 'VADER Lexical Sentiment Intensity',
      icon: Sparkles,
      what: 'Calculating positive, neutral, negative, and compound (-1.0 to +1.0) scores across full review text, pros text, and cons text using VADER (Valence Aware Dictionary and sEntiment Reasoner).',
      why: 'VADER is rule-calibrated for social and review text, recognizing capitalization, punctuation intensity, and contrastive conjunctions ("good pay but terrible management").',
      output: 'Empirical sentiment distributions: 78.2% Positive, 2.6% Neutral, 19.2% Negative; Pros compound (+0.65) vs Cons compound (-0.26).'
    },
    {
      id: 'step5',
      code: '05',
      name: 'TF-IDF Feature Extraction',
      icon: Layers,
      what: 'Constructing a 4,000-feature unigram and bigram TF-IDF matrix with sublinear term-frequency scaling and min_df thresholds, fit strictly on training data.',
      why: 'TF-IDF balances term frequency against corpus uniqueness, penalizing ubiquitous words while amplifying informative phrases like "lack communication" or "supportive team". Strict train-set fitting prevents data leakage.',
      output: 'Sparse matrix representations for 5,168 training reviews and 1,293 test reviews with serialized vectorizer in models/.'
    },
    {
      id: 'step6',
      code: '06',
      name: 'Balanced Logistic Regression Classification',
      icon: Brain,
      what: 'Supervised classification predicting high satisfaction (4-5 stars) vs. low satisfaction (1-2 stars) using Logistic Regression with balanced class weighting.',
      why: 'Employee reviews exhibit a 3:1 positive-to-negative class imbalance. Without balanced class weighting, recall on negative reviews drops to 38%. With balanced weighting, recall jumps to 80% while preserving 82.4% overall accuracy.',
      output: 'Trained model (82.4% test accuracy, 0.777 macro F1) and extracted top positive/negative lexical coefficients.'
    },
    {
      id: 'step7',
      code: '07',
      name: 'Latent Dirichlet Allocation (LDA) Topic Discovery',
      icon: Layers,
      what: 'Unsupervised generative probabilistic topic modeling on a 2,500-feature CountVectorizer document-term matrix with k=6 latent organizational themes.',
      why: 'Rather than forcing employee feedback into subjective HR categories, LDA surfaces the natural thematic clusters that employees actually articulate: Compensation, Culture, Balance, Management, Growth, and Operational Pace.',
      output: '6 discovered themes, word-weight distributions, per-review topic assignments, and serialized LDA model.'
    },
    {
      id: 'step8',
      code: '08',
      name: 'Workforce Intelligence Synthesis',
      icon: BarChart3,
      what: 'Fusing sentiment, star ratings, topics, and company context into the Workforce Signal Matrix. Decoupling ratings from text to identify hidden friction and cultural anchors under strict governance.',
      why: 'Ratings alone obscure actionable nuance. Transforming unstructured employee voice into multi-dimensional signals equips talent leadership with targeted areas for operational attention without making unsupported causal claims.',
      output: 'Re-usable analytical matrices, KPI JSON exports, and decision-ready executive intelligence.'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
          <Cpu className="w-3.5 h-3.5" />
          <span>METHODOLOGICAL RIGOR & GOVERNANCE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
          The 8-Stage Analytics Pipeline
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Complete methodological transparency: How raw employee reviews are cleaned, normalized, classified, modeled, and transformed into actionable workforce signals.
        </p>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
        
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white font-heading">
            Pipeline Stages Overview
          </h2>
          <span className="text-xs font-mono text-slate-400">Click any stage to view technical specifications</span>
        </div>

        {/* Stepper Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {steps.map((st, i) => {
            const Icon = st.icon;
            const isCurrent = activeStep === i;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStep(i)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isCurrent ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-400'}`}>
                    {st.code}
                  </span>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold leading-tight">
                  {st.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep-Dive Card */}
        <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-mono font-bold text-sm">
                {steps[activeStep].code}
              </span>
              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Stage {steps[activeStep].code}: {steps[activeStep].name}
                </h3>
                <span className="text-xs text-slate-400">Engineering & Methodological Rationale</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 cursor-pointer"
              >
                Previous
              </button>
              <button
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                className="px-2.5 py-1 rounded bg-blue-600 text-xs text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-500 cursor-pointer font-medium"
              >
                Next
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
            
            {/* WHAT */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-[11px] font-mono uppercase font-bold text-blue-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>WHAT ARE WE DOING?</span>
              </div>
              <p className="text-slate-300">
                {steps[activeStep].what}
              </p>
            </div>

            {/* WHY */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-[11px] font-mono uppercase font-bold text-indigo-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>WHY ARE WE DOING IT?</span>
              </div>
              <p className="text-slate-300">
                {steps[activeStep].why}
              </p>
            </div>

            {/* OUTPUT */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-[11px] font-mono uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>TECHNICAL OUTPUT</span>
              </div>
              <p className="text-slate-300">
                {steps[activeStep].output}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
