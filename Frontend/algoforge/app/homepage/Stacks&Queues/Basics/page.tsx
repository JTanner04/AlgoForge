"use client"

import { useState } from "react";
import "./styles.css";

export default function StacksQueuesBasics() {
    const [stack, setStack] = useState<number[]>([3, 7, 9]);
    const [queue, setQueue] = useState<number[]>([4, 6, 8]);
    const [nextValue, setNextValue] = useState(10);

    const pushStack = () => {
        setStack((prev) => [...prev, nextValue]);
        setNextValue((prev) => prev + 1);
    };

    const popStack = () => {
        setStack((prev) => prev.slice(0, -1));
    };

    const enqueue = () => {
        setQueue((prev) => [...prev, nextValue]);
        setNextValue((prev) => prev + 1);
    };

    const dequeue = () => {
        setQueue((prev) => prev.slice(1));
    };

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Stacks & Queues</span>
                    <h1>LIFO vs FIFO Playground</h1>
                </div>
                <div className="xp-badge">+140 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Understand stack operations: push/pop</li>
                    <li>Understand queue operations: enqueue/dequeue</li>
                    <li>See LIFO and FIFO behavior in real time</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">{`// Stack (LIFO)
stack.push(x)
stack.pop()

// Queue (FIFO)
queue.push(x)
queue.shift()`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Push/Pop: O(1)</span>
                    <span className="complexity-badge">Enqueue: O(1)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <div className="lane-grid">
                    <article className="lane-card">
                        <h3>📚 Stack (LIFO)</h3>
                        <div className="stack-column">
                            {stack.length === 0 && <div className="empty">Empty stack</div>}
                            {[...stack].reverse().map((item, idx) => (
                                <div key={`${item}-${idx}`} className={`stack-item ${idx === 0 ? "top" : ""}`}>
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="controls">
                            <button className="control-btn" onClick={pushStack}>Push</button>
                            <button className="control-btn" onClick={popStack} disabled={stack.length === 0}>Pop</button>
                        </div>
                    </article>

                    <article className="lane-card">
                        <h3>🚉 Queue (FIFO)</h3>
                        <div className="queue-row">
                            {queue.length === 0 && <div className="empty">Empty queue</div>}
                            {queue.map((item, idx) => (
                                <div key={`${item}-${idx}`} className={`queue-item ${idx === 0 ? "front" : ""}`}>
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="controls">
                            <button className="control-btn" onClick={enqueue}>Enqueue</button>
                            <button className="control-btn" onClick={dequeue} disabled={queue.length === 0}>Dequeue</button>
                        </div>
                    </article>
                </div>
            </section>

            <section className="next-level">
                <a href="/homepage/Trees/Basics" className="next-button">Continue to Trees →</a>
            </section>
        </div>
    );
}
