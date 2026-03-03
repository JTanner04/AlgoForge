"use client"

import { useMemo, useState } from "react";
import "./styles.css";

const treeRows = [
    [10],
    [6, 14],
    [4, 8, 12, 16],
];

const dfsOrders = {
    pre: [10, 6, 4, 8, 14, 12, 16],
    in: [4, 6, 8, 10, 12, 14, 16],
    post: [4, 8, 6, 12, 16, 14, 10],
};

export default function TreesDfsLevel() {
    const [dfsType, setDfsType] = useState<"pre" | "in" | "post">("pre");
    const [step, setStep] = useState(0);

    const activeOrder = dfsOrders[dfsType];
    const visited = useMemo(() => new Set(activeOrder.slice(0, step)), [activeOrder, step]);

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 1</span>
                    <h1>DFS Traversals</h1>
                </div>
                <div className="xp-badge">+180 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Trees World Goal: Hierarchical Thinking</h2>
                <ul>
                    <li>Visualize recursive traversal order in a binary tree</li>
                    <li>Compare Preorder, Inorder, and Postorder patterns</li>
                    <li>Build recursive tree reasoning for interview problems</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code (DFS)</h3>
                <pre className="code-block">{`function dfs(root, type, out = []) {
  if (!root) return out;

  if (type === "pre") out.push(root.val);
  dfs(root.left, type, out);
  if (type === "in") out.push(root.val);
  dfs(root.right, type, out);
  if (type === "post") out.push(root.val);

  return out;
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(h)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🌲 Live Traversal Order</h3>
                <div className="toggle-row">
                    <button className={`mini-btn ${dfsType === "pre" ? "active" : ""}`} onClick={() => { setDfsType("pre"); setStep(0); }}>Preorder</button>
                    <button className={`mini-btn ${dfsType === "in" ? "active" : ""}`} onClick={() => { setDfsType("in"); setStep(0); }}>Inorder</button>
                    <button className={`mini-btn ${dfsType === "post" ? "active" : ""}`} onClick={() => { setDfsType("post"); setStep(0); }}>Postorder</button>
                </div>

                <div className="tree-layout">
                    {treeRows.map((row, rowIndex) => (
                        <div key={rowIndex} className="tree-row">
                            {row.map((value) => (
                                <div
                                    key={value}
                                    className={`tree-value ${visited.has(value) ? "visited" : ""} ${activeOrder[step - 1] === value ? "current" : ""}`}
                                >
                                    {value}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="visit-strip">
                    <span className="label">Traversal Order:</span>
                    {activeOrder.slice(0, step).map((value, idx) => (
                        <span key={`${value}-${idx}`} className="visit-chip">{value}</span>
                    ))}
                    {step === 0 && <span className="empty">Start stepping to traverse</span>}
                </div>

                <div className="controls">
                    <button className="control-btn" onClick={() => setStep((prev) => Math.min(prev + 1, activeOrder.length))} disabled={step === activeOrder.length}>⏭ Step DFS</button>
                    <button className="control-btn" onClick={() => setStep(activeOrder.length)} disabled={step === activeOrder.length}>▶ Complete</button>
                    <button className="control-btn" onClick={() => setStep(0)}>🔄 Reset</button>
                </div>
            </section>

            <section className="concepts-panel">
                <h3>💡 Skill</h3>
                <ul>
                    <li>Recursive tree reasoning</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/Trees/BFS" className="next-button">Continue to Level 2: BFS (Level Order) →</a>
            </section>
        </div>
    );
}
