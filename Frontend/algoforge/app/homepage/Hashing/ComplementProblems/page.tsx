"use client"

import { useState } from "react";
import "./styles.css";

const sample = [2,7,11,15];
const target = 9;

export default function ComplementProblems() {
    const [arr] = useState<number[]>(sample);
    const [i, setI] = useState(0);
    const [seen, setSeen] = useState<Record<number, number>>({});
    const [match, setMatch] = useState<number | null>(null);

    const step = () => {
        if (i >= arr.length) return;
        const curr = arr[i];
        const comp = target - curr;
        if (seen[comp] !== undefined) {
            setMatch(seen[comp]);
        }
        setSeen(s => ({ ...s, [curr]: i }));
        setI(i+1);
    };

    const reset = () => {
        setI(0); setSeen({}); setMatch(null);
    };

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 2</span>
                    <h1>Complement Problems (Two Sum)</h1>
                </div>
                <div className="xp-badge">+120 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Think in reverse: what complement do we need?</li>
                    <li>Store seen values for O(1) lookup</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">
{`function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map[comp] !== undefined) return [map[comp], i];
    map[nums[i]] = i;
  }
  return null;
}`}
                </pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(n)</span>
                </div>
            </section>

            <section className="problem-card">
                <h3>Array</h3>
                <div className="array-row">
                    {arr.map((v,idx) => (
                        <div key={idx} className={`array-cell ${idx < i ? 'visited' : ''} ${match === idx ? 'match' : ''}`}>
                            {v}
                        </div>
                    ))}
                </div>
                <p className="hint">Target = {target}. Click Step to show what complement we need.</p>
            </section>

            <section className="visualization-panel">
                <h3>Hash Map of seen numbers</h3>
                <div className="hash-map">
                    {Object.entries(seen).map(([k,v]) => (
                        <div key={k} className={`kv-card ${Number(k) === target - (arr[i] ?? 0) ? 'highlight' : ''}`}>
                            <div className="kv-key">{k}</div>
                            <div className="kv-val">index: {v}</div>
                        </div>
                    ))}
                </div>
                {match !== null && <div className="success-message">Found complement at index {match} → pair [{arr[match]}, {arr[match+ (i - match - 1)]}]</div>}

                <div className="controls">
                    <button className="control-btn" onClick={step} disabled={i >= arr.length}>Step</button>
                    <button className="control-btn" onClick={reset}>Reset</button>
                </div>
            </section>

            <section className="concepts-panel">
                <h3>Skills</h3>
                <ul>
                    <li>Thinking in reverse — store seen values as keys for O(1) lookup</li>
                    <li>Use hash map to avoid O(n^2) pair checks</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/Hashing/SubarrayWithHashing" className="next-button">Continue to Level 3: Subarray with Hashing →</a>
            </section>
        </div>
    );
}
