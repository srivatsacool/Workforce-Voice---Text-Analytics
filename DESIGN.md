# 🎨 Workforce Intelligence Design System: Multi-World Architecture

> **Durable visual design system built according to Impeccable principles. Defines the visual identity, tokens, component grammar, multi-world architecture, and craft floor for the Workforce Voice & Text Analytics web application.**

---

## 1. Visual World Philosophy: Dynamic 3-World Intelligence
This interface rejects generic "AI-generated" dashboard cliches (purple-magenta neon soup, purposeless glassmorphic blur, low-density card padding, generic corporate stock illustration).

Instead of forcing a single uniform appearance, the web application features a **dynamic 3-world architectural theme system** that can be toggled in real-time across all 8 application pages:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      DYNAMIC 3-WORLD SYSTEM                            │
├────────────────────┬─────────────────────────────┬─────────────────────┤
│ 📜 WORLD 01        │ ⚡ WORLD 02                 │ 🧬 WORLD 03         │
│ Editorial Gazette  │ Cybernetic Matrix           │ Biomorphic Canvas   │
│ Financial Times /  │ NASA Flight Control /       │ Neural Acoustics /  │
│ Bloomberg Briefing │ Operations Telemetry Deck   │ Bioluminescent Wave │
└────────────────────┴─────────────────────────────┴─────────────────────┘
```

---

## 2. World Specifications & Tokens

### World 01: The Editorial Intelligence Gazette
* **Aesthetic Anchor**: *Financial Times Lex Column*, *The Economist Briefing*, *Palantir Intelligence Memo*.
* **Audience**: Executive Boardrooms, C-Suite quarterly briefs, policy whitepapers.
* **Palette**:
  * Ground: `#F8F6F0` (Alabaster Parchment) in light mode; `#0E131C` (Midnight Charcoal Ink) in dark mode.
  * Primary Accent: `#E03131` (Vermillion Alert)
  * Secondary Accent: `#D97706` (Burnished Gold / Copper)
  * Anchor Signal: `#2B8A3E` (British Racing Green)
* **Typography**:
  * Display / Headings: `Newsreader`, `Georgia`, serif (`font-editorial`)
  * Data / Metrics: `JetBrains Mono` (tabular numbers)
  * Explanatory Body: `Inter` (clean Swiss body)
* **Card Craft**: Razor-sharp `border-slate-800/20`, minimal 0.375rem corner radius, crisp hairline dividers, newsprint margins.

---

### World 02: Cybernetic Deep Slate Operations Matrix
* **Aesthetic Anchor**: *NASA Flight Operations Control*, *Bloomberg Terminal 2.0*, *Tactical Operations Center*.
* **Audience**: Shift operations managers, workforce scheduling directors, real-time monitoring leads.
* **Palette**:
  * Ground: `#0B0F19` (Deep Titanium Slate / Obsidian)
  * Primary Accent: `#38BDF8` (Electric Laser Cyan)
  * Friction Alert: `#F59E0B` (Phosphor Amber Caution)
  * Status Signal: `#10B981` (Telemetry Emerald)
* **Typography**:
  * Display / Headings: `Space Grotesk`, `Plus Jakarta Sans` (`font-cybernetic`)
  * Data / Metrics: `JetBrains Mono` (telemetry monospace)
  * Explanatory Body: `Inter` (high-density data matrix)
* **Card Craft**: High-density 0.625rem radius, cyan phosphor borders (`border-cyan-500/25`), subtle ambient glows (`glow-cyan`), technical crosshairs, and live telemetry badges.

---

### World 03: Biomorphic Neural Voice Canvas
* **Aesthetic Anchor**: *Acoustic Sound Physics*, *Neural Lattice Cartography*, *Bioluminescent Deep Ocean*.
* **Audience**: People Analytics leads, qualitative voice deep-dives, empathy diagnostics, retention strategists.
* **Palette**:
  * Ground: `#050B14` (Abyssal Midnight Blue)
  * Primary Accent: `#00F2FE` (Bioluminescent Cyan)
  * Emotion Pulse: `#7928CA` (Ultraviolet Resonance)
  * Valence Accent: `#F43F5E` (Warm Rose Resonance)
* **Typography**:
  * Display / Headings: `Plus Jakarta Sans` (`font-biomorphic`)
  * Data / Metrics: `JetBrains Mono` (technical harmonic)
  * Explanatory Body: `Inter` (empathetic narrative sans)
* **Card Craft**: Fluid 1.125rem radius, frosted glassmorphism (`backdrop-blur-md`), dual-layer cyan/violet edge refraction glow, soundwave gradients.

---

## 3. Real-Time Switcher & CSS Variables Architecture

The design system implements a global context (`WorldProvider` in `src/context/WorldContext.jsx` and `src/context/worldTheme.js`):
1. **Attribute Binding**: Sets `[data-world="editorial" | "cybernetic" | "biomorphic"]` directly on `document.documentElement` and the main App root container.
2. **Persistence**: Saves user choice in `localStorage.getItem('wi_active_world')` defaulting to `'cybernetic'`.
3. **CSS Class Mapping**:
   * `.world-card`: Automatically adapts border radius, surface color, backdrop blur, border color, and shadow based on the active `[data-world]`.
   * `.font-heading`: Dynamically inherits Newsreader serif in Editorial mode, Space Grotesk in Cybernetic mode, and Plus Jakarta Sans in Biomorphic mode.
4. **Dynamic Chart Theming**:
   * Charts consume `activeWorld.chartPalette` and `activeWorld.accentColor` dynamically, recoloring Recharts pies, bars, and breakdowns in real-time.
5. **Navbar Controls**:
   * Segmented pill toggle located directly in the header and mobile drawer for instant 1-click world switching across all 8 pages.

---

## 4. Component Anatomy & Craft Floor

### A. Metric & KPI Stat Cards
* **Container**: `p-4 rounded-xl world-card`
* **Hierarchy**:
  1. Header kicker: tiny uppercase mono label (`text-[10px] font-mono text-slate-400`)
  2. Large primary value: bold tabular display (`text-2xl font-extrabold font-heading`)
  3. Context subtext: operational nuance (`text-[10px] text-slate-400 mt-0.5`)

### B. Signal Divergence Callouts
* Highlighting the critical disconnect between 5-star ratings and negative text or 1-star ratings and positive text.
* Dual-tone pill indicator with explicit percentage ratios and qualitative text quotes.

### C. Imagery Integration
* 9 Nano Banana generative assets embedded across both the web application and `README.md`:
  - `workforce_hero_visual.jpg`: Command center & neural acoustic lattice.
  - `signal_divergence_matrix.jpg`: Rating vs. text divergence holographic prism.
  - `topic_clusters_visual.jpg`: Six latent LDA topic clusters landscape.
  - `world_editorial_intelligence.jpg` & `editorial_briefing_matrix.jpg`: World 1 Mockup Pair.
  - `world_cybernetic_operations.jpg` & `cybernetic_telemetry_radar.jpg`: World 2 Mockup Pair.
  - `world_biomorphic_voice.jpg` & `biomorphic_sentiment_sphere.jpg`: World 3 Mockup Pair.

### D. Governance & Limitations Protocol
* Any temporal or sampling constraint is flagged with the amber friction warning pill (`bg-amber-500/10 border-amber-500/30 text-amber-400`).
* No ungrounded statistical claims.
