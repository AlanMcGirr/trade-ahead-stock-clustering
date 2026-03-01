"""
Trade & Ahead — Stock Clustering Pipeline
==========================================

Applies K-Means and Hierarchical Clustering to 340 NYSE-listed companies
using 11 financial indicators. Outputs cluster assignments, silhouette
scores, and PCA coordinates for visualization.

Usage:
    python clustering_pipeline.py
    python clustering_pipeline.py --data path/to/stock_data.csv
    python clustering_pipeline.py --output results/

Author: Alan Mc Girr
"""

import argparse
import json
import time
from pathlib import Path

import numpy as np
import pandas as pd
from scipy.cluster.hierarchy import linkage, cophenet
from scipy.spatial.distance import pdist
from sklearn.cluster import AgglomerativeClustering, KMeans
from sklearn.decomposition import PCA
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler


# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

NUMERICAL_FEATURES = [
    "Current Price",
    "Price Change",
    "Volatility",
    "ROE",
    "Cash Ratio",
    "Net Cash Flow",
    "Net Income",
    "Earnings Per Share",
    "Estimated Shares Outstanding",
    "P/E Ratio",
    "P/B Ratio",
]

KMEANS_K = 5
KMEANS_SEED = 42

HC_K = 8
HC_LINKAGE = "average"
HC_METRIC = "euclidean"

PCA_COMPONENTS = 2

# Investment strategy labels derived from cluster profiling
KMEANS_STRATEGIES = {
    0: {"name": "Distressed Value", "risk": "High"},
    1: {"name": "Premium Growth", "risk": "Medium"},
    2: {"name": "Mainstream Core", "risk": "Medium"},
    3: {"name": "Defensive Income", "risk": "Low"},
    4: {"name": "Cash-Rich Growth", "risk": "Medium"},
}


# ---------------------------------------------------------------------------
# Pipeline functions
# ---------------------------------------------------------------------------


def load_data(filepath: str) -> pd.DataFrame:
    """Load and validate the stock dataset."""
    df = pd.read_csv(filepath)

    missing = [col for col in NUMERICAL_FEATURES if col not in df.columns]
    if missing:
        raise ValueError(f"Missing required columns: {missing}")

    print(f"Loaded {len(df)} companies across {df['GICS Sector'].nunique()} sectors")
    print(f"Price range: ${df['Current Price'].min():.2f} – ${df['Current Price'].max():.2f}")
    print(f"Missing values: {df[NUMERICAL_FEATURES].isnull().sum().sum()}")

    return df


def scale_features(df: pd.DataFrame) -> tuple[np.ndarray, list]:
    """Standardize numerical features to zero mean, unit variance."""
    # Use only features present in the dataset with non-null values
    available = [col for col in NUMERICAL_FEATURES if col in df.columns and df[col].notna().all()]
    missing = [col for col in NUMERICAL_FEATURES if col not in available]
    if missing:
        print(f"Note: Skipping columns with missing data: {missing}")

    scaler = StandardScaler()
    scaled = scaler.fit_transform(df[available])
    print(f"Scaled {len(available)} features using StandardScaler")
    return scaled, available


def run_kmeans(scaled: np.ndarray) -> dict:
    """Run K-Means clustering with silhouette evaluation."""
    print(f"\n{'='*50}")
    print(f"K-MEANS CLUSTERING (k={KMEANS_K})")
    print(f"{'='*50}")

    start = time.perf_counter()
    model = KMeans(n_clusters=KMEANS_K, random_state=KMEANS_SEED, n_init="auto")
    labels = model.fit_predict(scaled)
    elapsed = time.perf_counter() - start

    score = silhouette_score(scaled, labels)
    inertia = model.inertia_

    sizes = np.bincount(labels)
    print(f"Silhouette score: {score:.3f}")
    print(f"Inertia: {inertia:.1f}")
    print(f"Cluster sizes: {dict(enumerate(sizes.tolist()))}")
    print(f"Execution time: {elapsed:.4f}s")

    return {"labels": labels, "silhouette": score, "inertia": inertia, "time": elapsed}


def run_hierarchical(scaled: np.ndarray) -> dict:
    """Run Hierarchical Clustering with cophenetic correlation."""
    print(f"\n{'='*50}")
    print(f"HIERARCHICAL CLUSTERING (k={HC_K}, {HC_METRIC} + {HC_LINKAGE})")
    print(f"{'='*50}")

    # Compute cophenetic correlation for method validation
    Z = linkage(scaled, method=HC_LINKAGE, metric=HC_METRIC)
    coph_corr, _ = cophenet(Z, pdist(scaled, metric=HC_METRIC))
    print(f"Cophenetic correlation: {coph_corr:.3f}")

    start = time.perf_counter()
    model = AgglomerativeClustering(n_clusters=HC_K, linkage=HC_LINKAGE)
    labels = model.fit_predict(scaled)
    elapsed = time.perf_counter() - start

    score = silhouette_score(scaled, labels)

    sizes = np.bincount(labels)
    print(f"Silhouette score: {score:.3f}")
    print(f"Cluster sizes: {dict(enumerate(sizes.tolist()))}")
    print(f"Balance ratio: {sizes.max() / sizes.min():.1f}x")
    print(f"Execution time: {elapsed:.4f}s")

    return {
        "labels": labels,
        "silhouette": score,
        "cophenetic": coph_corr,
        "time": elapsed,
    }


def run_pca(scaled: np.ndarray) -> dict:
    """Reduce to 2D for visualization using PCA."""
    pca = PCA(n_components=PCA_COMPONENTS)
    coords = pca.fit_transform(scaled)

    variance = pca.explained_variance_ratio_
    print(f"\nPCA: {variance[0]*100:.1f}% + {variance[1]*100:.1f}% = {sum(variance)*100:.1f}% variance")

    return {"coords": coords, "variance": variance.tolist()}


def profile_clusters(df: pd.DataFrame, labels: np.ndarray, method: str) -> list:
    """Generate financial profiles for each cluster."""
    profiles = []
    for c in range(labels.max() + 1):
        mask = labels == c
        subset = df[mask]

        profile = {
            "cluster": c,
            "size": int(mask.sum()),
            "avg_price": round(subset["Current Price"].mean(), 2),
            "avg_change_13w": round(subset["Price Change"].mean(), 2),
            "avg_volatility": round(subset["Volatility"].mean(), 2),
            "avg_roe": round(subset["ROE"].mean(), 2),
            "avg_pe": round(subset["P/E Ratio"].mean(), 2),
            "avg_pb": round(subset["P/B Ratio"].mean(), 2),
            "avg_eps": round(subset["Earnings Per Share"].mean(), 2),
            "top_companies": subset["Security"].head(5).tolist(),
        }

        if method == "kmeans" and c in KMEANS_STRATEGIES:
            profile["strategy"] = KMEANS_STRATEGIES[c]["name"]
            profile["risk_level"] = KMEANS_STRATEGIES[c]["risk"]

        profiles.append(profile)

    return profiles


def compare_methods(km_result: dict, hc_result: dict) -> None:
    """Print side-by-side comparison of both methods."""
    print(f"\n{'='*50}")
    print("METHOD COMPARISON")
    print(f"{'='*50}")
    print(f"{'Metric':<25} {'K-Means':>12} {'Hierarchical':>14}")
    print(f"{'-'*51}")
    print(f"{'Silhouette Score':<25} {km_result['silhouette']:>12.3f} {hc_result['silhouette']:>14.3f}")
    print(f"{'Execution Time':<25} {km_result['time']:>11.4f}s {hc_result['time']:>13.4f}s")
    print(f"{'Clusters':<25} {KMEANS_K:>12} {HC_K:>14}")

    winner = "Hierarchical" if hc_result["silhouette"] > km_result["silhouette"] else "K-Means"
    print(f"\nHigher silhouette: {winner}")
    print("Recommendation: Use K-Means for portfolio allocation, Hierarchical for outlier detection")


def save_results(
    df: pd.DataFrame,
    km_result: dict,
    hc_result: dict,
    pca_result: dict,
    km_profiles: list,
    hc_profiles: list,
    output_dir: str,
) -> None:
    """Save cluster assignments and profiles."""
    output = Path(output_dir)
    output.mkdir(parents=True, exist_ok=True)

    # Cluster assignments CSV
    assignments = df[["Ticker Symbol", "Security", "GICS Sector"]].copy()
    assignments["KMeans_Cluster"] = km_result["labels"]
    assignments["HC_Cluster"] = hc_result["labels"]
    assignments["PCA_X"] = pca_result["coords"][:, 0].round(3)
    assignments["PCA_Y"] = pca_result["coords"][:, 1].round(3)
    assignments.to_csv(output / "cluster_assignments.csv", index=False)

    # Profiles JSON
    results = {
        "kmeans": {
            "k": KMEANS_K,
            "silhouette": round(km_result["silhouette"], 4),
            "profiles": km_profiles,
        },
        "hierarchical": {
            "k": HC_K,
            "linkage": HC_LINKAGE,
            "metric": HC_METRIC,
            "silhouette": round(hc_result["silhouette"], 4),
            "cophenetic": round(hc_result["cophenetic"], 4),
            "profiles": hc_profiles,
        },
        "pca_variance": [round(v, 4) for v in pca_result["variance"]],
    }
    with open(output / "clustering_results.json", "w") as f:
        json.dump(results, f, indent=2)

    print(f"\nResults saved to {output}/")
    print(f"  - cluster_assignments.csv ({len(assignments)} rows)")
    print(f"  - clustering_results.json")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main():
    parser = argparse.ArgumentParser(description="Stock clustering pipeline")
    parser.add_argument("--data", default="data/stock_data.csv", help="Path to stock_data.csv")
    parser.add_argument("--output", default="output", help="Output directory")
    args = parser.parse_args()

    # 1. Load & validate
    df = load_data(args.data)

    # 2. Scale features
    scaled, features_used = scale_features(df)

    # 3. K-Means
    km_result = run_kmeans(scaled)

    # 4. Hierarchical
    hc_result = run_hierarchical(scaled)

    # 5. PCA
    pca_result = run_pca(scaled)

    # 6. Profile clusters
    km_profiles = profile_clusters(df, km_result["labels"], "kmeans")
    hc_profiles = profile_clusters(df, hc_result["labels"], "hierarchical")

    # 7. Compare
    compare_methods(km_result, hc_result)

    # 8. Save
    save_results(df, km_result, hc_result, pca_result, km_profiles, hc_profiles, args.output)

    print("\nDone.")


if __name__ == "__main__":
    main()
