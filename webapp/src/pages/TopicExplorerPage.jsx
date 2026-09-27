import React, { useState } from 'react';
import { 
  Layers, 
  Star, 
  MessageSquare, 
  Hash,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import topicsData from '../data/topics.json';
import sampleReviews from '../data/sample_reviews.json';

export default function TopicExplorerPage() {
  const [selectedTopicId, setSelectedTopicId] = useState(0);

  const currentTopic = topicsData.find(t => t.topic_id === selectedTopicId) || topicsData[0];

  // Sample reviews for this topic
  const topicReviews = sampleReviews.filter(r => r.dominant_topic_name === currentTopic.short_name);

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-3">
          <Layers className="w-4 h-4" />
          <span>LATENT DIRICHLET ALLOCATION (k=6)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
          Workforce Topic Landscape
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-4xl leading-relaxed">
          Unsupervised topic discovery across 8,785 employee reviews. Select any topic to inspect its empirical keywords, sentiment profile, and organizational concentration.
        </p>
      </div>

      {/* 6 Interactive Topic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topicsData.map((topic) => {
          const isSelected = selectedTopicId === topic.topic_id;
          return (
            <div
              key={topic.topic_id}
              onClick={() => setSelectedTopicId(topic.topic_id)}
              className={`p-6 sm:p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/40'
                  : 'world-card hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span 
                    className="text-xs font-mono font-bold px-3 py-1 rounded-lg"
                    style={{ backgroundColor: `${topic.color}15`, color: topic.color }}
                  >
                    Topic {topic.topic_id + 1} • {topic.code}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white font-mono">
                    {topic.prevalence_pct}% share
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {topic.name}
                  </h3>
                  <p className="text-sm text-slate-300 mt-1.5 line-clamp-3 leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                {/* Top keywords pill tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {topic.top_words.slice(0, 6).map((word, wIdx) => (
                    <span 
                      key={wIdx} 
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-950 border border-slate-800 text-slate-300 font-medium"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Metrics */}
              <div className="pt-5 mt-5 border-t border-slate-800/80 grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Avg Rating</div>
                  <div className="font-bold text-base text-slate-100 flex items-center gap-1.5 mt-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{topic.avg_rating.toFixed(2)} / 5.0</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Net Sentiment</div>
                  <div className={`font-bold text-base mt-1 ${topic.avg_sentiment_compound >= 0.4 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {topic.avg_sentiment_compound.toFixed(2)} ({topic.pct_positive_sentiment}% pos)
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Topic Deep-Dive Section */}
      <div className="p-8 rounded-3xl world-card space-y-7">
        
        {/* Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2.5">
              <span 
                className="w-3.5 h-3.5 rounded-full" 
                style={{ backgroundColor: currentTopic.color }} 
              />
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Deep Dive Investigation: Topic {currentTopic.topic_id + 1}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-2">
              {currentTopic.name}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono">
            <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Prevalence: </span>
              <span className="font-bold text-white">{currentTopic.prevalence_pct}%</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Total Reviews: </span>
              <span className="font-bold text-white">{currentTopic.review_count.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Top 12 Word Weights */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Dominant Lexical Features (Top 12 Empirical Terms)
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {currentTopic.top_words.map((w, i) => (
              <span 
                key={i}
                className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-slate-950 border border-slate-800 text-slate-200 flex items-center gap-2"
              >
                <Hash className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold">{w}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Model Output vs Qualitative Interpretation Callout */}
        <div className="p-4 sm:p-5 rounded-2xl bg-purple-500/10 border border-purple-500/25 text-xs sm:text-sm text-purple-200 leading-relaxed">
          <strong className="text-purple-300 font-mono font-semibold">Model Output vs. Human Interpretation: </strong>
          LDA unsupervised topic modeling identified a statistical cluster of co-occurring terms ({currentTopic.top_words.slice(0, 5).map(w => `"${w}"`).join(', ')}) that was interpreted by the research team as <strong>"{currentTopic.name}"</strong> based on organizational context. The statistical model discovers word co-occurrence; the thematic label represents analytical interpretation.
        </div>

        {/* Narrative & Strategic Interpretation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
            <h4 className="font-bold text-slate-100 flex items-center gap-2 text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>What Employees Express in this Theme</span>
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              {currentTopic.description} Reviews in this cluster frequently mention terms like <code className="text-blue-400 font-semibold">{currentTopic.top_words.slice(0, 3).join(', ')}</code>, representing {currentTopic.prevalence_pct}% of unsolicited feedback.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
            <h4 className="font-bold text-slate-100 flex items-center gap-2 text-base">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span>Organizational & Talent Implication</span>
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              {currentTopic.avg_rating < 3.2 
                ? "This topic operates as a notable organizational friction signal in this dataset. It suggests an area for operational attention, such as auditing frontline supervisory coaching, scheduling practices, or wage equity."
                : "This topic reflects a strong positive workforce signal. Supportive team collaboration and collegial workplace culture are consistently associated with higher employee sentiment across organizations."}
            </p>
          </div>
        </div>

        {/* Representative Quotes */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span>Sample Review Signals in this Topic</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topicReviews.slice(0, 4).map((rev, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-white">{rev.employerName}</span>
                  <span className="font-mono text-amber-400 font-bold">{rev.ratingOverall} ⭐</span>
                </div>
                {rev.summary && <div className="italic text-slate-200 leading-snug">"{rev.summary}"</div>}
                <div className="text-slate-300 text-xs sm:text-sm space-y-1.5 leading-relaxed">
                  <div><strong className="text-emerald-400 font-semibold">Pros:</strong> {rev.pros}</div>
                  <div><strong className="text-rose-400 font-semibold">Cons:</strong> {rev.cons}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
