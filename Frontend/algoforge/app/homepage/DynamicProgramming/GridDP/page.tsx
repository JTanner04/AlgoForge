"use client"

import { useMemo, useState } from "react";
import "./styles.css";

const rows = 3;
const cols = 4;

export default function GridDPLevel() {
    const [step, setStep] = useState(0);

    const cells = useMemo(() => {
        const result: { r: number; c: number; value: number; label: string }[] = [];
        let filled = 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (r === 0 || c === 0) {
                    result.push({ r, c, value: 1, label: "base" });
                } else {
                    const top = result.find((x) => x.r === r - 1 && x.c === c)?.value ?? 0;
                    const left = result.find((x) => x.r === r && x.c === c - 1)?.value ?? 0;
                    result.push({ r, c, value: top + left, label: `↑${top} + ←${left}` });
                }
                filled += 1;
                if (filled > step + 1) return result;
            }
        }

        return result;
    }, [step]);

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 3</span>
                    <h1>2D Grid DP</h1>
                </div>
                <div className="xp-badge">+320 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Fill grid states row-by-row</li>
                    <li>Use arrows for state transitions from top/left</li>
                    <li>Apply to Unique Paths and Min Path Sum</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code (Unique Paths)</h3>
                <pre className="code-block">{`function uniquePaths(m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(1));

  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    }
  }

  return dp[m - 1][n - 1];
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(mn)</span>
                    <span className="complexity-badge">Space: O(mn)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🧭 Grid State Transition</h3>

                <div className="grid-board">
                    {Array.from({ length: rows }).map((_, r) =>
                        Array.from({ length: cols }).map((__, c) => {
                            const cell = cells.find((x) => x.r === r && x.c === c);
                            const isCurrent = cell && cell.r === cells[cells.length - 1]?.r && cell.c === cells[cells.length - 1]?.c;
                            return (
                                <div key={`${r}-${c}`} className={`grid-cell ${cell ? "done" : ""} ${isCurrent ? "active" : ""}`}>
                                    <div>({r},{c})</div>
                                    <div>{cell ? cell.value : "-"}</div>
                                    <span className="arrow-label">{cell ? cell.label : ""}</span>
                                </div>
                            );
                        }),
                    )}
                </div>

                <div className="controls">
                    <button className="control-btn" onClick={() => setStep((s) => Math.min(s + 1, rows * cols - 1))} disabled={step === rows * cols - 1}>⏭ Fill Next Cell</button>
                    <button className="control-btn" onClick={() => setStep(rows * cols - 1)} disabled={step === rows * cols - 1}>▶ Complete Grid</button>
                    <button className="control-btn" onClick={() => setStep(0)}>🔄 Reset</button>
                </div>
            </section>

            <section className="concepts-panel">
                <h3>💡 Skill</h3>
                <ul>
                    <li>Unique Paths and Min Path Sum transition design</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/DynamicProgramming/Knapsack" className="next-button">Continue to Level 4: Knapsack →</a>
            </section>
        </div>
    );
}
