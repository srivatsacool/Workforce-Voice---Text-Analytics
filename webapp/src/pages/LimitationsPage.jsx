import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Scale, 
  Clock, 
  Users, 
  BrainCircuit, 
  FileText
} from 'lucide-react';

export default function LimitationsPage() {
  const limitations = [
    {
      title: '1. Self-Selection & Participation Bias',
      icon: Users,
      badge: 'Sampling Bias',
      color: '#EF4444',
      problem: 'Employees who choose to write public reviews on Glassdoor are self-selected. They are typically motivated by acute experiences—either extreme enthusiasm (promoted, highly rewarded) or acute frustration (recently terminated, experiencing interpersonal grievance).',
      impact: 'The corpus does not represent a randomized, census-grade sample of the silent majority of employees whose experiences are moderate or neutral.',
      mitigation: 'Treat review sentiment as an organizational sensor for acute friction and cultural anchors, rather than a direct survey of median workforce satisfaction.'
    },
    {
      title: '2. Absence of Productivity & Causality Measures',
      icon: Scale,
      badge: 'Causal Governance',
      color: '#F59E0B',
      problem: 'Public review datasets do not contain objective operational performance indicators, audited financial metrics, or individualized productivity records.',
      impact: 'It is methodologically invalid to claim that employee review sentiment "causes" turnover, "proves" managerial incompetence, or "predicts" quarterly productivity.',
      mitigation: 'We use non-causal language: "workforce signals", "areas for operational investigation", and "observed themes". All findings highlight correlations requiring internal qualitative validation.'
    },
    {
      title: '3. Temporal Clustering & Cross-Sectional Snapshot',
      icon: Clock,
      badge: 'Temporal Scope',
      color: '#3B82F6',
      problem: 'Although review submission timestamps in the Kaggle dataset span from 2014 to 2026, over 96% of the scraped reviews are concentrated in recent periods (2026 collection cycle).',
      impact: 'Longitudinal time-series analysis (e.g., comparing pre-pandemic to post-pandemic sentiment) is constrained by sparse historical baselines.',
      mitigation: 'Focus the analytical architecture on cross-sectional organizational archetypes and thematic distributions rather than longitudinal forecasting.'
    },
    {
      title: '4. Sample Representativeness & Employer Headcount Disparity',
      icon: Building,
      badge: 'Entity Balance',
      color: '#8B5CF6',
      problem: 'The dataset contains approximately 100 reviews per employer regardless of whether the employer employs 20,000 workers or 2,000,000 workers (e.g. Walmart vs. specialized tech firms).',
      impact: 'A sample of 100 reviews from a multi-million-employee frontline retail enterprise captures store-level thematic variety, but cannot be treated as statistically representative of the entire corporate headcount.',
      mitigation: 'Avoid simplistic "best employer" league tables. Use company profiles to examine thematic focus areas rather than declaring winners and losers.'
    },
    {
      title: '5. Rule-Based (VADER) & Bag-of-Words (TF-IDF) Model Constraints',
      icon: BrainCircuit,
      badge: 'NLP Architecture',
      color: '#10B981',
      problem: 'VADER relies on predefined lexical rules, and TF-IDF utilizes bag-of-words / n-grams. Both struggle with nuanced rhetorical sarcasm, double entendres, and subtle corporate irony.',
      impact: 'Reviews that sarcastically praise management ("Wonderful management if you enjoy 80-hour weeks without overtime") may be scored as having positive valence.',
      mitigation: 'We evaluate sentiment across multiple lenses (pros vs. cons vs. full text) and complement lexical scoring with supervised TF-IDF classification and unsupervised topic modeling.'
    },
    {
      title: '6. Unsupervised Topic Modeling (LDA) Labeling Subjectivity',
      icon: FileText,
      badge: 'Thematic Taxonomy',
      color: '#06B6D4',
      problem: 'Latent Dirichlet Allocation discovers statistical co-occurrences of words. Assigning human-readable labels to these clusters requires qualitative interpretation by the data scientist.',
      impact: 'Different analysts might label Topic 0 as "Retail Operations" or "Compensation Dynamics". Overlapping themes can introduce taxonomy ambiguity.',
      mitigation: 'We document the exact top 12 empirical terms and word weights for every topic. All labels are directly supported by dominant empirical vocabulary.'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>METHODOLOGICAL INTEGRITY & ETHICAL AI</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
          Analytical & Methodological Limitations
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Scientific data science requires explicit transparency regarding dataset constraints, algorithmic limitations, and causal boundaries.
        </p>
      </div>

      {/* Core Governance Statement Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm font-heading">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>Governance Mandate: Employee Reviews Are Signals, Not Causal Proof</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Employee-generated text provides valuable organizational intelligence regarding perceived workplace culture and friction. However, public reviews should <strong>never</strong> be used to punish individual managers, make unsupported claims that reviews directly predict operational productivity, or assert causal drivers of organizational turnover without internal confirmatory research.
        </p>
      </div>

      {/* 6 In-Depth Limitations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {limitations.map((lim, i) => {
          const Icon = lim.icon;
          return (
            <div 
              key={i}
              className="p-5 rounded-2xl world-card space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span 
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${lim.color}15`, color: lim.color }}
                  >
                    {lim.badge}
                  </span>
                  <Icon className="w-4 h-4 text-slate-500" />
                </div>

                <h3 className="text-sm font-bold text-white font-heading">
                  {lim.title}
                </h3>

                <div className="space-y-2 text-xs leading-relaxed">
                  <div>
                    <span className="font-semibold text-slate-300">Methodological Constraint: </span>
                    <span className="text-slate-400">{lim.problem}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-300">Analytical Impact: </span>
                    <span className="text-slate-400">{lim.impact}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-300 pt-2">
                <strong className="text-blue-400">Pipeline Mitigation: </strong>
                {lim.mitigation}
              </div>
            </div>
          );
        })}
      </div>

      {/* Responsible AI Guidance for Enterprise Practitioners */}
      <div className="p-6 rounded-2xl world-card space-y-3 text-xs leading-relaxed">
        <h3 className="text-sm font-bold text-white font-heading">
          Guidelines for Enterprise People Analytics Teams
        </h3>
        <ul className="space-y-2 text-slate-400 list-disc list-inside">
          <li>
            <strong className="text-slate-200">Triangulate Signals:</strong> Always pair external public review insights with internal pulse surveys, stay interviews, and HRIS operational data.
          </li>
          <li>
            <strong className="text-slate-200">Do Not Penalize Units Based on Public Reviews:</strong> Public data lacks verification of active employment status and cannot serve as an HR audit mechanism.
          </li>
          <li>
            <strong className="text-slate-200">Focus on Systemic Patterns:</strong> Look for recurring operational friction (e.g. shift scheduling complaints in specific geographies) rather than individual complaints.
          </li>
        </ul>
      </div>

    </div>
  );
}

function Building(props) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/>
      <path d="M16 6h.01"/>
      <path d="M8 10h.01"/>
      <path d="M16 10h.01"/>
      <path d="M8 14h.01"/>
      <path d="M16 14h.01"/>
    </svg>
  );
}
