import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { 
  HeartHandshake, 
  HelpCircle, 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  Sliders,
  Scale
} from 'lucide-react';

import kpiData from '../data/kpis.json';
import companiesData from '../data/companies.json';
import ratingSentimentData from '../data/rating_sentiment.json';

export default function SentimentExplorerPage() {
  const [selectedQuadrant, setSelectedQuadrant] = useState('ALL');

  // Top positive and negative coefficients from ML model
  const topPos = kpiData.top_positive_indicators || [];
  const topNeg = kpiData.top_negative_indicators || [];

  // Quadrant data for interactive explorer
  const quadrants = [
    {
      id: 'aligned_pos',
      title: 'Aligned Positive',
      badge: 'Concordance',
      color: '#10B981',
      ratingText: '4 - 5 Stars',
      sentimentText: 'Positive Text (Compound ≥ +0.05)',
      sharePct: '51.4%',
      desc: 'Employees praise workplace culture, collegial teams, and benefits while awarding high numerical ratings. Represents genuine talent advocacy.',
      implication: 'Identify the structural pillars upholding these experiences to replicate in other business units.'
    },
    {
      id: 'aligned_neg',
      title: 'Aligned Negative',
      badge: 'Friction Hotspot',
      color: '#EF4444',
      ratingText: '1 - 2 Stars',
      sentimentText: 'Negative Text (Compound ≤ -0.05)',
      sharePct: '10.8%',
      desc: 'Severe numerical ratings accompanied by sharply critical commentary detailing supervisory friction, scheduling pressure, or operational strain.',
      implication: 'Suggested area for organizational investigation: frontline supervisory audits, skip-level check-ins, and shift scheduling review.'
    },
    {
      id: 'divergent_high_neg',
      title: 'Critical Voice in High Rating',
      badge: 'Constructive Friction',
      color: '#F59E0B',
      ratingText: '4 - 5 Stars',
      sentimentText: 'Negative Text (Compound ≤ -0.05)',
      sharePct: '8.2% of 5-star reviews',
      desc: 'Employees award high overall ratings out of institutional loyalty or strong compensation, but articulate acute operational friction in the text.',
      implication: 'High-risk blindspot for leadership: high star ratings conceal brewing operational burnout.'
    },
    {
      id: 'divergent_low_pos',
      title: 'Polite Voice in Low Rating',
      badge: 'Muffled Dissent',
      color: '#6366F1',
      ratingText: '1 - 2 Stars',
      sentimentText: 'Positive Text (Compound ≥ +0.05)',
      sharePct: '38.4% of 1-star reviews',
      desc: 'Dissatisfied employees who nevertheless soften their critique with polite language ("Good snacks, great peers, but severe pay disparity").',
      implication: 'Demonstrates that low ratings are not purely irrational venting; employees frequently distinguish collegial peers from organizational governance.'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>VADER & ML LEXICAL POLARITY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
          Workforce Sentiment & Rating Divergence
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Investigating the relationship between how employees numerically rate their company and how they express their experience in unstructured text.
        </p>
      </div>

      {/* Metric Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Pros Sentiment Average</div>
          <div className="text-2xl font-bold text-emerald-400 font-heading mt-1">+0.65</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Predominantly enthusiastic praise</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Cons Sentiment Average</div>
          <div className="text-2xl font-bold text-rose-400 font-heading mt-1">-0.26</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Constructive & critical grievances</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Full Review Net Compound</div>
          <div className="text-2xl font-bold text-blue-400 font-heading mt-1">+0.48</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Median: +0.62 (Moderate positive lean)</div>
        </div>
      </div>

      {/* Rating vs Sentiment Stacked Distribution */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-white font-heading">
              Sentiment Distribution Across Numerical Star Ratings
            </h2>
            <p className="text-xs text-slate-400">
              Examining empirical text sentiment across 1 to 5 star reviews reveals significant rating-text divergence.
            </p>
          </div>
          <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 self-start sm:self-auto">
            Divergent Voice Evidence
          </span>
        </div>

        <div className="h-60 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ratingSentimentData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" unit="%" stroke="#64748b" fontSize={11} domain={[0, 100]} />
              <YAxis 
                type="category" 
                dataKey="ratingOverall" 
                stroke="#cbd5e1" 
                fontSize={12}
                tickFormatter={(val) => `${val} Star`}
              />
              <Tooltip
                formatter={(val, name) => [`${typeof val === 'number' ? val.toFixed(1) : val}%`, name]}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="Positive" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} name="Positive Text" />
              <Bar dataKey="Neutral" stackId="a" fill="#64748B" radius={[0, 0, 0, 0]} name="Neutral Text" />
              <Bar dataKey="Negative" stackId="a" fill="#EF4444" radius={[0, 4, 4, 0]} name="Negative Text" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
            <span className="text-amber-400 font-semibold font-mono">38.4% of 1-Star Reviews </span>
            <span className="text-slate-300">
              contain net-positive text, as employees soften harsh ratings with praise for teammates ("Great coworkers, but severe scheduling friction").
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
            <span className="text-amber-400 font-semibold font-mono">8.2% of 5-Star Reviews </span>
            <span className="text-slate-300">
              contain net-negative text, where operational pain points and burnout are concealed behind institutional loyalty or strong compensation.
            </span>
          </div>
        </div>
      </div>

      {/* The 4 Quadrants: Alignment vs Divergence */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white font-heading">
              The Alignment & Divergence Framework
            </h2>
            <p className="text-xs text-slate-400">
              Comparing text sentiment against numerical star ratings reveals four distinct workforce voices.
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Excludes 3-star borderline</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quadrants.map((quad) => (
            <div
              key={quad.id}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span 
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                  style={{ backgroundColor: `${quad.color}15`, color: quad.color }}
                >
                  {quad.badge}
                </span>
                <span className="text-sm font-bold text-white font-heading">{quad.sharePct}</span>
              </div>

              <h3 className="text-base font-bold text-white font-heading">
                {quad.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                  Rating: {quad.ratingText}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                  Text: {quad.sentimentText}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {quad.desc}
              </p>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400">
                <strong className="text-slate-300 font-semibold">Leadership Action: </strong>
                {quad.implication}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ML Lexical Drivers: TF-IDF Coefficients & Model Performance */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-white font-heading">
                Machine Learning Classification & Feature Importance
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Supervised sentiment classification predicting high satisfaction (4–5 stars) vs. low satisfaction (1–2 stars).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                82.4% Validation Accuracy
              </span>
              <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                79.8% Negative Recall
              </span>
            </div>
          </div>
        </div>

        {/* Model Performance & Class Imbalance Callout */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Scale className="w-4 h-4 text-blue-400" />
            <span>Class Imbalance Mitigation: Why 79.8% Negative Recall Matters</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The classifier achieved <strong>82.4% validation accuracy with 79.8% recall for the negative class</strong> (macro F1 of 0.777 across 1,293 validation samples). In employee review corpora, positive reviews outnumber negative reviews approximately <strong>3:1</strong>. A naive standard classifier achieves apparent high accuracy by defaulting to positive predictions, causing negative review recall to collapse to ~38%. By applying balanced inverse class weighting, our model accurately captures 79.8% of acute friction signals while maintaining robust overall accuracy.
          </p>
        </div>

        {/* Lexical Drivers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1">
          
          {/* Negative Terms */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4" />
              <span>Strongest Negative Sentiment Predictors</span>
            </div>
            <div className="space-y-1.5">
              {topNeg.slice(0, 8).map((term, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs font-mono">
                  <span className="text-slate-200 font-sans font-medium">"{term.term}"</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-slate-900 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-rose-500 h-full rounded-full" 
                        style={{ width: `${Math.min(Math.abs(term.coefficient) * 18, 100)}%` }}
                      />
                    </div>
                    <span className="text-rose-400 font-bold w-12 text-right">
                      {term.coefficient.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Positive Terms */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>Strongest Positive Sentiment Predictors</span>
            </div>
            <div className="space-y-1.5">
              {topPos.slice(0, 8).map((term, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs font-mono">
                  <span className="text-slate-200 font-sans font-medium">"{term.term}"</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-slate-900 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full" 
                        style={{ width: `${Math.min(term.coefficient * 25, 100)}%` }}
                      />
                    </div>
                    <span className="text-emerald-400 font-bold w-12 text-right">
                      +{term.coefficient.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-200">Analytical Takeaway: </strong>
          Negative sentiment is overwhelmingly driven by supervisory and operational breakdown terms (<code className="text-rose-400">poor</code>, <code className="text-rose-400">terrible</code>, <code className="text-rose-400">toxic</code>, <code className="text-rose-400">management</code>, <code className="text-rose-400">lack</code>). Positive sentiment centers on interpersonal support and growth opportunities (<code className="text-emerald-400">supportive</code>, <code className="text-emerald-400">opportunity</code>, <code className="text-emerald-400">atmosphere</code>).
        </div>
      </div>

    </div>
  );
}
