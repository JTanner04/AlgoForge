"use client"

import { useState } from "react";
import "./styles.css";

const sample = "abracadabra";

export default function FrequencyCounting() {
    const [text, setText] = useState(sample);

    const freq = Array.from(text).reduce<Record<string, number>>((acc, ch) => {
        if (!ch.trim()) return acc;
        acc[ch] = (acc[ch] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 1</span>
                    <h1>Frequency Counting</h1>
                </div>
                <div className="xp-badge">+100 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Understand frequency maps for counting</li>
                    <li>Prepare for sliding-window problems</li>
                    <li>Use hash maps for O(1) lookup</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">
{`function charFrequency(s) {
  const map = {};
  for (const ch of s) {
    if (!ch.trim()) continue;
    map[ch] = (map[ch] || 0) + 1;
  }
  return map;
}`}
                </pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(k)</span>
                </div>
            </section>

            <section className="problem-card">
                <h3>Input String</h3>
                <textarea className="input-text" value={text} onChange={(e) => setText(e.target.value)} rows={3} />
                <p className="hint">Type a string and watch the hash map build live.</p>
            </section>

            <section className="visualization-panel">
                <h3>Hash Map Visual</h3>
                <div className="hash-map">
                    {Object.keys(freq).length === 0 && <div className="empty">No characters yet</div>}
                    {Object.entries(freq).map(([k, v]) => (
                        <div key={k} className="kv-card">
                            <div className="kv-key">'{k}'</div>
                            <div className="kv-val">{v}</div>
                        </div>
                    ))}
                </div>

                <h4>Key-Value Table</h4>
                <table className="kv-table">
                    <thead>
                        <tr><th>Char</th><th>Count</th></tr>
                    </thead>
                    <tbody>
                        {Object.entries(freq).map(([k,v]) => (
                            <tr key={k}><td>{k}</td><td>{v}</td></tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className="concepts-panel">
                <h3>Skills</h3>
                <ul>
                    <li>Anagrams — compare frequency maps</li>
                    <li>Character counting for sliding-window problems</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/Hashing/ComplementProblems" className="next-button">Continue to Level 2: Complement Problems →</a>
            </section>
        </div>
    );
}
