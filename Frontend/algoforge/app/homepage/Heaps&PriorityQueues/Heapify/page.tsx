"use client"

import { useState } from "react";
import "./styles.css";

const stages = [
    {
        label: "Input Array",
        values: [4, 10, 3, 5, 1],
        description: "Start with an unsorted array.",
    },
    {
        label: "Heapify i = 1",
        values: [4, 10, 3, 5, 1],
        description: "Node 10 already dominates children 5 and 1.",
    },
    {
        label: "Heapify i = 0",
        values: [10, 5, 3, 4, 1],
        description: "Swap 4 down until max-heap property holds.",
    },
] as const;

export default function HeapifyLevel() {
    const [stageIndex, setStageIndex] = useState(0);
    const stage = stages[stageIndex];

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 2</span>
                    <h1>Build Heap (Heapify)</h1>
                </div>
                <div className="xp-badge">+180 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Understand bottom-up heap construction</li>
                    <li>See why heapify starts from the last parent index</li>
                    <li>Connect build-heap to O(n) construction cost</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code (Build Heap)</h3>
                <pre className="code-block">{`function buildMaxHeap(arr) {
  const start = Math.floor(arr.length / 2) - 1;

  for (let i = start; i >= 0; i--) {
    siftDown(arr, i, arr.length);
  }

  return arr;
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Build Heap: O(n)</span>
                    <span className="complexity-badge">Sift Down: O(log n)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🏗 Heapify Stages</h3>

                <div className="stage-grid">
                    {stages.map((item, idx) => (
                        <button key={item.label} className={`stage-card ${idx === stageIndex ? "active" : ""}`} onClick={() => setStageIndex(idx)}>
                            <h4>{item.label}</h4>
                            <p>{item.values.join("  ")}</p>
                        </button>
                    ))}
                </div>

                <div className="queue-visual">
                    <p className="queue-title">Current array state</p>
                    <div className="queue-row">
                        {stage.values.map((value, index) => (
                            <span key={`${value}-${index}`} className="queue-chip">[{index}] {value}</span>
                        ))}
                    </div>
                </div>

                <div className="success-message">{stage.description}</div>

                <div className="controls">
                    <button className="control-btn" onClick={() => setStageIndex((s) => Math.min(s + 1, stages.length - 1))} disabled={stageIndex === stages.length - 1}>⏭ Next Stage</button>
                    <button className="control-btn" onClick={() => setStageIndex(stages.length - 1)} disabled={stageIndex === stages.length - 1}>▶ Complete Build</button>
                    <button className="control-btn" onClick={() => setStageIndex(0)}>🔄 Reset</button>
                </div>
            </section>

            <section className="concepts-panel">
                <h3>💡 Skill</h3>
                <ul>
                    <li>Bottom-up optimization reasoning</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/Heaps&PriorityQueues/PriorityQueueOps" className="next-button">Continue to Level 3: Priority Queue Operations →</a>
            </section>
        </div>
    );
}
