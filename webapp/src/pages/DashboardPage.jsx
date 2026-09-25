import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend
} from 'recharts';
import { 
  Filter, 
  RotateCcw, 
  Search, 
  Star, 
  MessageSquare, 
  Building2, 
  Layers, 
  TrendingUp, 
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';

import kpiData from '../data/kpis.json';
import companiesData from '../data/companies.json';
import topicsData from '../data/topics.json';
import ratingSentimentData from '../data/rating_sentiment.json';
import sampleReviews from '../data/sample_reviews.json';

export default function DashboardPage({ setActiveTab }) {
  // Global Filters
  const [selectedCompany, setSelectedCompany] = useState('ALL');
  const [selectedRating, setSelectedRating] = useState('ALL');
  const [selectedSentiment, setSelectedSentiment] = useState('ALL');
  const [selectedTopic, setSelectedTopic] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCompany('ALL');
    setSelectedRating('ALL');
    setSelectedSentiment('ALL');
    setSelectedTopic('ALL');
    setSearchQuery('');
  };

  // Filtered Reviews for the live sample drawer
  const filteredReviews = useMemo(() => {
    return sampleReviews.filter(r => {
      if (selectedCompany !== 'ALL' && r.employerName !== selectedCompany) return false;
      if (selectedRating !== 'ALL' && r.ratingOverall !== parseInt(selectedRating)) return false;
      if (selectedSentiment !== 'ALL' && r.sentiment_category !== selectedSentiment) return false;
      if (selectedTopic !== 'ALL' && r.dominant_topic_name !== selectedTopic) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const text = `${r.summary || ''} ${r.pros || ''} ${r.cons || ''} ${r.employerName || ''}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [selectedCompany, selectedRating, selectedSentiment, selectedTopic, searchQuery]);

  // Sentiment Donut Data
  const sentimentPieData = [
    { name: 'Positive', value: kpiData.pct_positive_sentiment, count: 6867, color: '#10B981' },
    { name: 'Neutral', value: kpiData.pct_neutral_sentiment, count: 228, color: '#64748B' },
    { name: 'Negative', value: kpiData.pct_negative_sentiment, count: 1690, color: '#EF4444' },
  ];

  // Topic Prevalence Data
  const topicBarData = topicsData.map(t => ({
    name: t.short_name,
    prevalence: t.prevalence_pct,
    avgRating: t.avg_rating,
    avgSentiment: t.avg_sentiment_compound,
    color: t.color
  }));

  // Company benchmark scatter / bar data (top 15)
  const topCompaniesData = companiesData.slice(0, 12).map(c => ({
    name: c.employer_name,
    rating: c.avg_rating,
    sentiment: Math.round(c.avg_sentiment * 100) / 100,
    positivePct: c.pct_positive
  }));

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header & Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              Workforce Intelligence Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Decoding organizational friction & workforce signals from 8,785 validated reviews across 90 US employers.
            </p>
          </div>
          <div 
            title="This limits long-term trend interpretation and means observed patterns should be treated as a contemporary snapshot rather than a multi-year workforce census."
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono shrink-0 cursor-help"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>96.9% of observations are from the 2026 collection cycle</span>
          </div>
        </div>

        {/* 5-Point Core Framework Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] font-mono text-slate-400">
          <div><strong className="text-slate-200">WHAT DATA:</strong> 8,785 employee reviews</div>
          <div><strong className="text-slate-200">WHERE:</strong> 90 US employers</div>
          <div><strong className="text-slate-200">METHOD:</strong> NLP + Sentiment + ML + LDA</div>
          <div><strong className="text-slate-200">PRODUCES:</strong> Workforce signals & themes</div>
          <div className="text-amber-400"><strong className="text-amber-300">LIMITATION:</strong> 96.9% 2026 cycle</div>
        </div>

        {/* Interactive Filter Control Panel */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Filter className="w-3.5 h-3.5 text-blue-400" />
              <span>Cross-Dimensional Signal Filters</span>
            </div>
            {(selectedCompany !== 'ALL' || selectedRating !== 'ALL' || selectedSentiment !== 'ALL' || selectedTopic !== 'ALL' || searchQuery !== '') && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Company Dropdown */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Company</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="ALL">All 90 Employers</option>
                {companiesData.map((c, i) => (
                  <option key={i} value={c.employer_name}>{c.employer_name} ({c.review_count})</option>
                ))}
              </select>
            </div>

            {/* Rating Selector */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Star Rating</label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="ALL">All Ratings (1 - 5 Stars)</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                <option value="3">⭐⭐⭐ 3 Stars</option>
                <option value="2">⭐⭐ 2 Stars</option>
                <option value="1">⭐ 1 Star</option>
              </select>
            </div>

            {/* Sentiment Filter */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Text Sentiment</label>
              <select
                value={selectedSentiment}
                onChange={(e) => setSelectedSentiment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="ALL">All Sentiment Tiers</option>
                <option value="Positive">Positive (Compound ≥ +0.05)</option>
                <option value="Neutral">Neutral (-0.05 to +0.05)</option>
                <option value="Negative">Negative (Compound ≤ -0.05)</option>
              </select>
            </div>

            {/* Topic Filter */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Workforce Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="ALL">All 6 Discovered Topics</option>
                {topicsData.map((t, i) => (
                  <option key={i} value={t.short_name}>{t.short_name}</option>
                ))}
              </select>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Search Keywords</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. salary, toxic, manager..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 placeholder-slate-600"
                />
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 KPI Cards (Actual Computed Values) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
          <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
            <span>Analyzed Reviews</span>
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white font-heading mt-1">
            {kpiData.total_reviews.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
            100% complete pros/cons
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
          <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
            <span>Employers Covered</span>
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white font-heading mt-1">
            {kpiData.total_companies}
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            Fortune 500 US firms
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
          <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
            <span>Average Rating</span>
            <Star className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-heading mt-1">
            {kpiData.avg_rating_overall.toFixed(2)}
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            Median: 4.0 Stars
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
          <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
            <span>Positive Sentiment</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-heading mt-1">
            {kpiData.pct_positive_sentiment}%
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            6,867 reviews
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
          <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
            <span>Negative Sentiment</span>
            <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-400 font-heading mt-1">
            {kpiData.pct_negative_sentiment}%
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            1,690 friction signals
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
          <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
            <span>Discovered Topics</span>
            <Layers className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-heading mt-1">
            {kpiData.topics_discovered}
          </div>
          <div className="text-[10px] text-purple-400 font-mono mt-0.5">
            LDA Probabilistic
          </div>
        </div>

      </div>

      {/* Grid: Sentiment Composition + Rating vs Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Panel 1: Workforce Sentiment Breakdown */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white font-heading">
                1. Workforce Sentiment Composition
              </h3>
              <span className="text-[10px] font-mono text-slate-400">VADER Compound Score</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Distribution of employee text across Positive (≥0.05), Neutral, and Negative (≤-0.05) valence.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {sentimentPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val, name, item) => [`${val}% (${item.payload.count.toLocaleString()} reviews)`, name]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend 
                  formatter={(value, entry) => <span className="text-xs text-slate-300 font-medium">{value} ({entry.payload.value}%)</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-center text-xs">
            <div>
              <div className="font-bold text-emerald-400">78.2%</div>
              <div className="text-[10px] text-slate-400">Positive (Avg: 3.7⭐)</div>
            </div>
            <div>
              <div className="font-bold text-slate-400">2.6%</div>
              <div className="text-[10px] text-slate-400">Neutral (Avg: 3.5⭐)</div>
            </div>
            <div>
              <div className="font-bold text-rose-400">19.2%</div>
              <div className="text-[10px] text-slate-400">Negative (Avg: 2.8⭐)</div>
            </div>
          </div>
        </div>

        {/* Panel 2: Ratings vs Sentiment Alignment */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white font-heading">
                2. Ratings vs. Sentiment Alignment
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Cross-Tabulation (%)</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              How textual sentiment behaves within each star-rating tier. Notice the divergence in 1-star reviews.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingSentimentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="ratingOverall" tickFormatter={(r) => `${r} Stars`} stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} unit="%" />
                <Tooltip 
                  formatter={(val, name) => [`${val}%`, name]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Bar dataKey="Positive" fill="#10B981" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Neutral" fill="#64748B" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Negative" fill="#EF4444" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-slate-200">Divergent Workforce Signals (Rating–Text Divergence):</strong>
              <p>
                <strong>38.4% of 1-star reviews contain net-positive text</strong>, while <strong>8.2% of 5-star reviews contain net-negative text</strong>. Positive textual language within a low-rated review may reflect appreciation for colleagues or specific workplace aspects despite broader dissatisfaction. This is an interpretation, not a causal finding.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Panel 3: Topic Landscape */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white font-heading">
              3. Latent Topic Landscape across 8,785 Reviews
            </h3>
            <p className="text-xs text-slate-400">
              Prevalence share (%) and average sentiment for the 6 unsupervised themes discovered by LDA.
            </p>
          </div>
          <button
            onClick={() => { setActiveTab('topics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
          >
            <span>Explore All Topics</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={topicBarData} 
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <XAxis type="number" stroke="#64748b" fontSize={11} unit="%" />
              <YAxis dataKey="name" type="category" stroke="#cbd5e1" fontSize={11} width={150} />
              <Tooltip 
                formatter={(val, name, item) => [
                  `${val}% prevalence | Avg Rating: ${item.payload.avgRating}⭐ | Sentiment: ${item.payload.avgSentiment}`, 
                  item.payload.name
                ]}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="prevalence" radius={[0, 4, 4, 0]}>
                {topicBarData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {topicsData.map((t, idx) => (
            <div 
              key={idx} 
              onClick={() => { setSelectedTopic(t.short_name); }}
              className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                selectedTopic === t.short_name
                  ? 'bg-blue-950/60 border-blue-500 shadow-sm'
                  : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] font-mono font-bold" style={{ color: t.color }}>
                Topic {t.topic_id + 1}
              </div>
              <div className="text-xs font-semibold text-slate-200 truncate mt-0.5" title={t.name}>
                {t.short_name}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                <span>{t.prevalence_pct}% share</span>
                <span className="font-semibold text-slate-300">{t.avg_rating}⭐</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Company Signals Benchmark + Workforce Signal Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Panel 4: Company Signals Benchmark */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-heading">
                4. Company-Level Signal Profiles
              </h3>
              <p className="text-xs text-slate-400">
                Sorted by review volume (exploratory signal profiles, not an employer ranking).
              </p>
            </div>
            <button
              onClick={() => { setActiveTab('companies'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>View All 90</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCompaniesData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis 
                  dataKey="name" 
                  angle={-35} 
                  textAnchor="end" 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  interval={0} 
                />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 5]} />
                <Tooltip 
                  formatter={(val, name, item) => [
                    `${val}⭐ Rating (${item.payload.positivePct}% Positive Text)`, 
                    item.payload.name
                  ]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="rating" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Panel 5: Workforce Signal Matrix (Topic × Rating Heatmap) */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div>
            <h3 className="text-sm font-bold text-white font-heading">
              5. The Workforce Signal Matrix
            </h3>
            <p className="text-xs text-slate-400">
              Concentration of reviews by topic across 1-Star to 5-Star evaluations.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="text-[11px] text-slate-400 bg-slate-950/60 uppercase font-mono">
                <tr>
                  <th className="py-2 px-2.5">Topic Dimension</th>
                  <th className="py-2 px-2 text-center text-rose-400">1⭐</th>
                  <th className="py-2 px-2 text-center text-orange-400">2⭐</th>
                  <th className="py-2 px-2 text-center text-amber-400">3⭐</th>
                  <th className="py-2 px-2 text-center text-blue-400">4⭐</th>
                  <th className="py-2 px-2 text-center text-emerald-400">5⭐</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2 px-2.5 font-sans font-medium text-slate-200">Compensation & Pay</td>
                  <td className="text-center py-2 bg-rose-500/10">18.4%</td>
                  <td className="text-center py-2 bg-rose-500/10">14.2%</td>
                  <td className="text-center py-2 bg-amber-500/10">28.1%</td>
                  <td className="text-center py-2 bg-blue-500/10">24.5%</td>
                  <td className="text-center py-2">14.8%</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2 px-2.5 font-sans font-medium text-slate-200">Culture & Camaraderie</td>
                  <td className="text-center py-2">3.8%</td>
                  <td className="text-center py-2">5.1%</td>
                  <td className="text-center py-2">16.8%</td>
                  <td className="text-center py-2 bg-blue-500/20">38.4%</td>
                  <td className="text-center py-2 bg-emerald-500/25 font-bold text-emerald-400">35.9%</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2 px-2.5 font-sans font-medium text-slate-200">Work-Life Balance</td>
                  <td className="text-center py-2">8.2%</td>
                  <td className="text-center py-2">10.5%</td>
                  <td className="text-center py-2 bg-amber-500/15">29.4%</td>
                  <td className="text-center py-2 bg-blue-500/20">33.2%</td>
                  <td className="text-center py-2">18.7%</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2 px-2.5 font-sans font-medium text-slate-200">Management & Leadership</td>
                  <td className="text-center py-2 bg-rose-500/25 font-bold text-rose-400">22.6%</td>
                  <td className="text-center py-2 bg-rose-500/20">19.4%</td>
                  <td className="text-center py-2 bg-amber-500/15">26.8%</td>
                  <td className="text-center py-2">20.1%</td>
                  <td className="text-center py-2">11.1%</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2 px-2.5 font-sans font-medium text-slate-200">Career Development</td>
                  <td className="text-center py-2">7.1%</td>
                  <td className="text-center py-2">9.2%</td>
                  <td className="text-center py-2 bg-amber-500/10">24.5%</td>
                  <td className="text-center py-2 bg-blue-500/20">36.8%</td>
                  <td className="text-center py-2 bg-emerald-500/15">22.4%</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2 px-2.5 font-sans font-medium text-slate-200">Operational Stress</td>
                  <td className="text-center py-2 bg-rose-500/15">14.5%</td>
                  <td className="text-center py-2 bg-rose-500/15">15.8%</td>
                  <td className="text-center py-2 bg-amber-500/20">31.2%</td>
                  <td className="text-center py-2">25.3%</td>
                  <td className="text-center py-2">13.2%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 flex items-center justify-between">
            <span>Friction Hotspot: <strong>Management (42% in 1-2⭐)</strong></span>
            <span>Culture Anchor: <strong>Camaraderie (74% in 4-5⭐)</strong></span>
          </div>
        </div>

      </div>

      {/* Filtered Reviews Drawer / Inspector */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span>Review Inspector ({filteredReviews.length} matching sample reviews)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Direct evidence from employee text matching current filter criteria.
            </p>
          </div>
          {filteredReviews.length === 0 && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              Clear filters to view sample reviews
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
          {filteredReviews.slice(0, 10).map((rev, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">{rev.employerName}</span>
                <span className="font-mono text-amber-400 font-semibold">{rev.ratingOverall} ⭐</span>
              </div>
              {rev.summary && (
                <div className="font-medium text-slate-300 italic">
                  "{rev.summary}"
                </div>
              )}
              <div className="space-y-1 text-slate-400 text-[11px] leading-relaxed">
                <div>
                  <strong className="text-emerald-400">Pros:</strong> {rev.pros}
                </div>
                <div>
                  <strong className="text-rose-400">Cons:</strong> {rev.cons}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px] text-slate-500 font-mono">
                <span>Topic: {rev.dominant_topic_name}</span>
                <span className={rev.sentiment_category === 'Positive' ? 'text-emerald-400' : rev.sentiment_category === 'Negative' ? 'text-rose-400' : 'text-slate-400'}>
                  {rev.sentiment_category} ({rev.sentiment_compound.toFixed(2)})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
