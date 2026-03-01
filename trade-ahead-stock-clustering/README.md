# Trade & Ahead — Stock Market Clustering Analysis

**Unsupervised learning applied to 340 NYSE-listed companies to uncover actionable investment segments using K-Means and Hierarchical Clustering.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Interactive-blue?style=for-the-badge)](DEMO_URL_PLACEHOLDER)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.4+-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

![Demo Preview](trade-ahead-stock-clustering/assets/assets:demo-preview.png)

---

## Overview

A global asset management firm needs to identify distinct stock groupings across the NYSE to support portfolio construction and risk management. Rather than relying on traditional sector-based classification alone, this project applies unsupervised learning to discover natural clusters based on 11 financial indicators — revealing investment segments that cut across sector boundaries.

The analysis implements a **dual-framework approach**: K-Means Clustering for tactical portfolio allocation and Hierarchical Clustering for automated outlier detection, with PCA-based dimensionality reduction for visualization.

## Key Findings

| Metric | K-Means (k=5) | Hierarchical (k=8) |
|---|---|---|
| Silhouette Score | 0.467 | 0.618 |
| Cluster Balance | 5 investable groups | 97% mainstream + 3% outliers |
| Best Use Case | Portfolio allocation | Anomaly detection |

**K-Means identified 5 investment strategies:**

- **Distressed Value** (28 stocks) — High-risk turnaround candidates with negative 13-week returns and elevated volatility
- **Premium Growth** (8 stocks) — Market leaders like Amazon and Netflix with high price points and strong momentum
- **Mainstream Core** (282 stocks) — The investable universe; balanced risk/return suitable for diversified portfolios
- **Defensive Income** (9 stocks) — Lowest volatility cluster with stable earnings; ideal for conservative allocation
- **Cash-Rich Growth** (13 stocks) — Strong balance sheets with above-average growth; compounders

**Hierarchical Clustering** automatically separated 10 exceptional stocks (including Priceline at $1,275 and Chesapeake Energy at $4.50) from the 330-stock mainstream universe — demonstrating its strength as an outlier detection system without requiring predefined thresholds.

## Interactive Demo

The [live demo](DEMO_URL_PLACEHOLDER) lets you explore the full clustering results:

- **Toggle** between K-Means and Hierarchical clustering in real-time
- **Hover** over any of the 340 stocks on the PCA scatter plot to see financials
- **Filter** by sector (11 GICS sectors) or click clusters to isolate segments
- **Search** for any ticker symbol to locate it in the visualization
- **Compare** methods side-by-side: silhouette scores, cluster balance, execution time

## Methodology

```
Raw Data (340 × 11 features)
    │
    ▼
StandardScaler Normalization
    │
    ├──► K-Means (k=5, random_state=42)
    │       └── Elbow curve + Silhouette analysis → k=5 optimal
    │
    ├──► Hierarchical (Euclidean + Average linkage, k=8)
    │       └── Cophenetic correlation comparison across distance metrics
    │       └── Dendrogram analysis for cut height selection
    │
    └──► PCA (2 components, 37.2% variance explained)
            └── PC1: 22.8% | PC2: 14.4%
```

**Feature set:** Current Price, 13-Week Price Change, Volatility, ROE, Cash Ratio, Net Cash Flow, Net Income, EPS, Estimated Shares Outstanding, P/E Ratio, P/B Ratio

**Why two methods?** K-Means enforces balanced, spherical clusters — ideal for dividing stocks into investable groups. Hierarchical clustering with average linkage is sensitive to density differences, naturally isolating extreme outliers. Together, they provide complementary views: one for portfolio construction, one for risk flagging.

## Repository Structure

```
├── README.md                              ← You are here
├── demo/
│   └── TradeAhead_StockClustering.jsx     ← Interactive React demo (deployed)
├── notebooks/
│   └── stock_clustering_analysis.ipynb    ← Full EDA + modeling notebook
├── src/
│   └── clustering_pipeline.py             ← Reproducible pipeline script
├── data/
│   └── stock_data.csv                     ← NYSE dataset (340 companies)
├── assets/
│   └── demo-preview.png                   ← README screenshot
├── requirements.txt
└── .gitignore
```

## Quick Start

```bash
# Clone and install
git clone https://github.com/AlanMcGirr/trade-ahead-stock-clustering.git
cd trade-ahead-stock-clustering
pip install -r requirements.txt

# Run the clustering pipeline
python src/clustering_pipeline.py

# Output: cluster assignments, silhouette scores, and PCA coordinates
```

## Tech Stack

- **Python 3.10+** — Core language
- **scikit-learn** — K-Means, Agglomerative Clustering, PCA, StandardScaler, silhouette scoring
- **SciPy** — Hierarchical linkage, cophenetic correlation, dendrograms
- **pandas / NumPy** — Data manipulation
- **matplotlib / seaborn** — Static visualizations (notebook)
- **React** — Interactive demo frontend

## Dataset

340 NYSE-listed companies across 11 GICS sectors with 15 features (11 numerical indicators used for clustering). Source: Trade & Ahead project, UT Austin Post Graduate Program in Data Science & Business Analytics.

| Feature | Type | Description |
|---|---|---|
| Current Price | Continuous | Stock price at analysis date ($4.50 – $1,274.95) |
| Price Change | Continuous | 13-week percentage change (-38.1% to +83.9%) |
| Volatility | Continuous | Price volatility measure (0.48 – 4.18) |
| ROE | Continuous | Return on equity |
| Cash Ratio | Continuous | Cash & equivalents / current liabilities |
| Net Cash Flow | Continuous | Operating cash flow |
| Net Income | Continuous | Net earnings |
| EPS | Continuous | Earnings per share |
| Est. Shares Outstanding | Continuous | Share count |
| P/E Ratio | Continuous | Price-to-earnings (1.0 – 623.0) |
| P/B Ratio | Continuous | Price-to-book |

## License

MIT — see [LICENSE](LICENSE) for details.

---

*Part of my data science portfolio. See also: [Mortgage Underwriting Demo](https://github.com/AlanMcGirr/mortgage-underwriting-demo) · [Autonomous Financial Research Analyst](https://github.com/AlanMcGirr/Autonomous-Financial-Research-Analyst) · [Legal AI Agent](https://github.com/AlanMcGirr/legal-ai-agent)*
