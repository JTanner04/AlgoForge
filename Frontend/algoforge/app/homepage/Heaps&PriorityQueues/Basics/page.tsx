"use client"

import { useMemo, useState } from "react";
import "./styles.css";

const heapLevels = [
    [90],
    [70, 60],
    [45, 50, 30, 20],
] as const;

const insertionSteps = [
    [90, 70, 60, 45, 50, 30, 20],
    [90, 70, 60, 45, 50, 30, 20, 65],
    [90, 70, 65, 45, 50, 30, 20, 60],
] as const;

export default function HeapsBasicsLevel() {
    const [step, setStep] = useState(0);
    const heapArray = insertionSteps[step];

    const highlighted = useMemo(() => {
        if (step === 0) return new Set<number>();
        if (step === 1) return new Set<number>([7, 3]);
        return new Set<number>([7, 3, 1, 2]);
    }, [step]);

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 1</span>
                    <h1>Heap Basics (Max-Heap)</h1>
                </div>
                <div className="xp-badge">+160 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Understand complete binary tree structure in heaps</li>
                    <li>Map parent/child indices in array representation</li>
                    <li>See how insert uses bubble-up to restore heap order</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code (Insert)</h3>
                <pre className="code-block">{`function insert(heap, value) {
  heap.push(value);
  let i = heap.length - 1;

  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    if (heap[p] >= heap[i]) break;
    [heap[p], heap[i]] = [heap[i], heap[p]];
    i = p;
  }
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Insert: O(log n)</span>
                    <span className="complexity-badge">Peek Max: O(1)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🧩 Insert 65 and Bubble Up</h3>

                <div className="tree-layout">
                    {heapLevels.map((row, rowIndex) => (
                        <div key={rowIndex} className="tree-row">
                            {row.map((value) => (
                                <div key={value} className="tree-value visited">{value}</div>
                            ))}
                        </div>
                    ))}
                    <div className="tree-row">
                        <div className={`tree-value ${step > 0 ? "current" : "ghost"}`}>65</div>
                    </div>
                </div>

                <div className="array-strip">
                    {heapArray.map((value, index) => (
                        <span key={`${value}-${index}`} className={`array-chip ${highlighted.has(index) ? "active" : ""}`}>
                            [{index}] {value}
                        </span>
                    ))}
                </div>

                <div className="controls">
                    <button className="control-btn" onClick={() => setStep((s) => Math.min(s + 1, insertionSteps.length - 1))} disabled={step === insertionSteps.length - 1}>⏭ Step Bubble-Up</button>
                    <button className="control-btn" onClick={() => setStep(insertionSteps.length - 1)} disabled={step === insertionSteps.length - 1}>▶ Complete Insert</button>
                    <button className="control-btn" onClick={() => setStep(0)}>🔄 Reset</button>
                </div>
            </section>

            <section className="concepts-panel">
                <h3>💡 Skill</h3>
                <ul>
                    <li>Array-index reasoning for complete binary trees</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/Heaps&PriorityQueues/Heapify" className="next-button">Continue to Level 2: Build Heap (Heapify) →</a>
            </section>
        </div>
    );
}
