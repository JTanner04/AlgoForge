"use client"

import { useMemo, useState } from "react";
import "./styles.css";

const data = [12, 5, 31, 17, 42, 8, 26, 39] as const;

export default function TopKLevel() {
    const [k, setK] = useState(3);

    const topK = useMemo(() => {
        return [...data].sort((a, b) => b - a).slice(0, k);
    }, [k]);

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 4</span>
                    <h1>Top K Elements</h1>
                </div>
                <div className="xp-badge">+240 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Use a heap to keep only K best candidates</li>
                    <li>Compare full sort vs heap-based top-k strategy</li>
                    <li>Apply min-heap top-k pattern for streaming inputs</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code (Min-Heap Top K)</h3>
                <pre className="code-block">{`function topK(nums, k) {
  const minHeap = [];

  for (const x of nums) {
    push(minHeap, x);
    if (minHeap.length > k) popMin(minHeap);
  }

  return minHeap.sort((a, b) => b - a);
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n log k)</span>
                    <span className="complexity-badge">Space: O(k)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🥇 Live Top-K Selector</h3>

                <div className="controls">
                    <button className="control-btn" onClick={() => setK((cur) => Math.max(1, cur - 1))} disabled={k === 1}>− Decrease K</button>
                    <button className="control-btn" onClick={() => setK((cur) => Math.min(data.length, cur + 1))} disabled={k === data.length}>+ Increase K</button>
                </div>

                <div className="queue-visual">
                    <p className="queue-title">Input numbers</p>
                    <div className="queue-row">
                        {data.map((value, idx) => (
                            <span key={`${value}-${idx}`} className="queue-chip">{value}</span>
                        ))}
                    </div>
                </div>

                <div className="queue-visual">
                    <p className="queue-title">Top {k} values</p>
                    <div className="queue-row">
                        {topK.map((value, idx) => (
                            <span key={`${value}-${idx}`} className="queue-chip">{value}</span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="world-complete">
                <div className="complete-card">
                    <h2>🌊 Heaps & Priority Queues Complete!</h2>
                    <p>You&apos;ve covered heap structure, heapify, priority operations, and top-k patterns.</p>
                    <div className="xp-earned">
                        <span>Total XP Earned:</span>
                        <span className="xp-value">+790 XP</span>
                    </div>
                    <a href="/homepage" className="return-button">🏠 Return to Galaxy</a>
                </div>
            </section>
        </div>
    );
}
