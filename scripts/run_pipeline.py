"""
Workforce Intelligence Analytics — End-to-End Pipeline
Extracts, cleans, processes, analyzes, models, and exports all analytical assets.
"""

import sys
import json
import re
from pathlib import Path
import joblib
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns

import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, precision_score, recall_score, f1_score

# Set style
sns.set_theme(style="whitegrid", palette="muted")
plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['figure.dpi'] = 150

# Base paths
ROOT_DIR = Path(__file__).resolve().parent.parent
DATA_RAW = ROOT_DIR / "data" / "raw"
DATA_PROCESSED = ROOT_DIR / "data" / "processed"
MODELS_DIR = ROOT_DIR / "models"
OUTPUTS_FIG = ROOT_DIR / "outputs" / "figures"
OUTPUTS_TAB = ROOT_DIR / "outputs" / "tables"
OUTPUTS_EXP = ROOT_DIR / "outputs" / "exports"

for d in [DATA_PROCESSED, MODELS_DIR, OUTPUTS_FIG, OUTPUTS_TAB, OUTPUTS_EXP]:
    d.mkdir(parents=True, exist_ok=True)

print("Starting Workforce Intelligence Analytics Pipeline...")

# -------------------------------------------------------------
# 1. DATA INGESTION & DISCOVERY
# -------------------------------------------------------------
csv_candidates = list(DATA_RAW.glob("*.csv"))
if not csv_candidates:
    raise FileNotFoundError("No CSV file found in data/raw/! Please place glassdoor_employee_reviews_us.csv into data/raw/.")
raw_csv_path = csv_candidates[0]
print(f"Loading raw dataset from: {raw_csv_path.name}")
df_raw = pd.read_csv(raw_csv_path)
print(f"Raw shape: {df_raw.shape[0]} rows, {df_raw.shape[1]} columns")

# -------------------------------------------------------------
# 2. DATA CLEANING & NORMALIZATION
# -------------------------------------------------------------
df = df_raw.copy()

# Deduplicate
initial_len = len(df)
df = df.drop_duplicates(subset=['reviewId']).reset_index(drop=True)
print(f"Deduplication: removed {initial_len - len(df)} duplicate reviewIds.")

# Date parsing (ISO8601)
df['reviewDateTime'] = pd.to_datetime(df['reviewDateTime'], format='ISO8601')
df['review_year'] = df['reviewDateTime'].dt.year
df['review_year_month'] = df['reviewDateTime'].dt.to_period('M').astype(str)

# Clean string fields
text_cols = ['summary', 'pros', 'cons', 'advice', 'employerName', 'jobTitle', 'location', 'employmentStatus']
for col in text_cols:
    if col in df.columns:
        df[col] = df[col].astype(str).replace({'nan': np.nan, 'None': np.nan})

# Rating validation (ensure bounds 1-5)
df['ratingOverall'] = pd.to_numeric(df['ratingOverall'], errors='coerce')
df = df[(df['ratingOverall'] >= 1) & (df['ratingOverall'] <= 5)].copy()
df['ratingOverall'] = df['ratingOverall'].astype(int)

# Create combined review text
df['review_text'] = (
    df['summary'].fillna('') + '. ' + 
    df['pros'].fillna('') + ' ' + 
    df['cons'].fillna('')
).str.strip()

# Character and word counts
df['char_length'] = df['review_text'].str.len()
df['word_count'] = df['review_text'].str.split().str.len()

# Categorize review length
df['length_category'] = pd.cut(
    df['word_count'], 
    bins=[0, 20, 50, 100, 10000], 
    labels=['Short (<20)', 'Medium (20-50)', 'Detailed (50-100)', 'Extensive (>100)']
)

# Rating Sentiment Segment
def categorize_rating(r):
    if r >= 4:
        return 'High (4-5)'
    elif r == 3:
        return 'Neutral (3)'
    else:
        return 'Low (1-2)'
df['rating_segment'] = df['ratingOverall'].apply(categorize_rating)

# Save cleaned baseline
df.to_csv(DATA_PROCESSED / "glassdoor_cleaned.csv", index=False)
print("Saved data/processed/glassdoor_cleaned.csv")

# -------------------------------------------------------------
# 3. TEXT PREPROCESSING (NLP)
# -------------------------------------------------------------
print("Applying reproducible NLP Preprocessing...")
stop_words = set(stopwords.words('english'))
# Retain negation tokens
negation_words = {'not', 'no', 'nor', 'neither', 'never', 'none', 'hardly', 'scarcely', 'barely'}
stop_words = stop_words - negation_words
# Add domain stopwords that are non-informative for topic distinction
domain_stopwords = {
    'work', 'company', 'job', 'get', 'good', 'great', 'employee', 'employees', 
    'people', 'would', 'also', 'one', 'even', 'like', 'lot', 'much', 'many', 
    'really', 'time', 'make', 'day', 'working', 'place', 'well', 'way', 'thing', 'things'
}
full_stopwords = stop_words.union(domain_stopwords)
lemmatizer = WordNetLemmatizer()

def clean_and_lemmatize(text):
    if not isinstance(text, str):
        return ""
    # remove urls
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    # remove punctuation and numbers
    text = re.sub(r'[^a-zA-Z\s]', ' ', text)
    tokens = text.lower().split()
    cleaned_tokens = [
        lemmatizer.lemmatize(t) for t in tokens 
        if t not in full_stopwords and len(t) > 2
    ]
    return ' '.join(cleaned_tokens)

df['cleaned_text'] = df['review_text'].apply(clean_and_lemmatize)
df['cleaned_pros'] = df['pros'].fillna('').apply(clean_and_lemmatize)
df['cleaned_cons'] = df['cons'].fillna('').apply(clean_and_lemmatize)

# -------------------------------------------------------------
# 4. SENTIMENT ANALYSIS (VADER)
# -------------------------------------------------------------
print("Computing VADER Sentiment Intensity...")
vader = SentimentIntensityAnalyzer()

def extract_sentiment(text):
    if not text or pd.isna(text):
        return 0.0, 0.0, 0.0, 0.0
    scores = vader.polarity_scores(str(text))
    return scores['compound'], scores['pos'], scores['neu'], scores['neg']

vader_results = [extract_sentiment(t) for t in df['review_text']]
df['sentiment_compound'] = [r[0] for r in vader_results]
df['sentiment_pos'] = [r[1] for r in vader_results]
df['sentiment_neu'] = [r[2] for r in vader_results]
df['sentiment_neg'] = [r[3] for r in vader_results]

# Categorical text sentiment
def categorize_sentiment(compound):
    if compound >= 0.05:
        return 'Positive'
    elif compound <= -0.05:
        return 'Negative'
    else:
        return 'Neutral'

df['sentiment_category'] = df['sentiment_compound'].apply(categorize_sentiment)

# Component sentiment
df['pros_sentiment'] = df['pros'].fillna('').apply(lambda t: vader.polarity_scores(str(t))['compound'])
df['cons_sentiment'] = df['cons'].fillna('').apply(lambda t: vader.polarity_scores(str(t))['compound'])

# Sentiment vs Rating Alignment
# High rating (4-5) + Positive sentiment = Aligned Positive
# Low rating (1-2) + Negative sentiment = Aligned Negative
# High rating (4-5) + Negative sentiment = Divergent (Critical Voice in High Rating)
# Low rating (1-2) + Positive sentiment = Divergent (Polite Voice in Low Rating)
def classify_alignment(row):
    r = row['ratingOverall']
    s = row['sentiment_category']
    if r >= 4 and s == 'Positive':
        return 'Aligned Positive'
    elif r <= 2 and s == 'Negative':
        return 'Aligned Negative'
    elif r >= 4 and s == 'Negative':
        return 'Divergent: High Rating / Critical Text'
    elif r <= 2 and s == 'Positive':
        return 'Divergent: Low Rating / Polite Text'
    elif r == 3:
        return 'Moderate Rating (3-Star)'
    else:
        return 'Neutral Alignment'

df['sentiment_rating_alignment'] = df.apply(classify_alignment, axis=1)

# -------------------------------------------------------------
# 5. MACHINE LEARNING: TF-IDF + LOGISTIC REGRESSION
# -------------------------------------------------------------
print("Training TF-IDF + Logistic Regression Classifier...")
# We model polarity on clear rating signals (excluding 3-star borderline)
df_ml = df[df['ratingOverall'] != 3].copy()
df_ml['target'] = (df_ml['ratingOverall'] >= 4).astype(int)

X_train, X_test, y_train, y_test = train_test_split(
    df_ml['cleaned_text'], 
    df_ml['target'], 
    test_size=0.20, 
    random_state=42, 
    stratify=df_ml['target']
)

tfidf_vec = TfidfVectorizer(max_features=4000, ngram_range=(1, 2), min_df=5)
X_train_tfidf = tfidf_vec.fit_transform(X_train)
X_test_tfidf = tfidf_vec.transform(X_test)

# Train balanced Logistic Regression
lr_model = LogisticRegression(max_iter=1000, random_state=42, class_weight='balanced')
lr_model.fit(X_train_tfidf, y_train)

y_pred = lr_model.predict(X_test_tfidf)
y_prob = lr_model.predict_proba(X_test_tfidf)[:, 1]

ml_metrics = {
    'accuracy': float(accuracy_score(y_test, y_pred)),
    'precision_macro': float(precision_score(y_test, y_pred, average='macro')),
    'recall_macro': float(recall_score(y_test, y_pred, average='macro')),
    'f1_macro': float(f1_score(y_test, y_pred, average='macro')),
    'test_samples': int(len(y_test)),
    'train_samples': int(len(y_train)),
    'classes': ['Negative (1-2)', 'Positive (4-5)']
}
print(f"ML Classifier Performance: Accuracy={ml_metrics['accuracy']:.3f}, Macro F1={ml_metrics['f1_macro']:.3f}")

# Extract top predictive tokens
feature_names = np.array(tfidf_vec.get_feature_names_out())
coefs = lr_model.coef_[0]
sorted_idx = np.argsort(coefs)

top_negative_terms = [
    {'term': feature_names[i], 'coefficient': float(coefs[i])} 
    for i in sorted_idx[:15]
]
top_positive_terms = [
    {'term': feature_names[i], 'coefficient': float(coefs[i])} 
    for i in sorted_idx[-15:][::-1]
]

# Save models
joblib.dump(tfidf_vec, MODELS_DIR / "tfidf_vectorizer.joblib")
joblib.dump(lr_model, MODELS_DIR / "logistic_regression_sentiment.joblib")

# Apply ML prediction on entire dataset for comparison
X_all_tfidf = tfidf_vec.transform(df['cleaned_text'])
df['ml_sentiment_pred'] = lr_model.predict(X_all_tfidf)
df['ml_sentiment_prob_pos'] = lr_model.predict_proba(X_all_tfidf)[:, 1]

# -------------------------------------------------------------
# 6. TOPIC MODELING: LATENT DIRICHLET ALLOCATION (LDA)
# -------------------------------------------------------------
print("Performing LDA Topic Modeling (k=6)...")
NUM_TOPICS = 6
count_vec = CountVectorizer(max_features=2500, max_df=0.5, min_df=10)
dtm = count_vec.fit_transform(df['cleaned_text'])

lda = LatentDirichletAllocation(
    n_components=NUM_TOPICS, 
    random_state=42, 
    max_iter=25, 
    learning_method='batch'
)
lda_doc_topic = lda.fit_transform(dtm)

# Interpret topics based on empirical terms
topic_definitions = {
    0: {
        'id': 'T0',
        'name': 'Compensation & Hourly Pay Dynamics',
        'short_name': 'Compensation & Pay',
        'description': 'Discussions regarding wages, compensation, store level hourly pay, and basic retail remuneration.',
        'color': '#E11D48'
    },
    1: {
        'id': 'T1',
        'name': 'Workplace Culture & Camaraderie',
        'short_name': 'Culture & Camaraderie',
        'description': 'Interpersonal relationships, supportive team atmosphere, collegial culture, and day-to-day morale.',
        'color': '#059669'
    },
    2: {
        'id': 'T2',
        'name': 'Work-Life Balance & Scheduling',
        'short_name': 'Work-Life Balance',
        'description': 'Schedule predictability, shift lengths, long working hours, flexibility, and personal life equilibrium.',
        'color': '#2563EB'
    },
    3: {
        'id': 'T3',
        'name': 'Management Quality & Internal Communication',
        'short_name': 'Management & Communication',
        'description': 'First-line supervisory effectiveness, communication clarity, leadership trust, and managerial support.',
        'color': '#D97706'
    },
    4: {
        'id': 'T4',
        'name': 'Career Growth & Learning Opportunities',
        'short_name': 'Career Development',
        'description': 'Professional advancement, skill acquisition, promotion pathways, and career development opportunities.',
        'color': '#7C3AED'
    },
    5: {
        'id': 'T5',
        'name': 'Operational Pace, Stress & Organizational Shifts',
        'short_name': 'Operational Stress & Shifts',
        'description': 'Fast-paced execution, workload pressure, organizational restructuring, layoffs, and staffing friction.',
        'color': '#0891B2'
    }
}

count_terms = np.array(count_vec.get_feature_names_out())
topic_summaries = []

for k in range(NUM_TOPICS):
    top_indices = lda.components_[k].argsort()[:-13:-1]
    top_words = count_terms[top_indices].tolist()
    topic_summaries.append({
        'topic_id': k,
        'code': topic_definitions[k]['id'],
        'name': topic_definitions[k]['name'],
        'short_name': topic_definitions[k]['short_name'],
        'description': topic_definitions[k]['description'],
        'color': topic_definitions[k]['color'],
        'top_words': top_words
    })

# Assign dominant topic and topic probabilities to reviews
df['dominant_topic_id'] = lda_doc_topic.argmax(axis=1)
df['dominant_topic_name'] = df['dominant_topic_id'].map(lambda k: topic_definitions[k]['short_name'])
df['dominant_topic_prob'] = lda_doc_topic.max(axis=1)

for k in range(NUM_TOPICS):
    df[f'topic_prob_{k}'] = lda_doc_topic[:, k]

# Save LDA models
joblib.dump(count_vec, MODELS_DIR / "count_vectorizer_lda.joblib")
joblib.dump(lda, MODELS_DIR / "lda_topic_model.joblib")

# Save enriched dataset
df.to_csv(DATA_PROCESSED / "glassdoor_enriched_features.csv", index=False)
print("Saved data/processed/glassdoor_enriched_features.csv")

# -------------------------------------------------------------
# 7. WORKFORCE INTELLIGENCE AGGREGATIONS & EXPORTS
# -------------------------------------------------------------
print("Generating analytical summaries and matrix exports...")

# 7.1 Topic summary
topic_prevalence = df['dominant_topic_id'].value_counts(normalize=True).to_dict()
for ts in topic_summaries:
    k = ts['topic_id']
    sub = df[df['dominant_topic_id'] == k]
    ts['prevalence_pct'] = round(topic_prevalence.get(k, 0.0) * 100, 2)
    ts['review_count'] = int(len(sub))
    ts['avg_rating'] = round(float(sub['ratingOverall'].mean()), 2)
    ts['avg_sentiment_compound'] = round(float(sub['sentiment_compound'].mean()), 3)
    ts['pct_positive_sentiment'] = round(float((sub['sentiment_category'] == 'Positive').mean()) * 100, 1)
    ts['pct_negative_sentiment'] = round(float((sub['sentiment_category'] == 'Negative').mean()) * 100, 1)

df_topic_summary = pd.DataFrame(topic_summaries)
df_topic_summary.to_csv(OUTPUTS_EXP / "topic_summary.csv", index=False)

# 7.2 Sentiment summary
df_sentiment_summary = pd.DataFrame([
    {
        'sentiment_category': 'Positive',
        'count': int((df['sentiment_category'] == 'Positive').sum()),
        'pct': round(float((df['sentiment_category'] == 'Positive').mean()) * 100, 2),
        'avg_rating': round(float(df[df['sentiment_category'] == 'Positive']['ratingOverall'].mean()), 2),
        'avg_compound': round(float(df[df['sentiment_category'] == 'Positive']['sentiment_compound'].mean()), 3)
    },
    {
        'sentiment_category': 'Neutral',
        'count': int((df['sentiment_category'] == 'Neutral').sum()),
        'pct': round(float((df['sentiment_category'] == 'Neutral').mean()) * 100, 2),
        'avg_rating': round(float(df[df['sentiment_category'] == 'Neutral']['ratingOverall'].mean()), 2),
        'avg_compound': round(float(df[df['sentiment_category'] == 'Neutral']['sentiment_compound'].mean()), 3)
    },
    {
        'sentiment_category': 'Negative',
        'count': int((df['sentiment_category'] == 'Negative').sum()),
        'pct': round(float((df['sentiment_category'] == 'Negative').mean()) * 100, 2),
        'avg_rating': round(float(df[df['sentiment_category'] == 'Negative']['ratingOverall'].mean()), 2),
        'avg_compound': round(float(df[df['sentiment_category'] == 'Negative']['sentiment_compound'].mean()), 3)
    }
])
df_sentiment_summary.to_csv(OUTPUTS_EXP / "sentiment_summary.csv", index=False)

# 7.3 Rating vs Sentiment cross-tab
rating_sent_crosstab = pd.crosstab(
    df['ratingOverall'], 
    df['sentiment_category'], 
    normalize='index'
).round(4) * 100
rating_sent_crosstab.reset_index(inplace=True)
rating_sent_crosstab.to_csv(OUTPUTS_EXP / "rating_sentiment_summary.csv", index=False)

# 7.4 Company summary
company_groups = df.groupby('employerName')
comp_list = []
for name, group in company_groups:
    c_len = len(group)
    comp_list.append({
        'employer_name': name,
        'review_count': int(c_len),
        'avg_rating': round(float(group['ratingOverall'].mean()), 2),
        'median_rating': float(group['ratingOverall'].median()),
        'avg_sentiment': round(float(group['sentiment_compound'].mean()), 3),
        'pct_positive': round(float((group['sentiment_category'] == 'Positive').mean()) * 100, 1),
        'pct_neutral': round(float((group['sentiment_category'] == 'Neutral').mean()) * 100, 1),
        'pct_negative': round(float((group['sentiment_category'] == 'Negative').mean()) * 100, 1),
        'avg_wlb': round(float(group['ratingWorkLifeBalance'].dropna().mean()), 2) if group['ratingWorkLifeBalance'].notnull().sum() > 0 else None,
        'avg_culture': round(float(group['ratingCultureAndValues'].dropna().mean()), 2) if group['ratingCultureAndValues'].notnull().sum() > 0 else None,
        'avg_diversity': round(float(group['ratingDiversityAndInclusion'].dropna().mean()), 2) if group['ratingDiversityAndInclusion'].notnull().sum() > 0 else None,
        'avg_career': round(float(group['ratingCareerOpportunities'].dropna().mean()), 2) if group['ratingCareerOpportunities'].notnull().sum() > 0 else None,
        'avg_comp': round(float(group['ratingCompensationAndBenefits'].dropna().mean()), 2) if group['ratingCompensationAndBenefits'].notnull().sum() > 0 else None,
        'avg_leadership': round(float(group['ratingSeniorLeadership'].dropna().mean()), 2) if group['ratingSeniorLeadership'].notnull().sum() > 0 else None,
        'dominant_topic': topic_definitions[int(group['dominant_topic_id'].mode().iloc[0])]['short_name'] if not group['dominant_topic_id'].empty else 'N/A'
    })

df_company_summary = pd.DataFrame(comp_list).sort_values(by='review_count', ascending=False)
df_company_summary.to_csv(OUTPUTS_EXP / "company_summary.csv", index=False)

# 7.5 Company-Topic matrix (% of company reviews per topic)
comp_topic_ct = pd.crosstab(
    df['employerName'], 
    df['dominant_topic_name'], 
    normalize='index'
).round(4) * 100
comp_topic_ct.reset_index(inplace=True)
comp_topic_ct.to_csv(OUTPUTS_EXP / "company_topic_matrix.csv", index=False)

# 7.6 Company-Sentiment matrix (% of reviews positive/neutral/negative)
comp_sent_ct = pd.crosstab(
    df['employerName'], 
    df['sentiment_category'], 
    normalize='index'
).round(4) * 100
comp_sent_ct.reset_index(inplace=True)
comp_sent_ct.to_csv(OUTPUTS_EXP / "company_sentiment_matrix.csv", index=False)

# 7.7 Reviews lightweight summary for web app search/filtering (top 300 curated representative rows)
sample_reviews = df[[
    'reviewId', 'employerName', 'reviewDateTime', 'ratingOverall', 
    'sentiment_category', 'sentiment_compound', 'dominant_topic_name', 
    'summary', 'pros', 'cons', 'advice'
]].copy()
sample_reviews['reviewDateTime'] = sample_reviews['reviewDateTime'].dt.strftime('%Y-%m-%d')
sample_reviews.to_csv(OUTPUTS_EXP / "reviews_summary.csv", index=False)

# 7.8 KPI Summary JSON
kpi_summary = {
    'total_reviews': int(len(df)),
    'total_companies': int(df['employerName'].nunique()),
    'avg_rating_overall': round(float(df['ratingOverall'].mean()), 2),
    'median_rating_overall': float(df['ratingOverall'].median()),
    'pct_positive_sentiment': round(float((df['sentiment_category'] == 'Positive').mean()) * 100, 1),
    'pct_neutral_sentiment': round(float((df['sentiment_category'] == 'Neutral').mean()) * 100, 1),
    'pct_negative_sentiment': round(float((df['sentiment_category'] == 'Negative').mean()) * 100, 1),
    'avg_sentiment_compound': round(float(df['sentiment_compound'].mean()), 3),
    'topics_discovered': NUM_TOPICS,
    'date_range': {
        'min_date': df['reviewDateTime'].min().strftime('%Y-%m-%d'),
        'max_date': df['reviewDateTime'].max().strftime('%Y-%m-%d')
    },
    'ml_model_performance': ml_metrics,
    'top_positive_indicators': top_positive_terms[:10],
    'top_negative_indicators': top_negative_terms[:10],
    'topic_definitions': topic_summaries
}

with open(OUTPUTS_EXP / "kpi_summary.json", 'w', encoding='utf-8') as f:
    json.dump(kpi_summary, f, indent=2)

print("Saved all exports to outputs/exports/.")

# -------------------------------------------------------------
# 8. FIGURE GENERATION (High DPI, Publication Grade)
# -------------------------------------------------------------
print("Generating publication-grade figures...")

# 8.1 Rating Distribution
fig, ax = plt.subplots(figsize=(8, 5))
rating_counts = df['ratingOverall'].value_counts().sort_index()
colors = ['#EF4444', '#F97316', '#EAB308', '#3B82F6', '#10B981']
bars = ax.bar(rating_counts.index, rating_counts.values, color=colors, width=0.6, edgecolor='#1E293B', linewidth=1)
for bar in bars:
    yval = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2, yval + 50, f"{yval:,}\n({yval/len(df)*100:.1f}%)", ha='center', va='bottom', fontsize=9, fontweight='bold')
ax.set_title("Overall Rating Distribution (1 to 5 Stars)", fontsize=14, fontweight='bold', pad=15)
ax.set_xlabel("Glassdoor Rating (Stars)", fontsize=11, labelpad=8)
ax.set_ylabel("Number of Reviews", fontsize=11, labelpad=8)
ax.set_ylim(0, max(rating_counts.values) * 1.18)
ax.set_xticks([1, 2, 3, 4, 5])
plt.tight_layout()
plt.savefig(OUTPUTS_FIG / "01_rating_distribution.png")
plt.close()

# 8.2 Missing Values Heatmap / Bar
fig, ax = plt.subplots(figsize=(10, 6))
missing_pct = (df_raw.isnull().mean() * 100).sort_values(ascending=False)
missing_pct = missing_pct[missing_pct > 0]
bars = ax.barh(missing_pct.index, missing_pct.values, color='#475569', edgecolor='#0F172A')
for bar in bars:
    xval = bar.get_width()
    ax.text(xval + 1, bar.get_y() + bar.get_height()/2, f"{xval:.1f}%", ha='left', va='center', fontsize=8)
ax.set_title("Missing Values Profile across Raw Review Attributes (%)", fontsize=13, fontweight='bold', pad=15)
ax.set_xlabel("Percentage Missing (%)", fontsize=10)
ax.set_xlim(0, 110)
plt.tight_layout()
plt.savefig(OUTPUTS_FIG / "02_missing_values_heatmap.png")
plt.close()

# 8.3 Sentiment Distribution (Compound)
fig, ax = plt.subplots(figsize=(9, 5))
sns.histplot(df['sentiment_compound'], bins=40, kde=True, ax=ax, color='#2563EB', edgecolor='white')
ax.axvline(0.05, color='#10B981', linestyle='--', linewidth=1.5, label='Positive Threshold (>= +0.05)')
ax.axvline(-0.05, color='#EF4444', linestyle='--', linewidth=1.5, label='Negative Threshold (<= -0.05)')
ax.axvline(df['sentiment_compound'].median(), color='#D97706', linestyle='-', linewidth=2, label=f"Median Compound ({df['sentiment_compound'].median():.2f})")
ax.set_title("VADER Sentiment Compound Score Distribution (Employee Reviews)", fontsize=13, fontweight='bold', pad=15)
ax.set_xlabel("Compound Sentiment Score (-1.0 Highly Negative to +1.0 Highly Positive)", fontsize=10)
ax.set_ylabel("Review Count", fontsize=10)
ax.legend(loc='upper left', frameon=True)
plt.tight_layout()
plt.savefig(OUTPUTS_FIG / "04_sentiment_distribution.png")
plt.close()

# 8.4 Sentiment vs Rating Boxplot
fig, ax = plt.subplots(figsize=(8, 5))
sns.boxplot(
    data=df, x='ratingOverall', y='sentiment_compound', 
    palette=colors, ax=ax, boxprops=dict(alpha=0.8), showmeans=True,
    meanprops={"marker":"o", "markerfacecolor":"white", "markeredgecolor":"black"}
)
ax.set_title("Employee Review Text Sentiment vs. Numerical Rating", fontsize=13, fontweight='bold', pad=15)
ax.set_xlabel("Numerical Rating (Stars)", fontsize=11)
ax.set_ylabel("VADER Compound Sentiment Score", fontsize=11)
ax.axhline(0, color='gray', linestyle=':', linewidth=1)
plt.tight_layout()
plt.savefig(OUTPUTS_FIG / "05_sentiment_vs_rating_scatter_box.png")
plt.close()

# 8.5 ML Confusion Matrix
fig, ax = plt.subplots(figsize=(6, 5))
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=False, ax=ax,
            xticklabels=['Negative (1-2)', 'Positive (4-5)'],
            yticklabels=['Negative (1-2)', 'Positive (4-5)'])
ax.set_title(f"Logistic Regression Confusion Matrix\n(Accuracy: {ml_metrics['accuracy']:.1%})", fontsize=12, fontweight='bold', pad=12)
ax.set_xlabel("Predicted Label", fontsize=10)
ax.set_ylabel("True Rating Sentiment Label", fontsize=10)
plt.tight_layout()
plt.savefig(OUTPUTS_FIG / "06_ml_confusion_matrix.png")
plt.close()

# 8.6 Top ML Coefficients
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 6))
top_pos_df = pd.DataFrame(top_positive_terms).head(10)
top_neg_df = pd.DataFrame(top_negative_terms).head(10)

ax1.barh(top_neg_df['term'][::-1], top_neg_df['coefficient'][::-1], color='#EF4444')
ax1.set_title("Strongest Negative Sentiment Terms", fontsize=11, fontweight='bold')
ax1.set_xlabel("Logistic Regression Coefficient", fontsize=9)

ax2.barh(top_pos_df['term'][::-1], top_pos_df['coefficient'][::-1], color='#10B981')
ax2.set_title("Strongest Positive Sentiment Terms", fontsize=11, fontweight='bold')
ax2.set_xlabel("Logistic Regression Coefficient", fontsize=9)

plt.suptitle("TF-IDF Feature Importance: Key Lexical Drivers of Sentiment", fontsize=13, fontweight='bold')
plt.tight_layout()
plt.savefig(OUTPUTS_FIG / "07_ml_top_coefficient_terms.png")
plt.close()

# 8.7 LDA Topics Top Terms
fig, axes = plt.subplots(2, 3, figsize=(14, 8), sharey=False)
axes = axes.flatten()

for k, ts in enumerate(topic_summaries):
    ax = axes[k]
    words = ts['top_words'][:8][::-1]
    top_vals = lda.components_[k][count_terms.searchsorted(words)]
    # Use topic-word weights
    comp_k = lda.components_[k]
    word_weights = [comp_k[np.where(count_terms == w)[0][0]] for w in words]
    ax.barh(words, word_weights, color=ts['color'], alpha=0.85)
    ax.set_title(f"Topic {k+1}: {ts['short_name']}\n({ts['prevalence_pct']}% of reviews)", fontsize=10, fontweight='bold')
    ax.set_xlabel("Weight", fontsize=8)

plt.suptitle("Latent Dirichlet Allocation: 6 Discovered Workforce Themes", fontsize=14, fontweight='bold', y=1.02)
plt.tight_layout()
plt.savefig(OUTPUTS_FIG / "08_lda_topic_top_terms.png")
plt.close()

# 8.8 Workforce Signal Matrix (Topic x Rating Heatmap)
fig, ax = plt.subplots(figsize=(10, 6))
signal_matrix = pd.crosstab(
    df['dominant_topic_name'], 
    df['ratingOverall'], 
    normalize='index'
) * 100
sns.heatmap(signal_matrix, annot=True, fmt='.1f', cmap='YlGnBu', cbar_kws={'label': '% of Topic Reviews'}, ax=ax)
ax.set_title("Workforce Signal Matrix: Topic Prevalence Across Rating Tiers (%)", fontsize=13, fontweight='bold', pad=15)
ax.set_xlabel("Overall Employee Rating (Stars)", fontsize=10)
ax.set_ylabel("Discovered Workforce Topic", fontsize=10)
plt.tight_layout()
plt.savefig(OUTPUTS_FIG / "09_workforce_signal_matrix.png")
plt.close()

# 8.9 Company Sentiment vs Rating Scatter
fig, ax = plt.subplots(figsize=(10, 6))
# Filter companies with at least 50 reviews for robust signal
comp_robust = df_company_summary[df_company_summary['review_count'] >= 50]
sns.scatterplot(
    data=comp_robust, x='avg_rating', y='avg_sentiment', 
    size='review_count', sizes=(40, 150), hue='avg_rating', palette='viridis', 
    alpha=0.85, ax=ax, legend=False
)
# Annotate key companies (highest, lowest, notable)
for idx, r in comp_robust.iterrows():
    if r['avg_rating'] > 4.1 or r['avg_rating'] < 3.0 or r['employer_name'] in ['Google', 'Walmart', 'Amazon', 'Apple', 'Meta']:
        ax.text(r['avg_rating'] + 0.02, r['avg_sentiment'], r['employer_name'], fontsize=8, alpha=0.9)
ax.set_title("Organizational Workforce Signals: Average Rating vs Text Sentiment", fontsize=13, fontweight='bold', pad=15)
ax.set_xlabel("Average Overall Rating (Stars)", fontsize=10)
ax.set_ylabel("Average Compound Sentiment (-1 to +1)", fontsize=10)
ax.axhline(comp_robust['avg_sentiment'].mean(), color='gray', linestyle=':', label='Benchmark Avg Sentiment')
ax.axvline(comp_robust['avg_rating'].mean(), color='gray', linestyle='--', label='Benchmark Avg Rating')
ax.legend(loc='lower right', frameon=True)
plt.tight_layout()
plt.savefig(OUTPUTS_FIG / "10_company_sentiment_vs_rating.png")
plt.close()

# -------------------------------------------------------------
# 9. SUMMARY HTML TABLES
# -------------------------------------------------------------
print("Exporting summary tables to outputs/tables/...")
df_company_summary.head(25).to_html(OUTPUTS_TAB / "top_companies_summary.html", index=False, classes="table table-striped")
df_topic_summary.to_html(OUTPUTS_TAB / "topics_summary.html", index=False, classes="table table-bordered")
rating_sent_crosstab.to_html(OUTPUTS_TAB / "rating_sentiment_crosstab.html", index=False, classes="table table-hover")

print("Pipeline execution complete! All models, data outputs, figures, and tables successfully created.")
