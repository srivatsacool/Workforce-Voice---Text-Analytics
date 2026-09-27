import React, { useState } from 'react';
import { 
  Building2, 
  Search
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

import companiesData from '../data/companies.json';
import sampleReviews from '../data/sample_reviews.json';

export default function CompanySignalsPage() {
  const [selectedCompanyName, setSelectedCompanyName] = useState('Google');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected company object
  const company = companiesData.find(c => c.employer_name === selectedCompanyName) || companiesData[0];

  // Subrating fields
  const subratings = [
    { label: 'Work-Life Balance', score: company.avg_wlb, benchmark: 3.52 },
    { label: 'Culture & Values', score: company.avg_culture, benchmark: 3.68 },
    { label: 'Diversity & Inclusion', score: company.avg_diversity, benchmark: 3.90 },
    { label: 'Career Growth', score: company.avg_career, benchmark: 3.48 },
    { label: 'Compensation & Benefits', score: company.avg_comp, benchmark: 3.65 },
    { label: 'Senior Leadership', score: company.avg_leadership, benchmark: 3.25 },
  ];

  // Sentiment bar data
  const sentimentBreakdown = [
    { name: 'Positive', pct: company.pct_positive, color: '#10B981' },
    { name: 'Neutral', pct: company.pct_neutral, color: '#64748B' },
    { name: 'Negative', pct: company.pct_negative, color: '#EF4444' },
  ];

  // Company reviews
  const companyReviews = sampleReviews.filter(r => r.employerName === company.employer_name);

  const [sortBy, setSortBy] = useState('volume');

  // Filter and sort companies list
  const filteredCompanyList = companiesData
    .filter(c => c.employer_name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'volume') return b.review_count - a.review_count;
      if (sortBy === 'rating') return b.avg_rating - a.avg_rating;
      if (sortBy === 'sentiment') return b.avg_sentiment - a.avg_sentiment;
      return a.employer_name.localeCompare(b.employer_name);
    });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
          <Building2 className="w-3.5 h-3.5" />
          <span>90 US EMPLOYER SIGNAL PROFILES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
          Company Workforce Signals
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Select any of the 90 top US employers to examine its multidimensional workforce signals, sub-dimension ratings, dominant topics, and sentiment distribution. Company profiles represent cross-sectional thematic fingerprints rather than comparative league rankings.
        </p>
      </div>

      {/* Main Grid: Selector + Company Detail Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Company Directory Search & Select */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Company-Level Signal Profile ({filteredCompanyList.length})
            </h2>
            <span className="text-[10px] font-mono text-slate-500">Sorted by selected metric</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-[11px] text-slate-300 focus:outline-none focus:border-blue-500"
            >
              <option value="volume">Review Volume</option>
              <option value="name">Alphabetical</option>
              <option value="rating">Average Rating</option>
              <option value="sentiment">Net Sentiment</option>
            </select>
          </div>

          <div className="space-y-1 max-h-[520px] overflow-y-auto pr-1">
            {filteredCompanyList.map((c, i) => {
              const isSelected = c.employer_name === company.employer_name;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedCompanyName(c.employer_name)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                    isSelected
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="truncate pr-2">
                    <span>{c.employer_name}</span>
                    <div className="text-[10px] opacity-75">{c.dominant_topic}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono">{c.avg_rating.toFixed(2)} ⭐</span>
                    <div className="text-[10px] opacity-70 font-mono">{c.review_count} revs</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Columns: Company Deep-Dive Profile */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Company Profile Header Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 uppercase font-semibold">
                  Company-Level Signal Profile
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-1">
                  {company.employer_name}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dominant Thematic Signal: <strong className="text-slate-200">{company.dominant_topic}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Overall Rating</div>
                  <div className="text-2xl font-extrabold text-amber-400 font-heading">
                    {company.avg_rating.toFixed(2)} ⭐
                  </div>
                </div>

                <div className="text-right p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Text Sentiment</div>
                  <div className={`text-2xl font-extrabold font-heading ${company.avg_sentiment >= 0.4 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {company.avg_sentiment >= 0 ? `+${company.avg_sentiment.toFixed(2)}` : company.avg_sentiment.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400 text-[11px]">Review Volume: </span>
                <strong className="text-white font-mono">{company.review_count} reviews</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Positive Text: </span>
                <strong className="text-emerald-400 font-mono">{company.pct_positive}%</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Negative Text: </span>
                <strong className="text-rose-400 font-mono">{company.pct_negative}%</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Median Rating: </span>
                <strong className="text-white font-mono">{company.median_rating.toFixed(1)} ⭐</strong>
              </div>
            </div>
          </div>

          {/* Sub-Dimension Ratings Grid */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white font-heading">
                  Sub-Dimension Organizational Ratings
                </h3>
                <p className="text-xs text-slate-400">
                  Evaluated across the 6 Glassdoor sub-rating dimensions (1.0 to 5.0 stars).
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-500">Benchmark Avg: ~3.55⭐</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {subratings.map((dim, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-300">{dim.label}</span>
                    <span className="font-mono font-bold text-slate-200">
                      {dim.score ? `${dim.score.toFixed(2)} ⭐` : 'N/A'}
                    </span>
                  </div>
                  {dim.score ? (
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden relative">
                      <div 
                        className={`h-full rounded-full ${dim.score >= 4.0 ? 'bg-emerald-500' : dim.score >= 3.3 ? 'bg-blue-500' : 'bg-rose-500'}`}
                        style={{ width: `${(dim.score / 5.0) * 100}%` }}
                      />
                    </div>
                  ) : (
                    <div className="text-[10px] text-slate-500 italic">No subrating data available</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sentiment Breakdown Chart */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white font-heading">
              Textual Sentiment Breakdown for {company.employer_name}
            </h3>
            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  layout="vertical" 
                  data={sentimentBreakdown} 
                  margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                >
                  <XAxis type="number" stroke="#64748b" fontSize={11} unit="%" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" stroke="#cbd5e1" fontSize={11} width={80} />
                  <Tooltip 
                    formatter={(val) => [`${val}% of reviews`, 'Sentiment Share']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
                    {sentimentBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Evidence Quotes */}
          {companyReviews.length > 0 && (
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white font-heading">
                Direct Employee Evidence ({company.employer_name})
              </h3>
              <div className="space-y-3">
                {companyReviews.slice(0, 3).map((r, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                      <span>{r.reviewDateTime}</span>
                      <span className="text-amber-400 font-semibold">{r.ratingOverall} ⭐</span>
                    </div>
                    {r.summary && <div className="font-semibold text-slate-200">"{r.summary}"</div>}
                    <div className="text-slate-400 text-[11px] leading-relaxed">
                      <div><strong className="text-emerald-400">Pros:</strong> {r.pros}</div>
                      <div><strong className="text-rose-400">Cons:</strong> {r.cons}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
