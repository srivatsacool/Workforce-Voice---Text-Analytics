# Workforce Intelligence Analytics — Data Architecture

This directory houses the raw and processed data assets for the Workforce Intelligence Analytics platform.

## Dataset Origin
* **Primary Source**: [Kaggle: Glassdoor Employee Reviews: 90 Top US Employers](https://www.kaggle.com/datasets/scrapifier/glassdoor-employee-reviews-top-us-employers)
* **Author / Scraper**: `scrapifier`
* **Licensing**: Open / CC0 Public Domain
* **Raw Filename**: `glassdoor_employee_reviews_us.csv`

## Directory Structure
```
data/
├── raw/
│   └── glassdoor_employee_reviews_us.csv  # Unmodified raw scrape from Kaggle
└── processed/
    ├── glassdoor_cleaned.csv              # Deduplicated, normalized, typed dataset
    └── glassdoor_enriched_features.csv    # VADER sentiment, TF-IDF labels, LDA topic assignments
```

## Data Acquisition Guide

### Option 1: Automatic Download via Kaggle CLI
If you have your `kaggle.json` credentials configured in `~/.kaggle/kaggle.json`:
```bash
kaggle datasets download -d scrapifier/glassdoor-employee-reviews-top-us-employers --unzip -p data/raw/
```

### Option 2: Manual Download
1. Navigate to: `https://www.kaggle.com/datasets/scrapifier/glassdoor-employee-reviews-top-us-employers`
2. Click **Download** (approx. 1.18 MB zipped).
3. Extract the archive and place the resulting `glassdoor_employee_reviews_us.csv` into `data/raw/`.

> **Note on CSV Detection:** All analytics scripts and Jupyter notebooks are designed with dynamic CSV detection using `pathlib.Path("data/raw").glob("*.csv")`. They do not hardcode rigid filenames or absolute system paths.

## Raw Data Dictionary

| Column Name | Type | Description | Non-Null Count |
| :--- | :--- | :--- | :--- |
| `reviewId` | int64 | Unique identifier for each Glassdoor review | 8,785 (100%) |
| `url` | string | Direct web URL to the review on Glassdoor | 8,785 (100%) |
| `employerId` | int64 | Glassdoor internal employer ID | 8,785 (100%) |
| `employerName` | string | Company / Employer name (90 top US employers) | 8,785 (100%) |
| `reviewDateTime` | ISO8601 | Timestamp of review submission (2014 – 2026) | 8,785 (100%) |
| `summary` | string | Title or headline summarizing the review | 8,779 (99.9%) |
| `pros` | string | Positive aspects of employee experience | 8,785 (100%) |
| `cons` | string | Critical or negative aspects of employee experience | 8,785 (100%) |
| `advice` | string | Optional advice directed toward senior management | 2,050 (23.3%) |
| `ratingOverall` | int64 | Overall employee satisfaction rating (1 to 5 stars) | 8,785 (100%) |
| `ratingWorkLifeBalance` | float64 | Sub-rating for work-life balance (1.0 to 5.0) | 5,906 (67.2%) |
| `ratingCultureAndValues` | float64 | Sub-rating for workplace culture and values | 5,924 (67.4%) |
| `ratingDiversityAndInclusion` | float64 | Sub-rating for diversity and inclusion | 5,789 (65.9%) |
| `ratingCareerOpportunities` | float64 | Sub-rating for career growth opportunities | 5,993 (68.2%) |
| `ratingCompensationAndBenefits` | float64 | Sub-rating for pay and employee benefits | 5,964 (67.9%) |
| `ratingSeniorLeadership` | float64 | Sub-rating for senior leadership perception | 5,847 (66.6%) |
| `ratingBusinessOutlook` | string | 6-month business outlook (POSITIVE, NEUTRAL, NEGATIVE) | 4,221 (48.0%) |
| `ratingRecommendToFriend` | string | Recommendation flag (POSITIVE, NEGATIVE) | 4,635 (52.8%) |
| `ratingCeo` | string | CEO approval perception (APPROVE, DISAPPROVE, NO_OPINION)| 4,282 (48.7%) |
| `jobTitle` | string | Employee job title or role | 8,106 (92.3%) |
| `location` | string | Office, store, or city location | 7,439 (84.7%) |
| `locationType` | string | Location classification (CITY, STATE, COUNTRY, etc.) | 7,439 (84.7%) |
| `employmentStatus` | string | Employment type (REGULAR, PART_TIME, CONTRACT, etc.) | 8,586 (97.7%) |
| `isCurrentJob` | bool | Boolean indicator if reviewer is currently employed | 8,785 (100%) |
| `lengthOfEmployment` | int64 | Coded duration of employment category | 8,785 (100%) |
| `countHelpful` | int64 | Upvotes from other Glassdoor readers | 8,785 (100%) |
| `countNotHelpful` | int64 | Downvotes from other Glassdoor readers | 8,785 (100%) |

## Methodological Disclaimer
Employee reviews represent self-selected, voluntary feedback. They are analytical **workforce signals** reflecting individual sentiment and perceived workplace conditions. They should never be treated as direct measures of employee productivity, operational performance, or causal management effectiveness.
