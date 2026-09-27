import React, { useState } from 'react';
import { 
  Sparkles, 
  Palette, 
  Check, 
  Compass, 
  ShieldCheck, 
  Sliders, 
  ArrowRight,
  Maximize2,
  X
} from 'lucide-react';
import { useWorldTheme } from '../context/worldTheme';

import worldEditorialUi from '../assets/world_editorial_intelligence.jpg';
import editorialBriefingMatrix from '../assets/editorial_briefing_matrix.jpg';
import worldCyberneticUi from '../assets/world_cybernetic_operations.jpg';
import cyberneticTelemetryRadar from '../assets/cybernetic_telemetry_radar.jpg';
import worldBiomorphicUi from '../assets/world_biomorphic_voice.jpg';
import biomorphicSentimentSphere from '../assets/biomorphic_sentiment_sphere.jpg';

export default function WorldStudioPage({ setActiveTab }) {
  const { world, setWorld } = useWorldTheme();
  const [modalImage, setModalImage] = useState(null);

  const worlds = {
    editorial: {
      id: 'editorial',
      code: '01',
      title: 'The Editorial Intelligence Gazette',
      subtitle: 'Elite Financial Times & Bloomberg Whitepaper Aesthetic',
      anchor: 'Financial Times Lex Column • The Economist Briefing • Palantir Intelligence Memo',
      colorStrategy: 'Committed High-Contrast Alabaster & Deep Ink',
      ground: '#F8F6F0 (Warm Alabaster)',
      primaryText: '#0F141C (Deep Charcoal Ink)',
      accentSignal: '#E03131 (Vermillion Red)',
      anchorSignal: '#2B8A3E (British Racing Green)',
      fontDisplay: 'Newsreader / Playfair (Editorial Serif)',
      fontData: 'JetBrains Mono (Tabular Data)',
      fontBody: 'Inter (Clean Swiss Body)',
      antiSlop: 'Rejects dark-mode neon purple mush. Enforces razor-sharp 1px ruling lines, newsprint margins, dense structured analytical tables, and quotation glyph pull-quotes.',
      fullMockup: worldEditorialUi,
      detailMockup: editorialBriefingMatrix,
      fullTitle: 'Full Intelligence Briefing Webapp UI',
      detailTitle: 'Structural Distress & Friction Report Matrix',
      swatches: [
        { name: 'Parchment Ground', hex: '#F8F6F0', bg: 'bg-[#F8F6F0]', text: 'text-slate-900', border: 'border-slate-300' },
        { name: 'Midnight Charcoal', hex: '#0F141C', bg: 'bg-[#0F141C]', text: 'text-white', border: 'border-slate-800' },
        { name: 'Vermillion Alert', hex: '#E03131', bg: 'bg-[#E03131]', text: 'text-white', border: 'border-rose-400' },
        { name: 'Racing Green Anchor', hex: '#2B8A3E', bg: 'bg-[#2B8A3E]', text: 'text-white', border: 'border-emerald-400' },
        { name: 'Burnished Copper', hex: '#D97706', bg: 'bg-[#D97706]', text: 'text-white', border: 'border-amber-400' },
      ],
      idealFor: 'Executive Boardroom reviews, C-Suite quarterly briefs, policy whitepapers.'
    },
    cybernetic: {
      id: 'cybernetic',
      code: '02',
      title: 'Cybernetic Deep Slate Operations Matrix',
      subtitle: 'NASA Flight Control & High-Density Telemetry Console',
      anchor: 'NASA Mission Control • Bloomberg Terminal 2.0 • Tactical Operations Center',
      colorStrategy: 'High-Density Titanium Slate & Phosphor Telemetry',
      ground: '#0B0F19 (Deep Obsidian Slate)',
      primaryText: '#F8FAFC (Phosphor Ice White)',
      accentSignal: '#38BDF8 (Electric Laser Cyan)',
      anchorSignal: '#F59E0B (Amber Operational Caution)',
      fontDisplay: 'Space Grotesk / Plus Jakarta (Geometric Display)',
      fontData: 'JetBrains Mono (Telemetry Monospace)',
      fontBody: 'Inter (Clean Data Matrix)',
      antiSlop: 'Rejects empty SaaS marketing whitespace and low-density padding. Enforces modular telemetry compartments, live audio acoustic waveforms, hex radar charts, and real-time status beacons.',
      fullMockup: worldCyberneticUi,
      detailMockup: cyberneticTelemetryRadar,
      fullTitle: 'Operations Telemetry & Executive Control Deck',
      detailTitle: 'Workforce Operations Telemetry & Acoustic Radar Console',
      swatches: [
        { name: 'Obsidian Slate Ground', hex: '#0B0F19', bg: 'bg-[#0B0F19]', text: 'text-white', border: 'border-slate-800' },
        { name: 'Surface Carbon', hex: '#111827', bg: 'bg-[#111827]', text: 'text-white', border: 'border-slate-700' },
        { name: 'Electric Cyan Laser', hex: '#38BDF8', bg: 'bg-[#38BDF8]', text: 'text-slate-900', border: 'border-cyan-300' },
        { name: 'Amber Friction Alert', hex: '#F59E0B', bg: 'bg-[#F59E0B]', text: 'text-slate-900', border: 'border-amber-300' },
        { name: 'Emerald Telemetry', hex: '#10B981', bg: 'bg-[#10B981]', text: 'text-slate-900', border: 'border-emerald-300' },
      ],
      idealFor: 'Real-time shift management, operations directors, continuous workforce monitoring.'
    },
    biomorphic: {
      id: 'biomorphic',
      code: '03',
      title: 'Biomorphic Neural Voice Canvas',
      subtitle: 'Organic Deep Tech & Luminous Emotion Soundwaves',
      anchor: 'Acoustic Sound Physics • Neural Lattice Cartography • Bioluminescent Deep Ocean',
      colorStrategy: 'Abyssal Midnight Blue & Luminous Bioluminescence',
      ground: '#050B14 (Abyssal Midnight Blue)',
      primaryText: '#FFFFFF (Ethereal White)',
      accentSignal: '#00F2FE (Bioluminescent Cyan)',
      anchorSignal: '#7928CA (Ultraviolet Emotion Pulse)',
      fontDisplay: 'Plus Jakarta Sans (Fluid Contemporary)',
      fontData: 'JetBrains Mono (Technical Harmonic)',
      fontBody: 'Inter (Empathetic Narrative Sans)',
      antiSlop: 'Rejects cold, robotic corporate gray dashboards. Enforces fluid soundwave contours, glassmorphic frosted cards with refraction rim lighting, and human sentiment quote spotlights.',
      fullMockup: worldBiomorphicUi,
      detailMockup: biomorphicSentimentSphere,
      fullTitle: 'AURA: Executive Workforce Insights Canvas',
      detailTitle: '3D Neural Sentiment Sphere with Emotion Pulses',
      swatches: [
        { name: 'Abyssal Blue Ground', hex: '#050B14', bg: 'bg-[#050B14]', text: 'text-white', border: 'border-slate-800' },
        { name: 'Bioluminescent Cyan', hex: '#00F2FE', bg: 'bg-[#00F2FE]', text: 'text-slate-900', border: 'border-cyan-300' },
        { name: 'Ultraviolet Resonance', hex: '#7928CA', bg: 'bg-[#7928CA]', text: 'text-white', border: 'border-purple-300' },
        { name: 'Soft Sage Harmony', hex: '#10B981', bg: 'bg-[#10B981]', text: 'text-slate-900', border: 'border-emerald-300' },
        { name: 'Solar Warmth', hex: '#FBBF24', bg: 'bg-[#FBBF24]', text: 'text-slate-900', border: 'border-amber-300' },
      ],
      idealFor: 'Culture and People Analytics leads, qualitative voice deep dives, empathy diagnostics.'
    }
  };

  const current = worlds[world] || worlds.cybernetic;

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header Banner */}
      <div className="text-center max-w-4xl mx-auto px-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 text-blue-400 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>IMPECCABLE DESIGN STUDIO • NANO BANANA GENERATIVE WORLDS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight mb-4">
          Explore Candidate Visual Universes
        </h1>
        <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Three radically distinct, production-grade visual worlds crafted via the Impeccable methodology to eradicate generic AI tropes and establish an authentic aesthetic identity for workforce analytics.
        </p>
      </div>

      {/* World Selector Tabs */}
      <div className="flex justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl w-full p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          {Object.values(worlds).map((w) => {
            const isSelected = world === w.id;
            return (
              <button
                key={w.id}
                onClick={() => setWorld(w.id)}
                className={`p-3.5 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-blue-400'
                  }`}>
                    WORLD {w.code}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight font-heading leading-tight">
                    {w.title}
                  </h3>
                  <p className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {w.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active World Display Showcase */}
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        
        {/* Visual Mockups Showcase (Side by Side) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Full Mockup */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl group flex flex-col justify-between">
            <div className="p-3.5 border-b border-slate-800/80 bg-slate-900/80 flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-blue-400 uppercase tracking-wider">
                Full Application Viewport
              </span>
              <button
                onClick={() => setModalImage({ src: current.fullMockup, title: current.fullTitle })}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Zoom</span>
              </button>
            </div>
            <div 
              className="relative aspect-video overflow-hidden cursor-pointer"
              onClick={() => setModalImage({ src: current.fullMockup, title: current.fullTitle })}
            >
              <img 
                src={current.fullMockup} 
                alt={current.fullTitle} 
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="p-3 bg-slate-950 text-left">
              <h4 className="text-xs font-bold text-white font-heading">{current.fullTitle}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Macro layout, navigation topology, and primary signal hierarchy.</p>
            </div>
          </div>

          {/* Detailed Feature Mockup */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl group flex flex-col justify-between">
            <div className="p-3.5 border-b border-slate-800/80 bg-slate-900/80 flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Deep-Dive Operational Feature
              </span>
              <button
                onClick={() => setModalImage({ src: current.detailMockup, title: current.detailTitle })}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Zoom</span>
              </button>
            </div>
            <div 
              className="relative aspect-video overflow-hidden cursor-pointer"
              onClick={() => setModalImage({ src: current.detailMockup, title: current.detailTitle })}
            >
              <img 
                src={current.detailMockup} 
                alt={current.detailTitle} 
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="p-3 bg-slate-950 text-left">
              <h4 className="text-xs font-bold text-white font-heading">{current.detailTitle}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Granular matrix reporting, acoustic audio waveforms, or 3D sentiment pulses.</p>
            </div>
          </div>

        </div>

        {/* Detailed Design DNA & Token Specification */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
          
          {/* Left Column: DNA & Palette */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Aesthetic Anchor */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                <Compass className="w-4 h-4 text-blue-400" />
                <span>Cultural Anchor & Governing Metaphor</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                {current.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Cultural Ancestry:</strong> {current.anchor}
              </p>
              <div className="p-3 rounded-xl bg-slate-950 text-xs text-slate-300 border border-slate-800 leading-relaxed">
                <strong className="text-rose-400 font-mono">Anti-AI-Slop Doctrine: </strong>
                {current.antiSlop}
              </div>
            </div>

            {/* Color Strategy & Tokens */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  <Palette className="w-4 h-4 text-emerald-400" />
                  <span>Color Strategy & Semantic Tokens</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">{current.colorStrategy}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {current.swatches.map((s, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl border border-slate-800 bg-slate-950/70 text-center space-y-1.5">
                    <div className={`w-full h-8 rounded-lg ${s.bg} border ${s.border}`} />
                    <div className="text-[10px] font-semibold text-slate-300 truncate" title={s.name}>{s.name}</div>
                    <div className="text-[9px] font-mono text-slate-500">{s.hex}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Typography & Craft Floor */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Typographic System */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                <Sliders className="w-4 h-4 text-purple-400" />
                <span>Typographic Hierarchy</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-purple-400 block mb-1">DISPLAY HEADERS</span>
                  <span className="text-sm font-bold text-white font-heading">{current.fontDisplay}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-blue-400 block mb-1">DATA & METRICS</span>
                  <span className="text-sm font-bold text-white font-mono">{current.fontData}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-emerald-400 block mb-1">EXPLANATORY BODY</span>
                  <span className="text-sm font-medium text-slate-300">{current.fontBody}</span>
                </div>
              </div>
            </div>

            {/* Revamp Commitment Action */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/60 to-slate-900 border border-blue-500/30 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Strategic Revamp Fit</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Optimal Audience:</strong> {current.idealFor}
              </p>
              <button
                onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
              >
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Active Globally • Launch Dashboard View</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Image Modal Preview */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-10 right-0 p-2 text-white hover:text-slate-300 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={modalImage.src} 
              alt={modalImage.title} 
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl border border-slate-800 shadow-2xl"
            />
            <div className="text-center text-xs font-mono text-slate-400 mt-2">
              {modalImage.title} • (Click anywhere to close)
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
