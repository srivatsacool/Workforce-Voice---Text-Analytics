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
import { useWorldTheme } from '../context/worldTheme';

export default function DashboardPage({ setActiveTab }) {
  const { activeWorld } = useWorldTheme();

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

  // Sentiment Donut Data dynamically colored by active world
  const sentimentPieData = useMemo(() => [
    { name: 'Positive', value: kpiData.pct_positive_sentiment, count: 6867, color: activeWorld.tertiaryAccent || '#10B981' },
    { name: 'Neutral', value: kpiData.pct_neutral_sentiment, count: 228, color: '#64748B' },
    { name: 'Negative', value: kpiData.pct_negative_sentiment, count: 1690, color: activeWorld.accentColor || '#EF4444' },
  ], [activeWorld]);

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
    <div className="space-y-12 pb-20">
      
      {/* Header & Filter Bar */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
              Workforce Intelligence Dashboard
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Decoding organizational friction & workforce signals from 8,785 validated reviews across 90 US employers.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => { setActiveTab('worlds'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              title="Click to explore and switch visual worlds"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all cursor-pointer ${activeWorld.badgeClass}`}
            >
              <Sparkles className="w-4 h-4" />
              <span>THEME: WORLD {activeWorld.code} • {activeWorld.shortName.toUpperCase()}</span>
            </button>
            <div 
              title="This limits long-term trend interpretation and means observed patterns should be treated as a contemporary snapshot rather than a multi-year workforce census."
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs sm:text-sm font-mono shrink-0 cursor-help"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span>96.9% of observations from 2026 cycle</span>
            </div>
          </div>
        </div>

        {/* 5-Point Core Framework Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm font-mono text-slate-300 shadow-sm">
          <div><strong className="text-white block font-sans text-xs uppercase tracking-wider text-slate-400">DATASET:</strong> 8,785 reviews</div>
          <div><strong className="text-white block font-sans text-xs uppercase tracking-wider text-slate-400">SCOPE:</strong> 90 US employers</div>
          <div><strong className="text-white block font-sans text-xs uppercase tracking-wider text-slate-400">METHOD:</strong> NLP + ML + LDA</div>
          <div><strong className="text-white block font-sans text-xs uppercase tracking-wider text-slate-400">OUTPUT:</strong> Friction signals</div>
          <div className="text-amber-300"><strong className="text-amber-400 block font-sans text-xs uppercase tracking-wider">LIMITATION:</strong> 96.9% 2026 snapshot</div>
        </div>

        {/* Interactive Filter Control Panel */}
        <div className="p-6 rounded-2xl world-card shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <Filter className="w-4 h-4 text-blue-400" />
              <span>Cross-Dimensional Signal Filters</span>
            </div>
            {(selectedCompany !== 'ALL' || selectedRating !== 'ALL' || selectedSentiment !== 'ALL' || selectedTopic !== 'ALL' || searchQuery !== '') && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Company Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Company</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="ALL">All 90 Employers</option>
                {companiesData.map((c, i) => (
                  <option key={i} value={c.employer_name}>{c.employer_name} ({c.review_count})</option>
                ))}
              </select>
            </div>

            {/* Rating Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Star Rating</label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
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
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Text Sentiment</label>
              <select
                value={selectedSentiment}
                onChange={(e) => setSelectedSentiment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="ALL">All Sentiment Tiers</option>
                <option value="Positive">Positive (Compound ≥ +0.05)</option>
                <option value="Neutral">Neutral (-0.05 to +0.05)</option>
                <option value="Negative">Negative (Compound ≤ -0.05)</option>
              </select>
            </div>

            {/* Topic Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Workforce Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="ALL">All 6 Discovered Topics</option>
                {topicsData.map((t, i) => (
                  <option key={i} value={t.short_name}>{t.short_name}</option>
                ))}
              </select>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Search Keywords</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. salary, toxic, manager..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 placeholder-slate-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 KPI Cards: Spacious 3-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-2xl world-card flex flex-col justify-between">
          <div className="text-xs font-mono font-semibold tracking-wider uppercase text-slate-400 flex items-center justify-between">
            <span>Analyzed Reviews</span>
            <MessageSquare className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-4xl font-extrabold text-white font-heading tracking-tight mt-3 mb-1.5">
            {kpiData.total_reviews.toLocaleString()}
          </div>
          <div className="text-xs sm:text-sm text-emerald-400 font-medium">
            ✓ 100% complete pros & cons texts
          </div>
        </div>

        <div className="p-6 rounded-2xl world-card flex flex-col justify-between">
          <div className="text-xs font-mono font-semibold tracking-wider uppercase text-slate-400 flex items-center justify-between">
            <span>Employers Covered</span>
            <Building2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-4xl font-extrabold text-white font-heading tracking-tight mt-3 mb-1.5">
            {kpiData.total_companies} Firms
          </div>
          <div className="text-xs sm:text-sm text-slate-400">
            Fortune 500 US enterprise cross-section
          </div>
        </div>

        <div className="p-6 rounded-2xl world-card flex flex-col justify-between">
          <div className="text-xs font-mono font-semibold tracking-wider uppercase text-slate-400 flex items-center justify-between">
            <span>Average Star Rating</span>
            <Star className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-4xl font-extrabold text-white font-heading tracking-tight mt-3 mb-1.5">
            {kpiData.avg_rating_overall.toFixed(2)} ⭐
          </div>
          <div className="text-xs sm:text-sm text-slate-400">
            Benchmark median: 4.0 / 5.0 Stars
          </div>
        </div>

        <div className="p-6 rounded-2xl world-card flex flex-col justify-between">
          <div className="text-xs font-mono font-semibold tracking-wider uppercase text-slate-400 flex items-center justify-between">
            <span>Positive Text Valence</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-4xl font-extrabold text-emerald-400 font-heading tracking-tight mt-3 mb-1.5">
            {kpiData.pct_positive_sentiment}%
          </div>
          <div className="text-xs sm:text-sm text-slate-400">
            6,867 reviews with constructive culture praise
          </div>
        </div>

        <div className="p-6 rounded-2xl world-card flex flex-col justify-between">
          <div className="text-xs font-mono font-semibold tracking-wider uppercase text-slate-400 flex items-center justify-between">
            <span>Negative Text Friction</span>
            <TrendingUp className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-4xl font-extrabold text-rose-400 font-heading tracking-tight mt-3 mb-1.5">
            {kpiData.pct_negative_sentiment}%
          </div>
          <div className="text-xs sm:text-sm text-slate-400">
            1,690 acute friction & supervisory signals
          </div>
        </div>

        <div className="p-6 rounded-2xl world-card flex flex-col justify-between">
          <div className="text-xs font-mono font-semibold tracking-wider uppercase text-slate-400 flex items-center justify-between">
            <span>Discovered Topics</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-4xl font-extrabold text-white font-heading tracking-tight mt-3 mb-1.5">
            {kpiData.topics_discovered} Topics
          </div>
          <div className="text-xs sm:text-sm text-purple-400">
            Unsupervised Latent Dirichlet Allocation
          </div>
        </div>

      </div>

      {/* Grid: Sentiment Composition + Rating vs Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Panel 1: Workforce Sentiment Breakdown */}
        <div className="p-7 rounded-3xl world-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-lg font-bold text-white font-heading">
                1. Workforce Sentiment Composition
              </h3>
              <span className="text-xs font-mono text-slate-400 font-medium">VADER Valence</span>
            </div>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Distribution of employee text across Positive (≥0.05), Neutral, and Negative (≤-0.05) valence.
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {sentimentPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val, name, item) => [`${val}% (${item.payload.count.toLocaleString()} reviews)`, name]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '13px' }}
                />
                <Legend 
                  formatter={(value, entry) => <span className="text-xs sm:text-sm text-slate-300 font-medium">{value} ({entry.payload.value}%)</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-5 border-t border-slate-800/80 text-center">
            <div>
              <div className="text-xl font-extrabold text-emerald-400">78.2%</div>
              <div className="text-xs text-slate-400 mt-1">Positive (Avg: 3.7⭐)</div>
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-300">2.6%</div>
              <div className="text-xs text-slate-400 mt-1">Neutral (Avg: 3.5⭐)</div>
            </div>
            <div>
              <div className="text-xl font-extrabold text-rose-400">19.2%</div>
              <div className="text-xs text-slate-400 mt-1">Negative (Avg: 2.8⭐)</div>
            </div>
          </div>
        </div>

        {/* Panel 2: Ratings vs Sentiment Alignment */}
        <div className="p-7 rounded-3xl world-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-lg font-bold text-white font-heading">
                2. Ratings vs. Sentiment Alignment
              </h3>
              <span className="text-xs font-mono text-slate-400 font-medium">Cross-Tabulation (%)</span>
            </div>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              How textual sentiment behaves within each star-rating tier. Notice the divergence in 1-star reviews.
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingSentimentData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <XAxis dataKey="ratingOverall" tickFormatter={(r) => `${r} Stars`} stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} unit="%" />
                <Tooltip 
                  formatter={(val, name) => [`${val}%`, name]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '13px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="Positive" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Neutral" fill="#64748B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Negative" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-white block font-sans font-semibold">Divergent Workforce Signals (Rating–Text Divergence):</strong>
              <p className="leading-relaxed">
                <strong>38.4% of 1-star reviews contain net-positive text</strong>, while <strong>8.2% of 5-star reviews contain net-negative text</strong>. Positive textual language within a low-rated review often reflects appreciation for colleagues despite dissatisfaction with leadership.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Panel 3: Topic Landscape */}
      <div className="p-7 rounded-3xl world-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white font-heading">
              3. Latent Topic Landscape across 8,785 Reviews
            </h3>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              Prevalence share (%) and average sentiment for the 6 unsupervised themes discovered by LDA.
            </p>
          </div>
          <button
            onClick={() => { setActiveTab('topics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-1.5 text-xs sm:text-sm text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
          >
            <span>Explore All Topics</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={topicBarData} 
              layout="vertical"
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <XAxis type="number" stroke="#94a3b8" fontSize={12} unit="%" />
              <YAxis dataKey="name" type="category" stroke="#e2e8f0" fontSize={12} width={180} />
              <Tooltip 
                formatter={(val, name, item) => [
                  `${val}% prevalence | Avg Rating: ${item.payload.avgRating}⭐ | Sentiment: ${item.payload.avgSentiment}`, 
                  item.payload.name
                ]}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '13px' }}
              />
              <Bar dataKey="prevalence" radius={[0, 6, 6, 0]}>
                {topicBarData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {topicsData.map((t, idx) => (
            <div 
              key={idx} 
              onClick={() => { setSelectedTopic(t.short_name); }}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                selectedTopic === t.short_name
                  ? 'bg-blue-950/60 border-blue-500 shadow-md ring-1 ring-blue-500/40'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-mono font-bold" style={{ color: t.color }}>
                Topic {t.topic_id + 1}
              </div>
              <div className="text-sm font-bold text-slate-100 truncate mt-1" title={t.name}>
                {t.short_name}
              </div>
              <div className="text-xs text-slate-400 mt-2 flex justify-between">
                <span>{t.prevalence_pct}% share</span>
                <span className="font-bold text-amber-400">{t.avg_rating}⭐</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Company Signals Benchmark + Workforce Signal Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Panel 4: Company Signals Benchmark */}
        <div className="p-7 rounded-3xl world-card space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                4. Company-Level Signal Profiles
              </h3>
              <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                Top employers by review volume (exploratory profiles, not an employer ranking).
              </p>
            </div>
            <button
              onClick={() => { setActiveTab('companies'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View All 90</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCompaniesData} margin={{ top: 10, right: 10, left: -15, bottom: 35 }}>
                <XAxis 
                  dataKey="name" 
                  angle={-35} 
                  textAnchor="end" 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  interval={0} 
                />
                <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 5]} />
                <Tooltip 
                  formatter={(val, name, item) => [
                    `${val}⭐ Rating (${item.payload.positivePct}% Positive Text)`, 
                    item.payload.name
                  ]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '13px' }}
                />
                <Bar dataKey="rating" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Panel 5: Workforce Signal Matrix (Topic × Rating Heatmap) */}
        <div className="p-7 rounded-3xl world-card space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white font-heading">
              5. The Workforce Signal Matrix
            </h3>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              Concentration of reviews by topic across 1-Star to 5-Star evaluations.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-200">
              <thead className="text-xs text-slate-400 bg-slate-950/70 uppercase font-mono tracking-wider">
                <tr>
                  <th className="py-3 px-3.5">Topic Dimension</th>
                  <th className="py-3 px-2.5 text-center text-rose-400">1⭐</th>
                  <th className="py-3 px-2.5 text-center text-orange-400">2⭐</th>
                  <th className="py-3 px-2.5 text-center text-amber-400">3⭐</th>
                  <th className="py-3 px-2.5 text-center text-blue-400">4⭐</th>
                  <th className="py-3 px-2.5 text-center text-emerald-400">5⭐</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3.5 font-sans font-medium text-slate-200">Compensation & Pay</td>
                  <td className="text-center py-2.5 bg-rose-500/10">18.4%</td>
                  <td className="text-center py-2.5 bg-rose-500/10">14.2%</td>
                  <td className="text-center py-2.5 bg-amber-500/10">28.1%</td>
                  <td className="text-center py-2.5 bg-blue-500/10">24.5%</td>
                  <td className="text-center py-2.5">14.8%</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3.5 font-sans font-medium text-slate-200">Culture & Camaraderie</td>
                  <td className="text-center py-2.5">3.8%</td>
                  <td className="text-center py-2.5">5.1%</td>
                  <td className="text-center py-2.5">16.8%</td>
                  <td className="text-center py-2.5 bg-blue-500/20">38.4%</td>
                  <td className="text-center py-2.5 bg-emerald-500/25 font-bold text-emerald-400">35.9%</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3.5 font-sans font-medium text-slate-200">Work-Life Balance</td>
                  <td className="text-center py-2.5">8.2%</td>
                  <td className="text-center py-2.5">10.5%</td>
                  <td className="text-center py-2.5 bg-amber-500/15">29.4%</td>
                  <td className="text-center py-2.5 bg-blue-500/20">33.2%</td>
                  <td className="text-center py-2.5">18.7%</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3.5 font-sans font-medium text-slate-200">Management & Leadership</td>
                  <td className="text-center py-2.5 bg-rose-500/25 font-bold text-rose-400">22.6%</td>
                  <td className="text-center py-2.5 bg-rose-500/20">19.4%</td>
                  <td className="text-center py-2.5 bg-amber-500/15">26.8%</td>
                  <td className="text-center py-2.5">20.1%</td>
                  <td className="text-center py-2.5">11.1%</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3.5 font-sans font-medium text-slate-200">Career Development</td>
                  <td className="text-center py-2.5">7.1%</td>
                  <td className="text-center py-2.5">9.2%</td>
                  <td className="text-center py-2.5 bg-amber-500/10">24.5%</td>
                  <td className="text-center py-2.5 bg-blue-500/20">36.8%</td>
                  <td className="text-center py-2.5 bg-emerald-500/15">22.4%</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3.5 font-sans font-medium text-slate-200">Operational Stress</td>
                  <td className="text-center py-2.5 bg-rose-500/15">14.5%</td>
                  <td className="text-center py-2.5 bg-rose-500/15">15.8%</td>
                  <td className="text-center py-2.5 bg-amber-500/20">31.2%</td>
                  <td className="text-center py-2.5">25.3%</td>
                  <td className="text-center py-2.5">13.2%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-xs sm:text-sm text-slate-300 pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-slate-800/80">
            <span>Friction Hotspot: <strong className="text-rose-400 font-semibold">Management (42% in 1-2⭐)</strong></span>
            <span>Culture Anchor: <strong className="text-emerald-400 font-semibold">Camaraderie (74% in 4-5⭐)</strong></span>
          </div>
        </div>

      </div>

      {/* Filtered Reviews Drawer / Inspector */}
      <div className="p-7 rounded-3xl world-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2.5">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <span>Review Inspector ({filteredReviews.length} matching sample reviews)</span>
            </h3>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              Direct qualitative evidence from employee text matching current filter criteria.
            </p>
          </div>
          {filteredReviews.length === 0 && (
            <button
              onClick={handleResetFilters}
              className="text-sm text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
            >
              Clear filters to view sample reviews
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[32rem] overflow-y-auto pr-1.5">
          {filteredReviews.slice(0, 10).map((rev, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-white">{rev.employerName}</span>
                <span className="font-mono text-amber-400 font-bold text-sm">{rev.ratingOverall} ⭐</span>
              </div>
              {rev.summary && (
                <div className="font-medium text-slate-200 italic leading-snug">
                  "{rev.summary}"
                </div>
              )}
              <div className="space-y-1.5 text-slate-300 text-xs sm:text-sm leading-relaxed">
                <div>
                  <strong className="text-emerald-400 font-semibold">Pros:</strong> {rev.pros}
                </div>
                <div>
                  <strong className="text-rose-400 font-semibold">Cons:</strong> {rev.cons}
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs text-slate-400 font-mono">
                <span>Topic: {rev.dominant_topic_name}</span>
                <span className={rev.sentiment_category === 'Positive' ? 'text-emerald-400 font-bold' : rev.sentiment_category === 'Negative' ? 'text-rose-400 font-bold' : 'text-slate-400 font-bold'}>
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
