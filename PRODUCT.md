# 🏢 Workforce Voice & Text Analytics: Product Truth & Context

## 1. Product Identity & Core Mission
**Workforce Voice & Text Analytics** is an operations intelligence and executive workforce diagnostics platform that transforms raw, unsolicited employee text narratives into decision-ready workforce signals and identifies recurring organizational themes and operational friction areas across top US employers.

## 2. Core Problem & Unique Mechanism
* **The Problem**: Traditional internal engagement surveys suffer from severe survey fatigue, low honest participation, and social desirability bias. Furthermore, high-level star ratings (1–5) obscure acute operational breakdowns.
* **The Mechanism (Divergent Voice Discovery)**:
  1. **Decoupling Rating from Text**: Analyzes the statistical divergence between scalar star scores and underlying sentiment intensity (VADER + Supervised Logistic Regression).
  2. **Isolating Friction from Loyalty**: Distinguishes between interpersonal camaraderie ("collegial buffering") and institutional friction (shift scheduling rigidity, compensation discrepancies, frontline supervisory breakdown).
  3. **Latent Thematic Unsupervised Discovery**: Categorizes unstructured narratives into 6 distinct organizational domains via Latent Dirichlet Allocation (LDA):
     - Topic 1: Compensation & Benefits
     - Topic 2: Shift Operations & Scheduling
     - Topic 3: Frontline Supervision & Leadership
     - Topic 4: Team Culture & Peer Camaraderie
     - Topic 5: Career Mobility & Training Pathways
     - Topic 6: Work-Life Balance & Fatigue
  4. **Triangulation Principle**: Treats public review data as *analytical signals* requiring operational triangulation with HRIS and internal retention data—never as unverified causal truth.

## 3. Primary Personas & Jobs-to-be-Done
* **Chief People & Operations Officers (CHRO / COO)**:
  - *Need*: Quick, unvarnished visibility into cross-company cultural health and systemic friction hotspots before turnover spikes.
  - *Action*: Compare firm metrics against industry benchmarks and review divergence matrices.
* **Workforce Intelligence & People Analytics Leads**:
  - *Need*: Methodological rigor, reproducible NLP pipelines, model evaluation metrics, and exportable datasets.
  - *Action*: Inspect classification confusion matrices (82.4% accuracy, 79.8% negative recall), topic distributions, and keyword weights.
* **Frontline Operations Managers**:
  - *Need*: Granular understanding of shift scheduling friction, supervisory communication bottlenecks, and workload fatigue patterns.

## 4. Voice, Tone & Analytical Governance
* **Tone**: Authoritative, analytical, objective, and intellectually honest.
* **Language Rules**:
  - Use "Workforce Signals", "Operational Friction", and "Thematic Clustering".
  - Never claim reviews "prove" management incompetence or "directly measure productivity".
  - Explicitly acknowledge sampling limitations: **96.9% of reviews are concentrated in the 2026 collection cycle**, making this a contemporary cross-sectional snapshot rather than a multi-decade longitudinal census.

## 5. Decision Framework
Every insight card and strategic finding must adhere to the 4-tier decision protocol:
$$\text{Observation} \longrightarrow \text{Interpretation} \longrightarrow \text{Implication} \longrightarrow \text{Caution / Limitation}$$
