# 🏛️ Workforce Intelligence Design System — MASTER TOKENS

> **Single Source of Truth for Visual & Interaction Tokens**  
> **Archetype**: Palantir Foundry × Stripe Press × Bloomberg Intelligence

---

## 1. Typography Hierarchy (No Micro-Fonts)

| Token Name | Font Size | Line Height | Tracking | Intended Usage |
|---|---|---|---|---|
| `font-display-hero` | 3.75rem – 5.5rem (60px–88px) | 1.05 | -0.03em | Landing page hero title |
| `font-display-h1` | 2.25rem – 3rem (36px–48px) | 1.15 | -0.025em | Page H1 headings |
| `font-display-h2` | 1.5rem – 1.875rem (24px–30px) | 1.25 | -0.02em | Section titles, feature headers |
| `font-display-h3` | 1.125rem – 1.25rem (18px–20px) | 1.35 | -0.015em | Card headers, modal titles |
| `font-metric-xl` | 2.5rem – 3rem (40px–48px) | 1.0 | -0.02em | Primary KPI card numbers |
| `font-metric-lg` | 1.75rem – 2.25rem (28px–36px) | 1.1 | -0.02em | Secondary stats, sub-metrics |
| `font-body-base` | 1.0rem (16px) | 1.625 (26px) | -0.005em | Narrative paragraphs, executive insights |
| `font-body-sm` | 0.875rem (14px) | 1.5 (21px) | normal | Form controls, helper text, table content |
| `font-kicker` | 0.75rem (12px) | 1.0 | +0.05em | Uppercase category kickers, telemetry tags |

---

## 2. Spacing & Spatial Geometry

- **Base Spacing Grid**: 8px / 16px / 24px / 32px / 48px
- **Card Padding**:
  - Compact Cards: `p-5` (20px)
  - Standard Cards: `p-6` (24px)
  - Hero & Spotlight Cards: `p-8` (32px)
- **Grid Distributions**:
  - KPI Stat Grid: 3 columns (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`)
  - Feature Matrix: 2 or 3 columns (`grid-cols-1 lg:grid-cols-3 gap-6`)
  - Section Vertical Rhythm: `space-y-10` to `space-y-14`

---

## 3. World Color Palettes

### World 01: Editorial Gazette
- **Ground (Dark)**: `#0E131C` (Midnight Charcoal Ink)
- **Ground (Light)**: `#F8F6F0` (Alabaster Parchment)
- **Primary Accent**: `#E03131` (Vermillion Alert)
- **Secondary Accent**: `#D97706` (Burnished Gold)
- **Anchor Signal**: `#2B8A3E` (British Racing Green)
- **Surface**: `#151C28`
- **Border**: `rgba(148, 163, 184, 0.18)`

### World 02: Cybernetic Matrix
- **Ground**: `#0B0F19` (Obsidian Titanium)
- **Primary Accent**: `#38BDF8` (Electric Laser Cyan)
- **Secondary Accent**: `#F59E0B` (Amber Friction Alert)
- **Anchor Signal**: `#10B981` (Telemetry Emerald)
- **Surface**: `rgba(17, 24, 39, 0.88)`
- **Border**: `rgba(56, 189, 248, 0.22)`

### World 03: Biomorphic Canvas
- **Ground**: `#050B14` (Abyssal Midnight Blue)
- **Primary Accent**: `#00F2FE` (Bioluminescent Cyan)
- **Secondary Accent**: `#7928CA` (Ultraviolet Resonance)
- **Anchor Signal**: `#F43F5E` (Warm Rose Resonance)
- **Surface**: `rgba(11, 21, 40, 0.75)`
- **Border**: `rgba(0, 242, 254, 0.25)`

---

## 4. Motion & Tactile Tokens

- **Fast Transition**: `150ms cubic-bezier(0.16, 1, 0.3, 1)` (buttons, pills, dropdowns)
- **Card Lift Transition**: `200ms cubic-bezier(0.16, 1, 0.3, 1)` (hover state, subtle border illumination)
- **Elevation Lift**: `transform: translateY(-2px)`
- **Forbidden Motions**:
  - No bouncy spring overshoot (`damping < 15`)
  - No unprompted continuous looping animations (except tiny pulse indicator dot)
  - No slow transitions (`> 300ms`) on layout elements
- **Accessibility**:
  - `@media (prefers-reduced-motion: reduce)`: `animation: none; transition: none; transform: none;`
