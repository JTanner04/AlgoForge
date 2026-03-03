"use client"

import { useMemo, useState } from "react";
import "./styles.css";

const stairsN = 6;

export default function OneDimensionalDPLevel() {
    const [step, setStep] = useState(2);

    const dp = useMemo(() => {
        const arr = Array(stairsN + 1).fill(0);
        arr[0] = 1;
        arr[1] = 1;
        for (let i = 2; i <= step; i++) {
            arr[i] = arr[i - 1] + arr[i - 2];
        }
        return arr;
    }, [step]);

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 2</span>
                    <h1>1D DP</h1>
                </div>
                <div className="xp-badge">+280 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Build a DP array from base cases to target</li>
                    <li>Highlight transition: dp[i] = dp[i-1] + dp[i-2]</li>
                    <li>Map pattern to Climbing Stairs and House Robber</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code (Climbing Stairs)</h3>
                <pre className="code-block">{`function climbStairs(n) {
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(n)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>📈 DP Array Build</h3>

                <div className="dp-array">
                    {dp.map((value, idx) => (
                        <span key={idx} className={`dp-cell ${idx === step ? "active" : ""} ${idx < step ? "done" : ""}`}>
                            dp[{idx}] = {value}
                        </span>
                    ))}
                </div>

                <div className="transition-panel">
                    Current transition: <strong>dp[{step}] = dp[{Math.max(step - 1, 0)}] + dp[{Math.max(step - 2, 0)}]</strong>
                </div>

                <div className="controls">
                    <button className="control-btn" onClick={() => setStep((s) => Math.min(s + 1, stairsN))} disabled={step === stairsN}>⏭ Next i</button>
                    <button className="control-btn" onClick={() => setStep(stairsN)} disabled={step === stairsN}>▶ Complete Build</button>
                    <button className="control-btn" onClick={() => setStep(2)}>🔄 Reset</button>
                </div>
            </section>

            <section className="concepts-panel">
                <h3>💡 Skill</h3>
                <ul>
                    <li>Climbing Stairs, House Robber recurrence thinking</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/DynamicProgramming/GridDP" className="next-button">Continue to Level 3: 2D Grid DP →</a>
            </section>
        </div>
    );
}
