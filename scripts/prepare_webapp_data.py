"""
Workforce Intelligence Analytics — Webapp Data Preparer
Converts exported analysis tables and summaries into structured JSON assets
for the React static web application with strict JSON (null instead of NaN).
"""

import json
from pathlib import Path
import pandas as pd
import numpy as np

ROOT_DIR = Path(__file__).resolve().parent.parent
OUTPUTS_EXP = ROOT_DIR / "outputs" / "exports"
WEBAPP_DATA = ROOT_DIR / "webapp" / "src" / "data"
WEBAPP_DATA.mkdir(parents=True, exist_ok=True)

print("Preparing strict JSON data assets for webapp...")

# 1. Copy KPI Summary
with open(OUTPUTS_EXP / "kpi_summary.json", 'r', encoding='utf-8') as f:
    kpis = json.load(f)

with open(WEBAPP_DATA / "kpis.json", 'w', encoding='utf-8') as f:
    json.dump(kpis, f, indent=2)

# 2. Company Summary
df_comp = pd.read_csv(OUTPUTS_EXP / "company_summary.csv")
# Replace NaN with None
df_comp = df_comp.replace({np.nan: None})
with open(WEBAPP_DATA / "companies.json", 'w', encoding='utf-8') as f:
    json.dump(df_comp.to_dict(orient='records'), f, indent=2)

# 3. Topic Summary
df_topics = pd.read_csv(OUTPUTS_EXP / "topic_summary.csv")
if isinstance(df_topics['top_words'].iloc[0], str):
    import ast
    df_topics['top_words'] = df_topics['top_words'].apply(ast.literal_eval)

df_topics = df_topics.replace({np.nan: None})
with open(WEBAPP_DATA / "topics.json", 'w', encoding='utf-8') as f:
    json.dump(df_topics.to_dict(orient='records'), f, indent=2)

# 4. Sentiment Summary
df_sent = pd.read_csv(OUTPUTS_EXP / "sentiment_summary.csv")
df_sent = df_sent.replace({np.nan: None})
with open(WEBAPP_DATA / "sentiment_summary.json", 'w', encoding='utf-8') as f:
    json.dump(df_sent.to_dict(orient='records'), f, indent=2)

# 5. Rating Sentiment Cross-tab
df_rating_sent = pd.read_csv(OUTPUTS_EXP / "rating_sentiment_summary.csv")
df_rating_sent = df_rating_sent.replace({np.nan: None})
with open(WEBAPP_DATA / "rating_sentiment.json", 'w', encoding='utf-8') as f:
    json.dump(df_rating_sent.to_dict(orient='records'), f, indent=2)

# 6. Curated Sample Reviews
df_rev = pd.read_csv(OUTPUTS_EXP / "reviews_summary.csv")
sample_revs = df_rev.groupby(['ratingOverall', 'dominant_topic_name'], group_keys=False).apply(
    lambda x: x.sample(min(len(x), 3), random_state=42)
).reset_index(drop=True)

sample_revs = sample_revs.replace({np.nan: None})
with open(WEBAPP_DATA / "sample_reviews.json", 'w', encoding='utf-8') as f:
    json.dump(sample_revs.head(80).to_dict(orient='records'), f, indent=2)

print("Webapp data preparation complete! Valid JSON written.")
