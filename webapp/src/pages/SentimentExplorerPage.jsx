import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { 
  HeartHandshake, 
  TrendingUp, 
  TrendingDown, 
  Scale
} from 'lucide-react';

import kpiData from '../data/kpis.json';
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
    <div className="space-y-12 pb-20">
      
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
          <HeartHandshake className="w-4 h-4" />
          <span>VADER & ML LEXICAL POLARITY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
          Workforce Sentiment & Rating Divergence
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-4xl leading-relaxed">
          Investigating the relationship between how employees numerically rate their company and how they express their experience in unstructured text.
        </p>
      </div>

      {/* Metric Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl world-card flex flex-col justify-between">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">Pros Sentiment Average</div>
          <div className="text-4xl font-extrabold text-emerald-400 font-heading my-2">+0.65</div>
          <div className="text-xs sm:text-sm text-slate-400">Predominantly enthusiastic culture praise</div>
        </div>

        <div className="p-6 rounded-2xl world-card flex flex-col justify-between">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">Cons Sentiment Average</div>
          <div className="text-4xl font-extrabold text-rose-400 font-heading my-2">-0.26</div>
          <div className="text-xs sm:text-sm text-slate-400">Constructive & critical operational grievances</div>
        </div>

        <div className="p-6 rounded-2xl world-card flex flex-col justify-between">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">Full Review Net Compound</div>
          <div className="text-4xl font-extrabold text-blue-400 font-heading my-2">+0.48</div>
          <div className="text-xs sm:text-sm text-slate-400">Median: +0.62 (Moderate positive lean)</div>
        </div>
      </div>

      {/* Rating vs Sentiment Stacked Distribution */}
      <div className="p-7 rounded-3xl world-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white font-heading">
              Sentiment Distribution Across Numerical Star Ratings
            </h2>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              Examining empirical text sentiment across 1 to 5 star reviews reveals significant rating-text divergence.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/25 self-start sm:self-auto">
            Divergent Voice Evidence
          </span>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ratingSentimentData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
            >
              <XAxis type="number" unit="%" stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
              <YAxis 
                type="category" 
                dataKey="ratingOverall" 
                stroke="#e2e8f0" 
                fontSize={13}
                tickFormatter={(val) => `${val} Star`}
              />
              <Tooltip
                formatter={(val, name) => [`${typeof val === 'number' ? val.toFixed(1) : val}%`, name]}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '13px' }}
              />
              <Bar dataKey="Positive" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} name="Positive Text" />
              <Bar dataKey="Neutral" stackId="a" fill="#64748B" radius={[0, 0, 0, 0]} name="Neutral Text" />
              <Bar dataKey="Negative" stackId="a" fill="#EF4444" radius={[0, 6, 6, 0]} name="Negative Text" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm leading-relaxed">
            <span className="text-amber-400 font-bold font-mono">38.4% of 1-Star Reviews </span>
            <span className="text-slate-300">
              contain net-positive text, as employees soften harsh ratings with praise for teammates ("Great coworkers, but severe scheduling friction").
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm leading-relaxed">
            <span className="text-amber-400 font-bold font-mono">8.2% of 5-Star Reviews </span>
            <span className="text-slate-300">
              contain net-negative text, where operational pain points and burnout are concealed behind institutional loyalty or strong compensation.
            </span>
          </div>
        </div>
      </div>

      {/* The 4 Quadrants: Alignment vs Divergence */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-white font-heading">
              The Alignment & Divergence Framework
            </h2>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              Comparing text sentiment against numerical star ratings reveals four distinct workforce voices.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">Excludes 3-star borderline</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quadrants.map((quad) => {
            const isSelected = selectedQuadrant === quad.id;
            return (
              <div
                key={quad.id}
                onClick={() => setSelectedQuadrant(isSelected ? 'ALL' : quad.id)}
                className={`p-7 rounded-3xl bg-slate-900/70 border transition-all cursor-pointer space-y-4 ${
                  isSelected ? 'border-blue-500 shadow-md ring-1 ring-blue-500/50' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span 
                    className="text-xs font-mono font-bold px-3 py-1 rounded-lg"
                    style={{ backgroundColor: `${quad.color}15`, color: quad.color }}
                  >
                    {quad.badge}
                  </span>
                  <span className="text-base font-extrabold text-white font-heading">{quad.sharePct}</span>
                </div>

                <h3 className="text-lg font-bold text-white font-heading">
                  {quad.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-mono">
                  <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800">
                    Rating: {quad.ratingText}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800">
                    Text: {quad.sentimentText}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {quad.desc}
                </p>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong className="text-white font-semibold">Leadership Action: </strong>
                  {quad.implication}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ML Lexical Drivers: TF-IDF Coefficients & Model Performance */}
      <div className="p-8 rounded-3xl world-card space-y-6">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white font-heading">
                Machine Learning Classification & Feature Importance
              </h2>
              <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                Supervised sentiment classification predicting high satisfaction (4–5 stars) vs. low satisfaction (1–2 stars).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                82.4% Validation Accuracy
              </span>
              <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                79.8% Negative Recall
              </span>
            </div>
          </div>
        </div>

        {/* Model Performance & Class Imbalance Callout */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
            <Scale className="w-5 h-5 text-blue-400" />
            <span>Class Imbalance Mitigation: Why 79.8% Negative Recall Matters</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            The classifier achieved <strong>82.4% validation accuracy with 79.8% recall for the negative class</strong> (macro F1 of 0.777 across 1,293 validation samples). In employee review corpora, positive reviews outnumber negative reviews approximately <strong>3:1</strong>. A naive standard classifier achieves apparent high accuracy by defaulting to positive predictions, causing negative review recall to collapse to ~38%. By applying balanced inverse class weighting, our model accurately captures 79.8% of acute friction signals while maintaining robust overall accuracy.
          </p>
        </div>

        {/* Lexical Drivers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
          
          {/* Negative Terms */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <TrendingDown className="w-4 h-4" />
              <span>Strongest Negative Sentiment Predictors</span>
            </div>
            <div className="space-y-2">
              {topNeg.slice(0, 8).map((term, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-sm font-mono">
                  <span className="text-slate-100 font-sans font-medium text-sm">"{term.term}"</span>
                  <div className="flex items-center gap-3">
                    <div className="w-28 bg-slate-900 rounded-full h-2.5 overflow-hidden">
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
          <div className="space-y-3">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Strongest Positive Sentiment Predictors</span>
            </div>
            <div className="space-y-2">
              {topPos.slice(0, 8).map((term, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-sm font-mono">
                  <span className="text-slate-100 font-sans font-medium text-sm">"{term.term}"</span>
                  <div className="flex items-center gap-3">
                    <div className="w-28 bg-slate-900 rounded-full h-2.5 overflow-hidden">
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

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-300 leading-relaxed">
          <strong className="text-white font-semibold">Analytical Takeaway: </strong>
          Negative sentiment is overwhelmingly driven by supervisory and operational breakdown terms (<code className="text-rose-400 font-bold">poor</code>, <code className="text-rose-400 font-bold">terrible</code>, <code className="text-rose-400 font-bold">toxic</code>, <code className="text-rose-400 font-bold">management</code>, <code className="text-rose-400 font-bold">lack</code>). Positive sentiment centers on interpersonal support and growth opportunities (<code className="text-emerald-400 font-bold">supportive</code>, <code className="text-emerald-400 font-bold">opportunity</code>, <code className="text-emerald-400 font-bold">atmosphere</code>).
        </div>
      </div>

    </div>
  );
}
