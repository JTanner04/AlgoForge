"use client"

import { useMemo, useState } from "react";
import "./styles.css";

const tasks = [
    { id: 1, name: "Fix outage", priority: 98 },
    { id: 2, name: "Security patch", priority: 92 },
    { id: 3, name: "Scale database", priority: 84 },
    { id: 4, name: "UI polish", priority: 55 },
    { id: 5, name: "Docs update", priority: 40 },
] as const;

export default function PriorityQueueOpsLevel() {
    const [completedCount, setCompletedCount] = useState(0);

    const ordered = useMemo(
        () => [...tasks].sort((a, b) => b.priority - a.priority),
        [],
    );

    const doneIds = new Set(ordered.slice(0, completedCount).map((task) => task.id));
    const queueView = ordered.slice(completedCount).map((task) => `${task.name} (${task.priority})`);

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 3</span>
                    <h1>Priority Queue Operations</h1>
                </div>
                <div className="xp-badge">+210 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Model priority-first processing with a max-heap</li>
                    <li>Practice push/pop semantics in a priority queue</li>
                    <li>Recognize where PQ beats plain queue ordering</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code (Pop Highest Priority)</h3>
                <pre className="code-block">{`function popMax(heap) {
  if (heap.length === 0) return null;

  const top = heap[0];
  heap[0] = heap[heap.length - 1];
  heap.pop();
  siftDown(heap, 0, heap.length);

  return top;
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Push: O(log n)</span>
                    <span className="complexity-badge">Pop: O(log n)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>📌 Incident Triage Simulation</h3>

                <div className="task-row">
                    {ordered.map((task) => (
                        <div key={task.id} className={`task-item ${doneIds.has(task.id) ? "done" : ""}`}>
                            <span>{task.name}</span>
                            <strong>P={task.priority}</strong>
                        </div>
                    ))}
                </div>

                <div className="queue-visual">
                    <p className="queue-title">Queue front → back</p>
                    <div className="queue-row">
                        {queueView.map((item, idx) => (
                            <span key={`${item}-${idx}`} className="queue-chip">{item}</span>
                        ))}
                        {queueView.length === 0 && <span className="empty">Queue empty</span>}
                    </div>
                </div>

                <div className="controls">
                    <button className="control-btn" onClick={() => setCompletedCount((c) => Math.min(c + 1, ordered.length))} disabled={completedCount === ordered.length}>⏭ Pop Highest Priority</button>
                    <button className="control-btn" onClick={() => setCompletedCount(ordered.length)} disabled={completedCount === ordered.length}>▶ Drain Queue</button>
                    <button className="control-btn" onClick={() => setCompletedCount(0)}>🔄 Reset</button>
                </div>
            </section>

            <section className="concepts-panel">
                <h3>💡 Skill</h3>
                <ul>
                    <li>Greedy scheduling with ranked urgency</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/Heaps&PriorityQueues/TopK" className="next-button">Continue to Level 4: Top K Elements →</a>
            </section>
        </div>
    );
}
