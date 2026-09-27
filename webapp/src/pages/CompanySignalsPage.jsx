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
    <div className="space-y-12 pb-20">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
          <Building2 className="w-4 h-4" />
          <span>90 US EMPLOYER SIGNAL PROFILES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
          Company Workforce Signals
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-4xl leading-relaxed">
          Select any of the 90 top US employers to examine its multidimensional workforce signals, sub-dimension ratings, dominant topics, and sentiment distribution. Company profiles represent cross-sectional thematic fingerprints rather than comparative league rankings.
        </p>
      </div>

      {/* Main Grid: Selector + Company Detail Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Company Directory Search & Select */}
        <div className="p-6 rounded-3xl world-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Company-Level Signal Profile ({filteredCompanyList.length})
            </h2>
            <span className="text-xs font-mono text-slate-400">Sorted by metric</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="volume">Review Volume</option>
              <option value="name">Alphabetical</option>
              <option value="rating">Average Rating</option>
              <option value="sentiment">Net Sentiment</option>
            </select>
          </div>

          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1.5">
            {filteredCompanyList.map((c, i) => {
              const isSelected = c.employer_name === company.employer_name;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedCompanyName(c.employer_name)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl text-sm transition-colors cursor-pointer text-left ${
                    isSelected
                      ? 'bg-blue-600 text-white font-semibold shadow-md'
                      : 'hover:bg-slate-800/60 text-slate-200'
                  }`}
                >
                  <div className="truncate pr-3">
                    <span className="font-bold text-base">{c.employer_name}</span>
                    <div className="text-xs text-slate-400 opacity-90">{c.dominant_topic}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-amber-300">{c.avg_rating.toFixed(2)} ⭐</span>
                    <div className="text-xs opacity-75 font-mono text-slate-300">{c.review_count} revs</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Columns: Company Deep-Dive Profile */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Company Profile Header Banner */}
          <div className="p-8 rounded-3xl world-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20 uppercase font-semibold">
                  Company-Level Signal Profile
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mt-2">
                  {company.employer_name}
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  Dominant Thematic Signal: <strong className="text-white font-semibold">{company.dominant_topic}</strong>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Overall Rating</div>
                  <div className="text-3xl font-extrabold text-amber-400 font-heading mt-1">
                    {company.avg_rating.toFixed(2)} ⭐
                  </div>
                </div>

                <div className="text-right p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Text Sentiment</div>
                  <div className={`text-3xl font-extrabold font-heading mt-1 ${company.avg_sentiment >= 0.4 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {company.avg_sentiment >= 0 ? `+${company.avg_sentiment.toFixed(2)}` : company.avg_sentiment.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-slate-800/80">
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wider font-mono block">Review Volume</span>
                <strong className="text-lg text-white font-mono">{company.review_count} reviews</strong>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wider font-mono block">Positive Text</span>
                <strong className="text-lg text-emerald-400 font-mono">{company.pct_positive}%</strong>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wider font-mono block">Negative Text</span>
                <strong className="text-lg text-rose-400 font-mono">{company.pct_negative}%</strong>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wider font-mono block">Median Rating</span>
                <strong className="text-lg text-white font-mono">{company.median_rating.toFixed(1)} ⭐</strong>
              </div>
            </div>
          </div>

          {/* Sub-Dimension Ratings Grid */}
          <div className="p-7 rounded-3xl world-card space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Sub-Dimension Organizational Ratings
                </h3>
                <p className="text-sm text-slate-300 mt-0.5 leading-relaxed">
                  Evaluated across the 6 Glassdoor sub-rating dimensions (1.0 to 5.0 stars).
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 font-medium">Benchmark Avg: ~3.55⭐</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subratings.map((dim, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-200">{dim.label}</span>
                    <span className="font-mono font-bold text-slate-100">
                      {dim.score ? `${dim.score.toFixed(2)} ⭐` : 'N/A'}
                    </span>
                  </div>
                  {dim.score ? (
                    <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden relative">
                      <div 
                        className={`h-full rounded-full ${dim.score >= 4.0 ? 'bg-emerald-500' : dim.score >= 3.3 ? 'bg-blue-500' : 'bg-rose-500'}`}
                        style={{ width: `${(dim.score / 5.0) * 100}%` }}
                      />
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic">No subrating data available</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sentiment Breakdown Chart */}
          <div className="p-7 rounded-3xl world-card space-y-4">
            <h3 className="text-lg font-bold text-white font-heading">
              Textual Sentiment Breakdown for {company.employer_name}
            </h3>
            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  layout="vertical" 
                  data={sentimentBreakdown} 
                  margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                >
                  <XAxis type="number" stroke="#94a3b8" fontSize={12} unit="%" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" stroke="#e2e8f0" fontSize={12} width={90} />
                  <Tooltip 
                    formatter={(val) => [`${val}% of reviews`, 'Sentiment Share']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '13px' }}
                  />
                  <Bar dataKey="pct" radius={[0, 6, 6, 0]}>
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
            <div className="p-7 rounded-3xl world-card space-y-5">
              <h3 className="text-lg font-bold text-white font-heading">
                Direct Employee Evidence ({company.employer_name})
              </h3>
              <div className="space-y-4">
                {companyReviews.slice(0, 3).map((r, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-sm">
                    <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
                      <span>{r.reviewDateTime}</span>
                      <span className="text-amber-400 font-bold">{r.ratingOverall} ⭐</span>
                    </div>
                    {r.summary && <div className="font-semibold text-base text-slate-100 italic">"{r.summary}"</div>}
                    <div className="text-slate-300 text-sm space-y-1.5 leading-relaxed">
                      <div><strong className="text-emerald-400 font-semibold">Pros:</strong> {r.pros}</div>
                      <div><strong className="text-rose-400 font-semibold">Cons:</strong> {r.cons}</div>
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
