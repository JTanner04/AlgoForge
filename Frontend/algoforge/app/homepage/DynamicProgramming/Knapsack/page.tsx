"use client"

import { useMemo, useState } from "react";
import "./styles.css";

const weights = [1, 3, 4] as const;
const values = [15, 20, 30] as const;
const capacity = 6;

export default function KnapsackLevel() {
    const [itemCount, setItemCount] = useState(0);
    const [capStep, setCapStep] = useState(0);

    const table = useMemo(() => {
        const dp = Array.from({ length: weights.length + 1 }, () => Array(capacity + 1).fill(0));
        for (let i = 1; i <= itemCount; i++) {
            for (let w = 0; w <= capacity; w++) {
                if (w < weights[i - 1]) {
                    dp[i][w] = dp[i - 1][w];
                } else {
                    dp[i][w] = Math.max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
                }
            }
        }
        return dp;
    }, [itemCount]);

    const includeBetter = itemCount > 0 && capStep >= weights[itemCount - 1]
        ? values[itemCount - 1] + table[itemCount - 1][capStep - weights[itemCount - 1]] >= table[itemCount - 1][capStep]
        : false;

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 4</span>
                    <h1>Knapsack</h1>
                </div>
                <div className="xp-badge">+360 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Fill 2D DP table by item and capacity</li>
                    <li>Compare include vs exclude choices per state</li>
                    <li>Apply choice-based optimization patterns</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code (0/1 Knapsack)</h3>
                <pre className="code-block">{`for (let i = 1; i <= n; i++) {
  for (let w = 0; w <= W; w++) {
    const exclude = dp[i - 1][w];
    const include = w >= wt[i - 1]
      ? val[i - 1] + dp[i - 1][w - wt[i - 1]]
      : -Infinity;

    dp[i][w] = Math.max(exclude, include);
  }
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(nW)</span>
                    <span className="complexity-badge">Space: O(nW)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>📊 Include vs Exclude Table Fill</h3>

                <div className="controls">
                    <button className="control-btn" onClick={() => setItemCount((i) => Math.min(i + 1, weights.length))} disabled={itemCount === weights.length}>+ Next Item</button>
                    <button className="control-btn" onClick={() => setCapStep((w) => Math.min(w + 1, capacity))} disabled={capStep === capacity}>+ Next Capacity</button>
                    <button className="control-btn" onClick={() => { setItemCount(0); setCapStep(0); }}>🔄 Reset</button>
                </div>

                <div className="transition-panel">
                    Active state: <strong>dp[{itemCount}][{capStep}]</strong> | Choice: <strong>{includeBetter ? "include" : "exclude"}</strong>
                </div>

                <div className="knapsack-table">
                    <table>
                        <thead>
                            <tr>
                                <th>i / w</th>
                                {Array.from({ length: capacity + 1 }).map((w) => (
                                    <th key={w}>{w}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {table.map((row, i) => (
                                <tr key={i}>
                                    <th>{i}</th>
                                    {row.map((val, w) => {
                                        const isActive = i === itemCount && w === capStep;
                                        const hasItem = i > 0;
                                        const canInclude = hasItem && w >= weights[i - 1];
                                        const include = canInclude ? values[i - 1] + table[i - 1][w - weights[i - 1]] : -Infinity;
                                        const exclude = hasItem ? table[i - 1][w] : 0;
                                        const cls = isActive
                                            ? include > exclude ? "active included" : "active excluded"
                                            : "";
                                        return <td key={`${i}-${w}`} className={cls}>{val}</td>;
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="world-complete">
                <div className="complete-card">
                    <h2>🪨 Dynamic Programming Complete!</h2>
                    <p>You&apos;ve built memo, 1D, 2D grid, and knapsack optimization reasoning.</p>
                    <div className="xp-earned">
                        <span>Total XP Earned:</span>
                        <span className="xp-value">+1210 XP</span>
                    </div>
                    <a href="/homepage" className="return-button">🏠 Return to Galaxy</a>
                </div>
            </section>
        </div>
    );
}
