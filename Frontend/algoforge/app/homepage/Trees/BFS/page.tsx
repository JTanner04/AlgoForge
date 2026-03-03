"use client"

import { useMemo, useState } from "react";
import "./styles.css";

const bfsLevels = [[10], [6, 14], [4, 8, 12, 16]];

export default function TreesBfsLevel() {
    const [step, setStep] = useState(0);

    const visited = useMemo(() => new Set(bfsLevels.slice(0, step).flat()), [step]);

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 2</span>
                    <h1>BFS (Level Order)</h1>
                </div>
                <div className="xp-badge">+200 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Traverse the tree level by level</li>
                    <li>Understand how a queue drives BFS traversal</li>
                    <li>Practice layer-based traversal reasoning</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code (BFS)</h3>
                <pre className="code-block">{`function bfs(root) {
  if (!root) return [];

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
                <h3>📶 Queue + Level Highlight</h3>
                <div className="split-visual">
                    <div className="tree-layout">
                        {bfsLevels.map((row, rowIndex) => (
                            <div key={rowIndex} className="tree-row">
                                {row.map((value) => (
                                    <div
                                        key={value}
                                        className={`tree-value ${visited.has(value) ? "visited" : ""} ${step > 0 && bfsLevels[step - 1]?.includes(value) ? "current" : ""}`}
                                    >
                                        {value}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="queue-panel">
                        <h4>Queue / Frontier</h4>
                        <div className="queue-row">
                            {(bfsLevels[step] ?? []).map((value) => (
                                <span className="queue-chip" key={value}>{value}</span>
                            ))}
                            {!bfsLevels[step] && <span className="empty">Queue empty</span>}
                        </div>
                        <p className="hint">Current layer: {step < bfsLevels.length ? step + 1 : "Done"}</p>
                    </div>
                </div>

                <div className="controls">
                    <button className="control-btn" onClick={() => setStep((prev) => Math.min(prev + 1, bfsLevels.length))} disabled={step === bfsLevels.length}>⏭ Step Layer</button>
                    <button className="control-btn" onClick={() => setStep(0)}>🔄 Reset</button>
                </div>
            </section>

            <section className="concepts-panel">
                <h3>💡 Skill</h3>
                <ul>
                    <li>Layer-based traversal</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/Trees/BST" className="next-button">Continue to Level 3: BST Properties →</a>
            </section>
        </div>
    );
}
