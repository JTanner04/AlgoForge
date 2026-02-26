"use client"

import { useEffect, useState } from "react";
import "./styles.css";

const sample = [1,2,3,7,5];
const target = 12;

export default function SubarrayWithHashing() {
    const [arr] = useState<number[]>(sample);
    const [i, setI] = useState(0);
    const [prefix, setPrefix] = useState(0);
    const [seen, setSeen] = useState<Record<number, number>>({ 0: -1 });
    const [foundRange, setFoundRange] = useState<[number,number] | null>(null);

    const step = () => {
        if (i >= arr.length) return;
        const val = arr[i];
        const newPrefix = prefix + val;
        // if there exists j where prefix[j] = newPrefix - target
        const need = newPrefix - target;
        if (seen[need] !== undefined && foundRange === null) {
            setFoundRange([seen[need] + 1, i]);
        }
        setSeen(s => ({ ...s, [newPrefix]: i }));
        setPrefix(newPrefix);
        setI(i+1);
    };

    const [playing, setPlaying] = useState(false);
    const [speed, setSpeed] = useState(1); // 1x default

    // autoplay effect
    useEffect(() => {
        if (!playing) return;
        const id = setInterval(() => {
            // call step; step will be the latest due to effect deps
            step();
        }, Math.max(120, Math.round(1000 / speed)));
        return () => clearInterval(id);
    }, [playing, speed, i, prefix, seen, foundRange]);

    const reset = () => { setI(0); setPrefix(0); setSeen({ 0: -1 }); setFoundRange(null); };

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 3</span>
                    <h1>Subarray with Hashing</h1>
                </div>
                <div className="xp-badge">+140 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Use prefix sums and a hashmap to detect subarrays summing to K</li>
                    <li>Implement in O(n) time using seen sums</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">
{`function subarraySum(nums, k) {
  const map = {0: -1};
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (map[sum - k] !== undefined) return [map[sum - k] + 1, i];
    map[sum] = i;
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
                <h3>🔢 Array Visualization</h3>
                <div className="array-container-hashing">
                    {arr.map((v, idx) => (
                        <div key={idx} className="array-item-wrapper-hashing">
                            <div 
                                className={`array-bar-hashing ${idx === i ? 'current' : foundRange && idx >= foundRange[0] && idx <= foundRange[1] ? 'match' : ''}`}
                                style={{ height: `${Math.max(32, v * 7)}px` }}
                            >
                                <span className="bar-value-hashing">{v}</span>
                            </div>
                            <span className="array-index-hashing">i={idx}</span>
                        </div>
                    ))}
                </div>
                <div className="stat-row">
                    <div className="stat-card">
                        <div className="label">Current Index</div>
                        <div className="value">{i >= arr.length ? '—' : i}</div>
                    </div>
                    <div className="stat-card">
                        <div className="label">Current Value</div>
                        <div className="value">{i >= arr.length ? '—' : arr[i]}</div>
                    </div>
                    <div className="stat-card highlight">
                        <div className="label">Running Sum</div>
                        <div className="value">{prefix}</div>
                    </div>
                </div>
                <p className="hint">Target = {target}. Step to build running prefix-sum and hash map of sums.</p>
            </section>

            <section className="visualization-panel">
                <h3>Prefix Sums Map</h3>
                <div className="hash-map">
                    {Object.entries(seen).map(([k,v]) => (
                        <div key={k} className="kv-card">
                            <div className="kv-key">{k}</div>
                            <div className="kv-val">idx: {v}</div>
                        </div>
                    ))}
                </div>
                {foundRange && <div className="success-message">Found subarray [{foundRange[0]}, {foundRange[1]}] sum = {target}</div>}

                <div className="controls modern-controls">
                    <button className="play-btn control-btn" onClick={() => setPlaying(p => { const next = !p; if (!next) return false; /* if starting, ensure we aren't already finished */ if (i >= arr.length) { setI(0); setPrefix(0); setSeen({0:-1}); setFoundRange(null); } return true; })} aria-pressed={playing}>
                        {playing ? '⏸ Pause' : '▶ Play'}
                    </button>
                    <button className="control-btn" onClick={step} disabled={i >= arr.length}>⏭ Step</button>
                    <button className="control-btn" onClick={() => { reset(); setPlaying(false); }}>🔄 Reset</button>

                    <div className="speed-control">
                        <label>Speed:</label>
                        <input type="range" min="0.25" max="3" step="0.25" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
                        <span className="speed-value">{speed}x</span>
                    </div>
                </div>
            </section>

            <section className="concepts-panel">
                <h3>Skills</h3>
                <ul>
                    <li>Use hashmap of prefix sums to detect subarrays summing to K in O(n)</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage" className="next-button">🏠 Return to Galaxy</a>
            </section>
        </div>
    );
}
