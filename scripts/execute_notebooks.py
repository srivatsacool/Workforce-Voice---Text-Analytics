"""
Executes all 8 Jupyter notebooks in order and embeds all outputs, figures, and tables.
"""

import sys
from pathlib import Path
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

import nbformat
from nbconvert.preprocessors import ExecutePreprocessor

ROOT_DIR = Path(__file__).resolve().parent.parent
NOTEBOOKS_DIR = ROOT_DIR / "notebooks"

notebook_files = [
    "01_data_understanding.ipynb",
    "02_data_cleaning_eda.ipynb",
    "03_text_preprocessing.ipynb",
    "04_sentiment_analysis.ipynb",
    "05_ml_sentiment_classification.ipynb",
    "06_topic_modeling_lda.ipynb",
    "07_workforce_intelligence_analysis.ipynb",
    "08_executive_insights.ipynb"
]

print("Starting Sequential Notebook Execution...")

for nb_name in notebook_files:
    nb_path = NOTEBOOKS_DIR / nb_name
    print(f"\n[EXEC] Running {nb_name} ...", flush=True)
    with open(nb_path, "r", encoding="utf-8") as f:
        nb = nbformat.read(f, as_version=4)
    
    ep = ExecutePreprocessor(timeout=600, kernel_name="python3")
    try:
        ep.preprocess(nb, {'metadata': {'path': str(NOTEBOOKS_DIR)}})
        with open(nb_path, "w", encoding="utf-8") as f:
            nbformat.write(nb, f)
        print(f"[OK] Completed {nb_name} with all outputs captured.", flush=True)
    except Exception as e:
        print(f"[ERROR] Failed in {nb_name}: {e}", flush=True)
        raise

print("\nAll 8 notebooks executed successfully and saved with all cell outputs!")
