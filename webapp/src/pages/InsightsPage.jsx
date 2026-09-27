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
    <div className="space-y-8 sm:space-y-10 pb-16">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>DECISION-READY WORKFORCE SIGNALS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
          Executive Workforce Insights
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-4xl leading-relaxed">
          Synthesized strategic intelligence from 8,785 employee reviews. Every insight adheres strictly to our 4-part governance framework: Observation → Interpretation → Implication → Caution.
        </p>
      </div>

      {/* 4 Deep Insights */}
      <div className="space-y-8">
        {insights.map((ins) => (
          <div 
            key={ins.id}
            className="p-6 sm:p-8 rounded-3xl world-card space-y-6"
          >
            <div className="flex items-center justify-between">
              <span 
                className="text-xs font-mono font-bold px-3 py-1 rounded-md"
                style={{ backgroundColor: `${ins.badgeColor}15`, color: ins.badgeColor }}
              >
                {ins.badge}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading tracking-tight">
              {ins.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 leading-relaxed">
              
              {/* Observation */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase font-bold text-blue-400 flex items-center gap-2 mb-2 tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>1. OBSERVATION (DATA)</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {ins.observation}
                  </p>
                </div>
              </div>

              {/* Interpretation */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase font-bold text-indigo-400 flex items-center gap-2 mb-2 tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span>2. INTERPRETATION (SIGNAL)</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {ins.interpretation}
                  </p>
                </div>
              </div>

              {/* Implication */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase font-bold text-emerald-400 flex items-center gap-2 mb-2 tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>3. IMPLICATION (ATTENTION)</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {ins.implication}
                  </p>
                </div>
              </div>

              {/* Caution */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase font-bold text-amber-400 flex items-center gap-2 mb-2 tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>4. CAUTION (BOUNDARIES)</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {ins.caution}
                  </p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Strategic Priority Action Matrix */}
      <div className="p-6 sm:p-8 rounded-3xl world-card space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
            Executive Action Matrix: Targeted Areas for Investigation
          </h2>
          <p className="text-sm text-slate-400 mt-1.5">
            Prioritizing talent interventions based on observed workforce friction and retention impact.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800/90">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs uppercase font-mono bg-slate-950 text-slate-400 tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Priority Level</th>
                <th className="py-3.5 px-4 font-semibold">Thematic Focus</th>
                <th className="py-3.5 px-4 font-semibold">Observed Signal</th>
                <th className="py-3.5 px-4 font-semibold">Recommended Operational Action</th>
                <th className="py-3.5 px-4 font-semibold">Associated Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-sm">
              {priorityMatrix.map((item, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-100 whitespace-nowrap">{item.priority}</td>
                  <td className="py-4 px-4 text-blue-400 font-semibold">{item.theme}</td>
                  <td className="py-4 px-4 text-slate-300 leading-relaxed">{item.indicator}</td>
                  <td className="py-4 px-4 text-slate-200 leading-relaxed">{item.action}</td>
                  <td className="py-4 px-4 text-rose-400 font-mono text-xs font-semibold">{item.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
