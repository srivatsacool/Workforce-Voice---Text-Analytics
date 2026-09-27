# 🎨 Workforce Intelligence Design System: "Executive Signal Intelligence"

> **Durable visual design system built according to Impeccable principles. Defines the visual identity, tokens, component grammar, and craft floor for the Workforce Voice & Text Analytics web application.**

---

## 1. Visual World Thesis: "Executive Signal Intelligence"
This interface rejects generic "AI-generated" dashboard cliches (purple-magenta neon soup, purposeless glassmorphic blur, low-density card padding, generic corporate stock illustration).

Instead, it inhabits the visual world of an **operations intelligence command center and high-resolution decision console**:
* **Rigor over fluff**: High data density, crisp geometric alignment, and explicit mathematical notations.
* **Semantic chromatic fidelity**: Color is used strictly to signal meaning, divergence, and friction levels—never as decorative wallpaper.
* **Tactile and responsive**: Fine hairline borders (`border-slate-800/80`), subtle ambient glow, tabular numeric font alignments, and responsive cross-filtering.

---

## 2. Color Strategy & Semantic Palette

### Palette Classification: **Committed Precision Palette**

| Token Role | Hex Code | Visual Meaning & Usage |
|---|---|---|
| **Canvas Deep (Dark)** | `#090D16` | Main background, obsidian slate providing deep contrast |
| **Surface Dark** | `#0F172A` | Card backgrounds, elevated panels, modal backgrounds |
| **Surface Elevated** | `#1E293B` | Interactive elements, dropdown menus, table headers |
| **Hairline Border** | `#334155` | 1px subtle boundary defining spatial compartments |
| **Primary Signal** | `#3B82F6` | Primary action, active tabs, verified analytics badges |
| **Data Stream (Cyan)** | `#06B6D4` | Topic vectors, pipeline flows, neutral/NLP tokens |
| **Friction / Alert (Amber)** | `#F59E0B` | Operational friction, scheduling complaints, temporal caution |
| **Negative Sentiment (Crimson)** | `#EF4444` | Negative sentiment valence, supervisory breakdown |
| **Positive Sentiment (Emerald)** | `#10B981` | Positive text valence, collegial culture, retention anchor |
| **Text Primary (Dark)** | `#F8FAFC` | Main headings, critical KPIs, high-contrast labels |
| **Text Secondary (Dark)** | `#94A3B8` | Subtitles, descriptions, contextual operational framing |
| **Canvas Clean (Light)** | `#F8FAFC` | Light mode background |
| **Surface Clean (Light)** | `#FFFFFF` | Light mode card surfaces |

---

## 3. Typography & Hierarchy System

* **Display & Primary Headings**: `Plus Jakarta Sans` (weights: 700, 800)
  - Uppercase tracked tracking: `tracking-tight` or `tracking-widest` for section kickers.
  - Sizing: `text-4xl` to `text-6xl` for hero, `text-2xl` for page headers, `text-base` for card titles.
* **Body & Explanatory Prose**: `Inter` (weights: 400, 500, 600)
  - Clear line height (`leading-relaxed`), optimal line measure (max 65–75 characters for readability).
* **Metrics, Tokens & Analytical Values**: `JetBrains Mono` (weights: 500, 700)
  - Used for sample sizes, percentages, model accuracies, topic IDs, and date timestamps.
  - Tabular numbers enabled (`font-mono tracking-tight`) to ensure clean vertical alignment across tables and metric grids.

---

## 4. Component Anatomy & Craft Floor

### A. Metric & KPI Stat Cards
* **Container**: `bg-slate-900/60 dark:bg-slate-900/60 bg-white border border-slate-800/80 rounded-xl p-4 transition-all duration-200 hover:border-blue-500/30`
* **Hierarchy**:
  1. Header kicker: tiny uppercase mono label (`text-[10px] font-mono text-slate-400`)
  2. Large primary value: bold tabular display (`text-3xl font-extrabold text-white font-heading`)
  3. Context subtext: operational nuance (`text-xs text-slate-400 mt-1`)

### B. Signal Divergence Callouts
* Highlighting the critical disconnect between 5-star ratings and negative text or 1-star ratings and positive text.
* Dual-tone pill indicator with explicit percentage ratios and qualitative text quotes.

### C. Imagery Integration
* Thematic assets generated with Nano Banana are integrated with subtle gradient vignettes (`to-transparent` overlays) so they integrate naturally into the interface instead of feeling like floating detached thumbnails.

### D. Governance & Limitations Protocol
* Any temporal or sampling constraint is flagged with the amber friction warning pill (`bg-amber-500/10 border-amber-500/30 text-amber-400`).
* No ungrounded statistical claims.

---

## 5. Micro-Interactions & Transitions
* Standard transition duration: `150ms ease-in-out` for hover states and button presses.
* Tab transitions with subtle bottom indicator slide.
* Dark / Light mode toggle persistence with instant class toggle on `document.documentElement`.
