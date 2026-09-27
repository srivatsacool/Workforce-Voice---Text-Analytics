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
      what: 'Automated discovery and ingestion of Glassdoor employee review CSV from data/raw/ without hardcoding filenames, parsing 8,785 review records across 90 top US employers with 31 raw attributes.',
      why: 'Enterprise pipelines require cross-platform portability. Ingesting raw unstructured data with full schema auditing ensures reproducibility from clean environments.',
      output: 'Validated raw pandas DataFrame (8,785 rows × 31 columns) covering Fortune 500 retail, tech, finance, and healthcare employers.',
      limitation: 'Ingests public scraped records from Kaggle dataset; does not access real-time Glassdoor APIs or internal private HR systems.'
    },
    {
      id: 'step2',
      code: '02',
      name: 'Quality Audit & EDA',
      icon: FileCheck,
      what: 'Deduplicating reviewIds, parsing timestamps, validating 1-5 star bounds, computing review verbosity, and identifying that 96.9% of reviews date from the 2026 collection cycle.',
      why: 'Rigorous data auditing identifies structural skews early, preventing erroneous longitudinal claims and ensuring data integrity before downstream modeling.',
      output: 'data/processed/glassdoor_cleaned.csv (8,785 clean rows with engineered text length, rating validation, and temporal metadata).',
      limitation: '96.9% temporal concentration in 2026 limits longitudinal forecasting, requiring the corpus to be analyzed as a contemporary cross-sectional snapshot.'
    },
    {
      id: 'step3',
      code: '03',
      name: 'Text Preprocessing',
      icon: Code2,
      what: 'Regex-based URL and punctuation cleaning, lowercasing, WordNet lemmatization, retention of negation tokens (not, no, never, barely), and strategic removal of uninformative corporate review filler (work, job, company).',
      why: 'Standard aggressive stopword lists strip negation words, destroying sentiment polarity. Furthermore, generic words like "work" appear in 90% of reviews and obscure topic clustering.',
      output: 'Cleaned, lemmatized token streams preserving semantic valence in data/processed/glassdoor_tokenized.csv ready for vectorization.',
      limitation: 'Lemmatization occasionally conflates subtle corporate nuances (e.g. "resigned" as verb vs. adjective) and does not parse specialized workplace jargon.'
    },
    {
      id: 'step4',
      code: '04',
      name: 'VADER Sentiment Intensity',
      icon: Sparkles,
      what: 'Calculating positive, neutral, negative, and compound (-1.0 to +1.0) scores across full review text, pros text, and cons text using VADER.',
      why: 'VADER is rule-calibrated for social and review text, recognizing capitalization, punctuation intensity, and contrastive conjunctions ("good pay but terrible management").',
      output: 'Empirical sentiment distributions: 78.2% Positive, 2.6% Neutral, 19.2% Negative; Pros compound (+0.65) vs Cons compound (-0.26).',
      limitation: 'Rule-based lexicon cannot reliably detect subtle corporate sarcasm, double entendres, or passive-aggressive phrasing.'
    },
    {
      id: 'step5',
      code: '05',
      name: 'TF-IDF Feature Extraction',
      icon: Layers,
      what: 'Constructing a 4,000-feature unigram and bigram TF-IDF matrix with sublinear term-frequency scaling and min_df thresholds, fit strictly on training splits.',
      why: 'TF-IDF balances term frequency against corpus uniqueness, penalizing ubiquitous words while amplifying informative phrases like "lack communication" or "supportive team". Strict train-set fitting prevents data leakage.',
      output: 'Sparse matrix representations for 5,168 training reviews and 1,293 test reviews with serialized vectorizer in models/.',
      limitation: 'Bag-of-words and n-gram representations discard long-range syntactic sentence structure and word order context.'
    },
    {
      id: 'step6',
      code: '06',
      name: 'Balanced Logistic Regression',
      icon: Brain,
      what: 'Supervised classification predicting high satisfaction (4-5 stars) vs. low satisfaction (1-2 stars) using Logistic Regression with balanced class weighting.',
      why: 'Employee reviews exhibit a 3:1 positive-to-negative class imbalance. Without balanced class weighting, recall on negative reviews drops to ~38%. With balanced weighting, recall reaches 79.8% while preserving 82.4% overall accuracy.',
      output: 'Trained model (82.4% validation accuracy, 79.8% negative recall, 0.777 macro F1) and extracted top positive/negative lexical coefficients.',
      limitation: 'Excludes 1,175 borderline 3-star reviews from binary evaluation to establish clear separation between high and low workforce satisfaction.'
    },
    {
      id: 'step7',
      code: '07',
      name: 'LDA Topic Discovery (k=6)',
      icon: Layers,
      what: 'Unsupervised generative probabilistic topic modeling on a 2,500-feature CountVectorizer document-term matrix with k=6 latent organizational themes.',
      why: 'Rather than forcing employee feedback into subjective HR categories, LDA surfaces the natural thematic clusters that employees actually articulate: Compensation, Culture, Balance, Management, Growth, and Operational Pace.',
      output: '6 discovered themes, word-weight distributions, per-review topic assignments, and serialized LDA model in models/lda_topic_model.joblib.',
      limitation: 'LDA discovers statistical co-occurrences of terms; thematic taxonomy labeling requires qualitative human interpretation. Reviews can span multiple overlapping themes.'
    },
    {
      id: 'step8',
      code: '08',
      name: 'Workforce Signal Matrix',
      icon: BarChart3,
      what: 'Synthesizing sentiment, star ratings, topics, and company context into the unified Workforce Signal Matrix. Decoupling ratings from text to identify Divergent Voice.',
      why: 'Ratings alone obscure actionable nuance. Transforming unstructured employee voice into multi-dimensional signals equips talent leadership with targeted areas for operational attention without making unsupported causal claims.',
      output: 'Unified analytical dataset data/processed/glassdoor_workforce_signals.csv and Divergent Voice cross-tabulations (38.4% of 1-star reviews with positive text; 8.2% of 5-star with negative text).',
      limitation: 'Sample sizes (~100 reviews per employer) provide cross-sectional thematic fingerprints rather than total enterprise headcount census.'
    },
    {
      id: 'step9',
      code: '09',
      name: 'Executive Interpretation',
      icon: ShieldCheck,
      what: 'Synthesizing analytical findings into strategic workforce recommendations governed strictly under the 4-part framework: Observation → Interpretation → Implication → Caution.',
      why: 'Ensures that workforce insights provide actionable operational clarity while strictly preventing unsupported causal claims regarding turnover, productivity, or managerial guilt.',
      output: 'Production React 19 web application, priority action matrix, and executive intelligence dashboards.',
      limitation: 'Findings highlight areas for operational investigation and organizational attention; they do not prove causality, measure throughput, or replace internal surveys.'
    }
  ];

  return (
    <div className="space-y-8 sm:space-y-10 pb-16">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
          <Cpu className="w-4 h-4 text-blue-400" />
          <span>METHODOLOGICAL RIGOR & GOVERNANCE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
          The 9-Stage Analytics Pipeline
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-4xl leading-relaxed">
          Complete methodological transparency: How raw employee reviews are cleaned, normalized, classified, modeled, synthesized into workforce signals, and governed under non-causal interpretation standards.
        </p>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="p-6 sm:p-8 rounded-3xl world-card space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
              Pipeline Stages Overview (9 Stages)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select any stage below to inspect its operational requirements, methodological rationale, and output artifacts.
            </p>
          </div>
          <span className="text-xs font-mono text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 w-fit">
            STAGE {steps[activeStep].code} ACTIVE
          </span>
        </div>

        {/* Spacious 3x3 Stage Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((st, i) => {
            const Icon = st.icon;
            const isCurrent = activeStep === i;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStep(i)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isCurrent
                    ? 'bg-blue-600/90 border-blue-400 text-white shadow-xl shadow-blue-600/20 ring-1 ring-blue-400/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900/90 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${isCurrent ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}>
                    STAGE {st.code}
                  </span>
                  <div className={`p-2 rounded-lg ${isCurrent ? 'bg-white/10 text-white' : 'bg-slate-900/80 text-blue-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className={`text-base font-bold leading-snug font-heading ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                    {st.name}
                  </h3>
                  <p className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${isCurrent ? 'text-blue-100' : 'text-slate-400'}`}>
                    {st.what}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep-Dive Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-mono font-bold text-lg shrink-0">
                {steps[activeStep].code}
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  Stage {steps[activeStep].code}: {steps[activeStep].name}
                </h3>
                <span className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5 block">Engineering & Methodological Rationale</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 hover:text-white cursor-pointer font-medium transition-colors"
              >
                Previous Stage
              </button>
              <button
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs sm:text-sm text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-medium shadow-md shadow-blue-600/30 transition-colors"
              >
                Next Stage
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 leading-relaxed">
            
            {/* WHAT */}
            <div className="p-6 rounded-2xl world-card space-y-3 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase font-bold text-blue-400 flex items-center gap-2 mb-2 tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>1. WHAT ARE WE DOING?</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {steps[activeStep].what}
                </p>
              </div>
            </div>

            {/* WHY */}
            <div className="p-6 rounded-2xl world-card space-y-3 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase font-bold text-indigo-400 flex items-center gap-2 mb-2 tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span>2. WHY ARE WE DOING IT?</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {steps[activeStep].why}
                </p>
              </div>
            </div>

            {/* OUTPUT */}
            <div className="p-6 rounded-2xl world-card space-y-3 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase font-bold text-emerald-400 flex items-center gap-2 mb-2 tracking-wider">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span>3. TECHNICAL OUTPUT</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {steps[activeStep].output}
                </p>
              </div>
            </div>

            {/* LIMITATION */}
            <div className="p-6 rounded-2xl world-card space-y-3 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase font-bold text-amber-400 flex items-center gap-2 mb-2 tracking-wider">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>4. STAGE LIMITATION</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {steps[activeStep].limitation}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
