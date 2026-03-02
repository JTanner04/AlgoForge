"use client"

import { useState } from "react";
import "./styles.css";

const nodes = [12, 24, 31, 47, 58];

export default function LinkedListsBasics() {
    const [activeIndex, setActiveIndex] = useState(0);

    const stepForward = () => {
        setActiveIndex((prev) => Math.min(prev + 1, nodes.length - 1));
    };

    const reset = () => setActiveIndex(0);

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Linked Lists</span>
                    <h1>Pointer Traversal Basics</h1>
                </div>
                <div className="xp-badge">+130 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Understand nodes and next pointers</li>
                    <li>Trace how traversal moves one node at a time</li>
                    <li>Recognize O(n) traversal complexity</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">{`function traverse(head) {
  let curr = head;
  while (curr !== null) {
    visit(curr.val);
    curr = curr.next;
  }
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(1)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🔗 Linked List</h3>
                <div className="node-row">
                    {nodes.map((value, index) => (
                        <div key={value} className="node-chain">
                            <div className={`list-node ${index === activeIndex ? "active" : ""} ${index < activeIndex ? "visited" : ""}`}>
                                {value}
                            </div>
                            {index < nodes.length - 1 && <span className="arrow">→</span>}
                        </div>
                    ))}
                    <div className="null-node">null</div>
                </div>

                <div className="state-grid">
                    <div className="state-item">
                        <span className="label">Current Pointer</span>
                        <span className="value">index {activeIndex}</span>
                    </div>
                    <div className="state-item">
                        <span className="label">Current Value</span>
                        <span className="value">{nodes[activeIndex]}</span>
                    </div>
                </div>

                <div className="controls">
                    <button className="control-btn" onClick={stepForward} disabled={activeIndex === nodes.length - 1}>⏭ Step</button>
                    <button className="control-btn" onClick={reset}>🔄 Reset</button>
                </div>
            </section>

            <section className="next-level">
                <a href="/homepage/Stacks&Queues/Basics" className="next-button">Continue to Stacks & Queues →</a>
            </section>
        </div>
    );
}
