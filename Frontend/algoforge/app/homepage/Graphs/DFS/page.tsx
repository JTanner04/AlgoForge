"use client"

import { useState } from "react";
import "./styles.css";

const nodes = ["A", "B", "C", "D", "E", "F"];

const frames = [
    { visited: [], stack: ["A"], current: "A" },
    { visited: ["A"], stack: ["C", "B"], current: "A" },
    { visited: ["A", "B"], stack: ["C", "D"], current: "B" },
    { visited: ["A", "B", "D"], stack: ["C"], current: "D" },
    { visited: ["A", "B", "D", "C"], stack: [], current: "C" },
    { visited: ["A", "B", "D", "C"], stack: ["E"], current: "E" },
    { visited: ["A", "B", "D", "C", "E"], stack: ["F"], current: "E" },
    { visited: ["A", "B", "D", "C", "E", "F"], stack: [], current: "F" },
];

export default function GraphDfsLevel() {
    const [step, setStep] = useState(0);
    const frame = frames[step];

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 2</span>
                    <h1>DFS in Graph</h1>
                </div>
                <div className="xp-badge">+220 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Track DFS expansion with visited colors</li>
                    <li>Understand explicit stack behavior</li>
                    <li>Explore disconnected components</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">{`function dfs(start, graph, visited) {
  const stack = [start];

  while (stack.length) {
    const node = stack.pop();
    if (visited.has(node)) continue;

    visited.add(node);
    for (const nei of graph[node].slice().reverse()) {
      if (!visited.has(nei)) stack.push(nei);
    }
  }
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(V + E)</span>
                    <span className="complexity-badge">Space: O(V)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🎨 Visited Colors + Stack Tracking</h3>
                <div className="graph-grid">
                    {nodes.map((n) => (
                        <div key={n} className={`graph-node ${frame.visited.includes(n) ? "visited" : ""} ${frame.current === n ? "current" : ""}`}>
                            {n}
                        </div>
                    ))}
                </div>

                <div className="stack-panel">
                    <strong>Stack (top on right)</strong>
                    <div className="stack-row">
                        {frame.stack.map((n, i) => <span key={`${n}-${i}`} className="stack-chip">{n}</span>)}
                        {frame.stack.length === 0 && <span className="empty">Stack empty</span>}
                    </div>
                </div>

                <div className="visit-strip">
                    <span className="label">Visited Order:</span>
                    {frame.visited.map((n, i) => <span key={`${n}-${i}`} className="visit-chip">{n}</span>)}
                </div>

                <div className="controls">
                    <button className="control-btn" onClick={() => setStep((s) => Math.min(s + 1, frames.length - 1))} disabled={step === frames.length - 1}>⏭ Step DFS</button>
                    <button className="control-btn" onClick={() => setStep(frames.length - 1)} disabled={step === frames.length - 1}>▶ Complete</button>
                    <button className="control-btn" onClick={() => setStep(0)}>🔄 Reset</button>
                </div>
            </section>

            <section className="concepts-panel">
                <h3>💡 Skill</h3>
                <ul>
                    <li>Component exploration</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/Graphs/BFS" className="next-button">Continue to Level 3: BFS in Graph →</a>
            </section>
        </div>
    );
}
