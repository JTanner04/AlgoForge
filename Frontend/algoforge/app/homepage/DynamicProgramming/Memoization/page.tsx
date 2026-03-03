"use client"

import { useMemo, useState } from "react";
import "./styles.css";

const fibCalls = ["f(6)", "f(5)", "f(4)", "f(3)", "f(2)", "f(1)", "f(0)"];

const snapshots = [
    { stack: ["f(6)"], cache: {} },
    { stack: ["f(6)", "f(5)", "f(4)"], cache: { "f(1)": 1, "f(0)": 0, "f(2)": 1 } },
    { stack: ["f(6)", "f(5)", "f(4)", "f(3)"], cache: { "f(1)": 1, "f(0)": 0, "f(2)": 1, "f(3)": 2 } },
    { stack: ["f(6)", "f(5)"], cache: { "f(1)": 1, "f(0)": 0, "f(2)": 1, "f(3)": 2, "f(4)": 3 } },
    { stack: ["f(6)"], cache: { "f(1)": 1, "f(0)": 0, "f(2)": 1, "f(3)": 2, "f(4)": 3, "f(5)": 5 } },
    { stack: [], cache: { "f(1)": 1, "f(0)": 0, "f(2)": 1, "f(3)": 2, "f(4)": 3, "f(5)": 5, "f(6)": 8 } },
] as const;

export default function MemoizationLevel() {
    const [step, setStep] = useState(0);
    const frame = snapshots[step];

    const cacheHitSet = useMemo(() => {
        if (step < 3) return new Set<string>();
        if (step === 3) return new Set(["f(3)"]);
        if (step === 4) return new Set(["f(4)", "f(3)"]);
        return new Set(["f(5)", "f(4)", "f(3)"]);
    }, [step]);

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 1</span>
                    <h1>Memoization</h1>
                </div>
                <div className="xp-badge">+250 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Optimization Goal</h2>
                <ul>
                    <li>Visualize repeated recursion subproblems</li>
                    <li>Cache solved states and reuse them</li>
                    <li>Avoid recomputation with memo lookups</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code (Memoized Fibonacci)</h3>
                <pre className="code-block">{`function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];

  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(n)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🌳 Recursion Tree + Cache Hits</h3>

                <div className="tree-strip">
                    {fibCalls.map((call) => (
                        <span key={call} className={`call-chip ${frame.stack.includes(call) ? "active" : ""} ${cacheHitSet.has(call) ? "hit" : ""}`}>
                            {call}
                        </span>
                    ))}
                </div>

                <div className="memo-panel">
                    <strong>Memo Cache</strong>
                    <div className="memo-grid">
                        {Object.entries(frame.cache).map(([k, v]) => (
                            <div key={k} className="memo-item">
                                <span>{k}</span>
                                <strong>{v}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="controls">
                    <button className="control-btn" onClick={() => setStep((s) => Math.min(s + 1, snapshots.length - 1))} disabled={step === snapshots.length - 1}>⏭ Step Solve</button>
                    <button className="control-btn" onClick={() => setStep(snapshots.length - 1)} disabled={step === snapshots.length - 1}>▶ Complete</button>
                    <button className="control-btn" onClick={() => setStep(0)}>🔄 Reset</button>
                </div>
            </section>

            <section className="concepts-panel">
                <h3>💡 Skill</h3>
                <ul>
                    <li>Avoid recomputation with cached subproblems</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/DynamicProgramming/OneDimensionalDP" className="next-button">Continue to Level 2: 1D DP →</a>
            </section>
        </div>
    );
}
