import React, { useState } from 'react';
import { 
  Layers, 
  Star, 
  Sparkles, 
  TrendingUp, 
  MessageSquare, 
  Building2, 
  ChevronRight, 
  Hash,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import topicsData from '../data/topics.json';
import companiesData from '../data/companies.json';
import sampleReviews from '../data/sample_reviews.json';

export default function TopicExplorerPage() {
  const [selectedTopicId, setSelectedTopicId] = useState(0);

  const currentTopic = topicsData.find(t => t.topic_id === selectedTopicId) || topicsData[0];

  // Find companies that over-index on this topic
  const matchingCompanies = companiesData.filter(c => c.dominant_topic === currentTopic.short_name);

  // Sample reviews for this topic
  const topicReviews = sampleReviews.filter(r => r.dominant_topic_name === currentTopic.short_name);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>LATENT DIRICHLET ALLOCATION (k=6)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
          Workforce Topic Landscape
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Unsupervised topic discovery across 8,785 employee reviews. Select any topic to inspect its empirical keywords, sentiment profile, and organizational concentration.
        </p>
      </div>

      {/* 6 Interactive Topic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topicsData.map((topic) => {
          const isSelected = selectedTopicId === topic.topic_id;
          return (
            <div
              key={topic.topic_id}
              onClick={() => setSelectedTopicId(topic.topic_id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/30'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span 
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${topic.color}15`, color: topic.color }}
                  >
                    Topic {topic.topic_id + 1} • {topic.code}
                  </span>
                  <span className="text-xs font-bold text-white font-mono">
                    {topic.prevalence_pct}% share
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white font-heading">
                    {topic.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                {/* Top keywords pill tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {topic.top_words.slice(0, 6).map((word, wIdx) => (
                    <span 
                      key={wIdx} 
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 border border-slate-800 text-slate-300"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Metrics */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Avg Rating</div>
                  <div className="font-bold text-slate-200 flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{topic.avg_rating.toFixed(2)} / 5.0</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Net Sentiment</div>
                  <div className={`font-bold mt-0.5 ${topic.avg_sentiment_compound >= 0.4 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {topic.avg_sentiment_compound.toFixed(2)} ({topic.pct_positive_sentiment}% pos)
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Topic Deep-Dive Section */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        
        {/* Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: currentTopic.color }} 
              />
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                Deep Dive Investigation: Topic {currentTopic.topic_id + 1}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white font-heading mt-1">
              {currentTopic.name}
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Prevalence: </span>
              <span className="font-bold text-white">{currentTopic.prevalence_pct}%</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Total Reviews: </span>
              <span className="font-bold text-white">{currentTopic.review_count.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Top 12 Word Weights */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Dominant Lexical Features (Top 12 Empirical Terms)
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentTopic.top_words.map((w, i) => (
              <span 
                key={i}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-950 border border-slate-800 text-slate-200 flex items-center gap-1.5"
              >
                <Hash className="w-3 h-3 text-slate-500" />
                <span className="font-semibold">{w}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Model Output vs Qualitative Interpretation Callout */}
        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 leading-relaxed">
          <strong className="text-purple-300 font-mono">Model Output vs. Human Interpretation: </strong>
          LDA unsupervised topic modeling identified a statistical cluster of co-occurring terms ({currentTopic.top_words.slice(0, 5).map(w => `"${w}"`).join(', ')}) that was interpreted by the research team as <strong>"{currentTopic.name}"</strong> based on organizational context. The statistical model discovers word co-occurrence; the thematic label represents analytical interpretation.
        </div>

        {/* Narrative & Strategic Interpretation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>What Employees Express in this Theme</span>
            </h4>
            <p className="text-slate-400">
              {currentTopic.description} Reviews in this cluster frequently mention terms like <code className="text-blue-400">{currentTopic.top_words.slice(0, 3).join(', ')}</code>, representing {currentTopic.prevalence_pct}% of unsolicited feedback.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Organizational & Talent Implication</span>
            </h4>
            <p className="text-slate-400">
              {currentTopic.avg_rating < 3.2 
                ? "This topic operates as a notable organizational friction signal in this dataset. It suggests an area for operational attention, such as auditing frontline supervisory coaching, scheduling practices, or wage equity."
                : "This topic reflects a strong positive workforce signal. Supportive team collaboration and collegial workplace culture are consistently associated with higher employee sentiment across organizations."}
            </p>
          </div>
        </div>

        {/* Representative Quotes */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
            <span>Sample Review Signals in this Topic</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topicReviews.slice(0, 4).map((rev, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{rev.employerName}</span>
                  <span className="font-mono text-amber-400">{rev.ratingOverall} ⭐</span>
                </div>
                {rev.summary && <div className="italic text-slate-300">"{rev.summary}"</div>}
                <div className="text-slate-400 text-[11px] space-y-1">
                  <div><strong className="text-emerald-400">Pros:</strong> {rev.pros}</div>
                  <div><strong className="text-rose-400">Cons:</strong> {rev.cons}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
