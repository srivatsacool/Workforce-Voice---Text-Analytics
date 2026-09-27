import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function InsightsPage() {
  const insights = [
    {
      id: 1,
      badge: 'Signal 01 • Supervisory Friction',
      badgeColor: '#EF4444',
      title: 'The Frontline Supervisory & Communication Friction Signal',
      observation: 'In our LDA topic landscape, Topic 3 (Management Quality & Internal Communication) and Topic 5 (Operational Stress & Shifts) exhibit the lowest average ratings across all discovered themes (3.01 and 2.98 stars, respectively) and the highest negative sentiment concentrations (25.7% and 29.2%). Furthermore, terms such as "poor" (-5.09), "terrible" (-4.00), "toxic" (-3.69), and "management" (-3.07) are the strongest negative predictive coefficients in our trained classifier.',
      interpretation: 'Management Quality & Communication shows the strongest observed friction signal in the dataset. Rather than isolated complaints, supervisory and communication breakdowns form a recurring lexical pattern when employees express acute dissatisfaction.',
      implication: 'Leadership should prioritize frontline supervisory coaching, transparent two-way communication channels, and skip-level check-ins as targeted areas for operational attention.',
      caution: 'Reviewers often direct grievances toward immediate managers for systemic corporate constraints (such as understaffing, rigid attendance software, or corporate wage ceilings) that local supervisors cannot unilaterally control. This signal reflects perceived friction, not an objective audit of individual manager competence.'
    },
    {
      id: 2,
      badge: 'Signal 02 • Voice vs. Metrics',
      badgeColor: '#F59E0B',
      title: 'The Rating–Text "Divergent Voice" Phenomenon',
      observation: 'In our cross-tabulation of ratings and sentiment, 38.4% of 1-star reviews contain net-positive textual sentiment, while 8.2% of 5-star reviews contain net-negative textual sentiment. Numerical star ratings frequently diverge from textual emotional valence.',
      interpretation: 'Single-digit star ratings and aggregate eNPS scores collapse multi-dimensional employee experience into a scalar metric, obscuring critical qualitative nuance. Low-rating reviews often preserve genuine appreciation for peer camaraderie, while high ratings can conceal brewing operational burnout.',
      implication: 'People Analytics teams must not rely solely on numerical survey scores. Integrating NLP-driven text mining with structured metrics reveals hidden friction and constructive dissent that standard scorecards miss.',
      caution: 'Rule-based sentiment models (like VADER) can misclassify polite or resigned framing as positive valence. Textual signals should be triangulated with qualitative focus groups and internal feedback channels.'
    },
    {
      id: 3,
      badge: 'Signal 03 • Sector Archetypes',
      badgeColor: '#3B82F6',
      title: 'Industry Archetypes Exhibit Distinct Friction Profiles',
      observation: 'Retail and hourly service organizations (e.g., Walmart, McDonald\'s) over-index on Compensation (Topic 0) and Shift Scheduling (Topic 2), accounting for over 45% of thematic volume. Conversely, Technology and professional organizations (e.g., Google, Apple, Microsoft) over-index on Operational Stress & Organizational Shifts (Topic 5) and Career Development (Topic 4).',
      interpretation: 'Different organizational archetypes face structurally distinct workforce pressures. Frontline hourly workforces experience friction around physical scheduling and wage dynamics, whereas knowledge-work workforces experience friction around organizational restructuring, workload pacing, and career velocity.',
      implication: 'Operational interventions cannot be monolithic. Frontline workforce initiatives should focus on schedule predictability and safe staffing ratios; professional workforce initiatives should prioritize executive transparency during restructuring and clear advancement pathways.',
      caution: 'Scraped employer review samples (~100 reviews per company) provide a cross-sectional thematic profile rather than an exhaustive enterprise-wide workforce census. Differences reflect dominant topics within submitted reviews, not absolute headcount proportions.'
    },
    {
      id: 4,
      badge: 'Signal 04 • Resilient Positive Signal',
      badgeColor: '#10B981',
      title: 'Workplace Culture & Camaraderie as a Resilient Positive Signal',
      observation: 'Topic 1 (Workplace Culture & Camaraderie) and Topic 4 (Career Growth & Learning) exhibit the highest average ratings (3.94 and 3.74 stars) and the highest positive sentiment shares (84.6% and 86.9%) in the dataset. Pros text across all 90 employers shows a mean compound sentiment of +0.65, dominated by terms like "friendly", "supportive", and "team".',
      interpretation: 'Workplace Culture & Camaraderie shows the strongest positive workforce signal in this dataset, suggesting an area for further organizational investigation. Supportive peer relationships and collaborative team dynamics are consistently associated with higher employee sentiment across diverse sectors.',
      implication: 'Protecting supportive team collaboration, onboarding rituals, and peer recognition networks serves as an essential organizational anchor, especially during operational restructuring or compensation friction.',
      caution: 'Strong peer camaraderie can coexist with operational inefficiency, intense workload stress, or low compensation. High peer sentiment should not be interpreted as evidence of operational perfection or proof that turnover will not occur.'
    }
  ];

  const priorityMatrix = [
    {
      priority: 'P1: Immediate Operational Attention',
      theme: 'First-Line Supervisory Quality & Coaching',
      indicator: 'Management & Operational Stress topics show lowest ratings (~3.0⭐) and highest negative sentiment (~26-29%).',
      action: 'Implement targeted supervisory coaching, skip-level check-ins, and feedback loops.',
      risk: 'Workforce Friction in Operationally Strained Units'
    },
    {
      priority: 'P2: High-Leverage Frontline Anchor',
      theme: 'Shift Predictability & Schedule Control',
      indicator: 'Scheduling is the primary grievance topic in hourly retail and food service workforces.',
      action: 'Evaluate advance scheduling notice practices and review automated shift allocation parameters.',
      risk: 'Unscheduled Absenteeism & Scheduling Churn'
    },
    {
      priority: 'P3: Strategic Culture Protection',
      theme: 'Peer Camaraderie & Team Culture',
      indicator: '84.6% positive sentiment in Topic 1 across all 90 covered organizations.',
      action: 'Protect collaborative team rituals and recognize peer mentorship and community anchors.',
      risk: 'Cultural Dilution During Rapid Scale or Remote Restructuring'
    },
    {
      priority: 'P4: Strategic Communication',
      theme: 'Restructuring Transparency & Pace',
      indicator: 'Knowledge-work reviews heavily reflect restructuring anxiety and organizational shifts.',
      action: 'Increase executive town hall candor and provide clear strategic roadmaps during operational transitions.',
      risk: 'Loss of Institutional Momentum & Organizational Uncertainty'
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
          Synthesized strategic intelligence from 8,785 employee reviews. Every insight adheres strictly to our 4-part governance framework: Observation → Interpretation → Implication → Caution.
        </p>
      </div>

      {/* 4 Deep Insights */}
      <div className="space-y-6">
        {insights.map((ins) => (
          <div 
            key={ins.id}
            className="p-6 rounded-2xl world-card space-y-4"
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs leading-relaxed">
              
              {/* Observation */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono uppercase font-bold text-blue-400 flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>1. OBSERVATION (DATA)</span>
                  </div>
                  <p className="text-slate-300">
                    {ins.observation}
                  </p>
                </div>
              </div>

              {/* Interpretation */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono uppercase font-bold text-indigo-400 flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>2. INTERPRETATION (SIGNAL)</span>
                  </div>
                  <p className="text-slate-300">
                    {ins.interpretation}
                  </p>
                </div>
              </div>

              {/* Implication */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono uppercase font-bold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>3. IMPLICATION (ATTENTION)</span>
                  </div>
                  <p className="text-slate-300">
                    {ins.implication}
                  </p>
                </div>
              </div>

              {/* Caution */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono uppercase font-bold text-amber-400 flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>4. CAUTION (BOUNDARIES)</span>
                  </div>
                  <p className="text-slate-300">
                    {ins.caution}
                  </p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Strategic Priority Action Matrix */}
      <div className="p-6 rounded-2xl world-card space-y-4">
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
