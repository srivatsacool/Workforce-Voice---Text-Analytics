import React from 'react';
import { 
  Lightbulb, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Sliders, 
  Building 
} from 'lucide-react';

export default function InsightsPage() {
  const insights = [
    {
      id: 1,
      badge: 'Signal 01 • Supervisory Friction',
      badgeColor: '#EF4444',
      title: 'The Frontline Management Quality Asymmetry',
      observation: 'Reviews centered on Management Quality & Internal Communication have the lowest overall star rating (2.7 stars) and the highest negative sentiment concentration (38.2%). Furthermore, terms such as "poor", "terrible", "toxic", "management", and "lack" are the strongest negative predictive coefficients in our trained classifier.',
      implication: 'Frontline supervisory competence is the primary driver of acute workplace dissatisfaction. While enterprise benefits and perks attract applicants, local management failures dictate whether employees feel supported or alienated.',
      caution: 'Reviewers often direct grievances toward immediate managers for systemic corporate constraints (such as understaffing or strict attendance software) that local supervisors cannot unilaterally control.'
    },
    {
      id: 2,
      badge: 'Signal 02 • Voice vs. Metrics',
      badgeColor: '#F59E0B',
      title: 'The "Divergent Voice" Phenomenon',
      observation: '38.4% of 1-star reviews contain net-positive textual language, and 8.2% of 5-star reviews contain net-negative textual commentary. Numerical star ratings exhibit significant divergence from textual emotional expression.',
      implication: 'People Analytics teams that rely solely on numerical eNPS or star ratings miss critical operational warnings. High ratings often mask brewing burnout, while low ratings often preserve genuine appreciation for peer camaraderie.',
      caution: 'Rule-based sentiment models can misclassify polite or resigned phrasing as positive valence. Text analysis must be triangulated with qualitative focus groups.'
    },
    {
      id: 3,
      badge: 'Signal 03 • Sector Archetypes',
      badgeColor: '#3B82F6',
      title: 'Industry Archetypes Experience Divergent Friction',
      observation: 'Retail and hourly service organizations (e.g. Walmart, McDonald\'s) over-index on Compensation (Topic 0) and Shift Scheduling (Topic 2), accounting for >45% of reviews. In contrast, Technology organizations (e.g. Google, Apple) over-index on Operational Pace, Restructuring, and Layoffs (Topic 5), accounting for >35% of reviews.',
      implication: 'One-size-fits-all talent strategies fail. Frontline retention requires schedule predictability, wage equity, and safe staffing. Professional retention requires strategic clarity, transparent executive communication during shifts, and career pathing.',
      caution: 'Scraped employer review samples (~100 per company) provide a cross-sectional thematic fingerprint rather than an exhaustive census of total enterprise headcount.'
    },
    {
      id: 4,
      badge: 'Signal 04 • Resilient Retention Anchor',
      badgeColor: '#10B981',
      title: 'Workplace Culture & Camaraderie as an Enduring Asset',
      observation: 'Topic 1 (Culture & Camaraderie) achieves the highest average rating (4.01 stars) and the highest positive sentiment share (91.4%) across all discovered workforce themes. Peer support and team collegiality are the most consistently praised workplace assets across all 90 employers.',
      implication: 'Peer relationships and collegial psychological safety serve as the primary emotional anchor keeping employees engaged during periods of compensation or leadership friction. Protecting team rituals and psychological safety directly stabilizes workforce morale.',
      caution: 'Strong camaraderie can coexist with operational inefficiency or burnout. High team morale should not be misinterpreted as operational perfection.'
    }
  ];

  const priorityMatrix = [
    {
      priority: 'P1: Immediate Operational Attention',
      theme: 'First-Line Supervisory Quality & Coaching',
      indicator: 'Management topic accounts for 38% negative sentiment share.',
      action: 'Implement mandatory supervisory coaching, skip-level check-ins, and feedback loops.',
      risk: 'High Attrition Risk in Vulnerable Units'
    },
    {
      priority: 'P2: High-Leverage Frontline Anchor',
      theme: 'Shift Predictability & Schedule Control',
      indicator: 'Scheduling is the #2 grievance in hourly retail/food workforces.',
      action: 'Enforce minimum 14-day advance notice on shift schedules; review scheduling software parameters.',
      risk: 'Unscheduled Absenteeism & Churn'
    },
    {
      priority: 'P3: Strategic Culture Protection',
      theme: 'Peer Camaraderie & Team Culture',
      indicator: '91.4% positive sentiment across all 90 covered organizations.',
      action: 'Protect team collaboration rituals; recognize peer mentorship and community anchors.',
      risk: 'Cultural Erosion During Remote/Hybrid Friction'
    },
    {
      priority: 'P4: Strategic Communication',
      theme: 'Restructuring Transparency & Pace',
      indicator: 'Tech sector reviews heavily emphasize restructuring anxiety and layoff shifts.',
      action: 'Increase executive town hall candor and provide transparent roadmaps during organizational shifts.',
      risk: 'Loss of Institutional Knowledge & Paralyzed Execution'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>DECISION-READY WORKFORCE SIGNALS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
          Executive Workforce Insights
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Synthesized strategic intelligence from 8,785 employee reviews. Every insight adheres strictly to our governance framework: Observation → Implication → Caution.
        </p>
      </div>

      {/* 4 Deep Insights */}
      <div className="space-y-6">
        {insights.map((ins) => (
          <div 
            key={ins.id}
            className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span 
                className="text-xs font-mono font-bold px-2.5 py-0.5 rounded"
                style={{ backgroundColor: `${ins.badgeColor}15`, color: ins.badgeColor }}
              >
                {ins.badge}
              </span>
            </div>

            <h2 className="text-lg font-bold text-white font-heading">
              {ins.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
              
              {/* Observation */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                <div className="text-[11px] font-mono uppercase font-bold text-blue-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>OBSERVATION (DATA)</span>
                </div>
                <p className="text-slate-300">
                  {ins.observation}
                </p>
              </div>

              {/* Implication */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                <div className="text-[11px] font-mono uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>IMPLICATION (STRATEGY)</span>
                </div>
                <p className="text-slate-300">
                  {ins.implication}
                </p>
              </div>

              {/* Caution */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                <div className="text-[11px] font-mono uppercase font-bold text-amber-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>CAUTION (LIMITATION)</span>
                </div>
                <p className="text-slate-300">
                  {ins.caution}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Strategic Priority Action Matrix */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div>
          <h2 className="text-base font-bold text-white font-heading">
            Executive Action Matrix: Targeted Areas for Investigation
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Prioritizing talent interventions based on observed workforce friction and retention impact.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[11px] uppercase font-mono bg-slate-950/80 text-slate-400">
              <tr>
                <th className="py-2.5 px-3">Priority Level</th>
                <th className="py-2.5 px-3">Thematic Focus</th>
                <th className="py-2.5 px-3">Observed Signal</th>
                <th className="py-2.5 px-3">Recommended Operational Action</th>
                <th className="py-2.5 px-3">Associated Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-[11px]">
              {priorityMatrix.map((item, i) => (
                <tr key={i} className="hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-semibold text-slate-200">{item.priority}</td>
                  <td className="py-3 px-3 text-blue-400 font-medium">{item.theme}</td>
                  <td className="py-3 px-3 text-slate-400">{item.indicator}</td>
                  <td className="py-3 px-3 text-slate-300">{item.action}</td>
                  <td className="py-3 px-3 text-rose-400 font-mono">{item.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
