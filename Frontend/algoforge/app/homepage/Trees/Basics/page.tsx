"use client"

import { useMemo, useState } from "react";
import "./styles.css";

const levels = [
    [10],
    [6, 14],
    [4, 8, 12, 16],
];

const bfsOrder = [10, 6, 14, 4, 8, 12, 16];

export default function TreesBasics() {
    const [step, setStep] = useState(0);

    const visitedSet = useMemo(() => new Set(bfsOrder.slice(0, step)), [step]);

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Trees</span>
                    <h1>BFS Traversal Visualizer</h1>
                </div>
                <div className="xp-badge">+180 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Understand parent-child node relationships</li>
                    <li>Practice breadth-first traversal (level order)</li>
                    <li>Track queue-driven tree exploration</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">{`function bfs(root) {
  const queue = [root];
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return order;
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(n)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🌲 Binary Tree</h3>
                <div className="tree-layout">
                    {levels.map((row, rowIndex) => (
                        <div key={rowIndex} className="tree-row">
                            {row.map((value) => (
                                <div key={value} className={`tree-value ${visitedSet.has(value) ? "visited" : ""}`}>
                                    {value}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="visit-strip">
                    <span className="label">BFS Order:</span>
                    {bfsOrder.slice(0, step).map((value, idx) => (
                        <span key={`${value}-${idx}`} className="visit-chip">{value}</span>
                    ))}
                    {step === 0 && <span className="empty">Start stepping to traverse</span>}
                </div>

                <div className="controls">
                    <button className="control-btn" onClick={() => setStep((prev) => Math.min(prev + 1, bfsOrder.length))} disabled={step === bfsOrder.length}>⏭ Step BFS</button>
                    <button className="control-btn" onClick={() => setStep(bfsOrder.length)} disabled={step === bfsOrder.length}>▶ Complete</button>
                    <button className="control-btn" onClick={() => setStep(0)}>🔄 Reset</button>
                </div>
            </section>

            <section className="next-level">
                <a href="/homepage" className="next-button">🏠 Return to Galaxy</a>
            </section>
        </div>
    );
}
