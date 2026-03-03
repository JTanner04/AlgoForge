"use client"

import { useState } from "react";
import "./styles.css";

const nodes = ["A", "B", "C", "D", "E", "F"];

const frames = [
    {
        removed: [],
        queue: ["A", "B", "C"],
        indegree: { A: 0, B: 0, C: 0, D: 2, E: 2, F: 2 },
    },
    {
        removed: ["A"],
        queue: ["B", "C"],
        indegree: { A: 0, B: 0, C: 0, D: 1, E: 2, F: 2 },
    },
    {
        removed: ["A", "B"],
        queue: ["C", "D"],
        indegree: { A: 0, B: 0, C: 0, D: 0, E: 1, F: 2 },
    },
    {
        removed: ["A", "B", "C"],
        queue: ["D", "E"],
        indegree: { A: 0, B: 0, C: 0, D: 0, E: 0, F: 2 },
    },
    {
        removed: ["A", "B", "C", "D"],
        queue: ["E"],
        indegree: { A: 0, B: 0, C: 0, D: 0, E: 0, F: 1 },
    },
    {
        removed: ["A", "B", "C", "D", "E"],
        queue: ["F"],
        indegree: { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 },
    },
    {
        removed: ["A", "B", "C", "D", "E", "F"],
        queue: [],
        indegree: { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 },
    },
];

export default function GraphTopoSortLevel() {
    const [step, setStep] = useState(0);
    const frame = frames[step];

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 5</span>
                    <h1>Topological Sort</h1>
                </div>
                <div className="xp-badge">+300 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Track in-degree counts for DAG nodes</li>
                    <li>Simulate Kahn&apos;s removal process</li>
                    <li>Map topological order to scheduling constraints</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">{`function topoSort(graph, indegree) {
  const queue = [];
  for (const node in indegree) {
    if (indegree[node] === 0) queue.push(node);
  }

  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);

    for (const nei of graph[node]) {
      indegree[nei]--;
      if (indegree[nei] === 0) queue.push(nei);
    }
  }

  return order;
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(V + E)</span>
                    <span className="complexity-badge">Space: O(V)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>📋 In-degree Panel + Removal Simulation</h3>
                <div className="graph-grid">
                    {nodes.map((n) => (
                        <div key={n} className={`graph-node ${frame.removed.includes(n) ? "visited" : ""}`}>
                            {n}
                        </div>
                    ))}
                </div>

                <div className="indegree-panel">
                    <strong>In-degree Count</strong>
                    <div className="distance-grid">
                        {nodes.map((n) => (
                            <div key={n} className="distance-item">
                                <span>{n}</span>
                                <strong>{frame.indegree[n as keyof typeof frame.indegree]}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="queue-panel">
                    <strong>Removal Queue (zero in-degree)</strong>
                    <div className="queue-row">
                        {frame.queue.map((n, i) => <span key={`${n}-${i}`} className="queue-chip">{n}</span>)}
                        {frame.queue.length === 0 && <span className="empty">Queue empty</span>}
                    </div>
                </div>

                <div className="visit-strip">
                    <span className="label">Topological Order:</span>
                    {frame.removed.map((n, i) => <span key={`${n}-${i}`} className="visit-chip">{n}</span>)}
                </div>

                <div className="controls">
                    <button className="control-btn" onClick={() => setStep((s) => Math.min(s + 1, frames.length - 1))} disabled={step === frames.length - 1}>⏭ Step Remove</button>
                    <button className="control-btn" onClick={() => setStep(frames.length - 1)} disabled={step === frames.length - 1}>▶ Complete</button>
                    <button className="control-btn" onClick={() => setStep(0)}>🔄 Reset</button>
                </div>
            </section>

            <section className="concepts-panel">
                <h3>💡 Skill</h3>
                <ul>
                    <li>Scheduling problems</li>
                </ul>
            </section>

            <section className="world-complete">
                <div className="complete-card">
                    <h2>⭐ Graphs World Complete!</h2>
                    <p>You&apos;ve learned representation, traversal, cycles, and ordering in graphs.</p>
                    <div className="xp-earned">
                        <span>Total XP Earned:</span>
                        <span className="xp-value">+1230 XP</span>
                    </div>
                    <a href="/homepage" className="return-button">🏠 Return to Galaxy</a>
                </div>
            </section>
        </div>
    );
}
