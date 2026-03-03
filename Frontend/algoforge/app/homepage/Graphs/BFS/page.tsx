"use client"

import { useState } from "react";
import "./styles.css";

const nodes = ["A", "B", "C", "D", "E", "F"];

const frames = [
    { visited: [], queue: ["A"], distances: { A: 0 } },
    { visited: ["A"], queue: ["B", "C"], distances: { A: 0, B: 1, C: 1 } },
    { visited: ["A", "B"], queue: ["C", "D"], distances: { A: 0, B: 1, C: 1, D: 2 } },
    { visited: ["A", "B", "C"], queue: ["D", "E"], distances: { A: 0, B: 1, C: 1, D: 2, E: 2 } },
    { visited: ["A", "B", "C", "D"], queue: ["E"], distances: { A: 0, B: 1, C: 1, D: 2, E: 2 } },
    { visited: ["A", "B", "C", "D", "E"], queue: ["F"], distances: { A: 0, B: 1, C: 1, D: 2, E: 2, F: 3 } },
    { visited: ["A", "B", "C", "D", "E", "F"], queue: [], distances: { A: 0, B: 1, C: 1, D: 2, E: 2, F: 3 } },
];

export default function GraphBfsLevel() {
    const [step, setStep] = useState(0);
    const frame = frames[step];

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 3</span>
                    <h1>BFS in Graph</h1>
                </div>
                <div className="xp-badge">+240 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Track queue-driven node exploration</li>
                    <li>Label distances from source in an unweighted graph</li>
                    <li>Connect BFS to shortest path intuition</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">{`function bfs(start, graph) {
  const queue = [start];
  const dist = { [start]: 0 };

  while (queue.length) {
    const node = queue.shift();
    for (const nei of graph[node]) {
      if (dist[nei] !== undefined) continue;
      dist[nei] = dist[node] + 1;
      queue.push(nei);
    }
  }

  return dist;
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(V + E)</span>
                    <span className="complexity-badge">Space: O(V)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>📏 Queue Animation + Distance Labels</h3>
                <div className="graph-grid">
                    {nodes.map((n) => (
                        <div key={n} className={`graph-node ${frame.visited.includes(n) ? "visited" : ""}`}>
                            <span>{n}</span>
                            <small>d={frame.distances[n as keyof typeof frame.distances] ?? "∞"}</small>
                        </div>
                    ))}
                </div>

                <div className="queue-panel">
                    <strong>Queue (front on left)</strong>
                    <div className="queue-row">
                        {frame.queue.map((n, i) => <span key={`${n}-${i}`} className="queue-chip">{n}</span>)}
                        {frame.queue.length === 0 && <span className="empty">Queue empty</span>}
                    </div>
                </div>

                <div className="distance-grid">
                    {nodes.map((n) => (
                        <div key={n} className="distance-item">
                            <span>{n}</span>
                            <strong>{frame.distances[n as keyof typeof frame.distances] ?? "∞"}</strong>
                        </div>
                    ))}
                </div>

                <div className="controls">
                    <button className="control-btn" onClick={() => setStep((s) => Math.min(s + 1, frames.length - 1))} disabled={step === frames.length - 1}>⏭ Step BFS</button>
                    <button className="control-btn" onClick={() => setStep(frames.length - 1)} disabled={step === frames.length - 1}>▶ Complete</button>
                    <button className="control-btn" onClick={() => setStep(0)}>🔄 Reset</button>
                </div>
            </section>

            <section className="concepts-panel">
                <h3>💡 Skill</h3>
                <ul>
                    <li>Shortest path in unweighted graph</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/Graphs/CycleDetection" className="next-button">Continue to Level 4: Cycle Detection →</a>
            </section>
        </div>
    );
}
