"use client"

import { useState } from "react";
import "./styles.css";

const nodes = ["A", "B", "C", "D"];
const edges: Array<[string, string]> = [
    ["A", "B"],
    ["B", "C"],
    ["C", "A"],
    ["C", "D"],
];

const frames = [
    { visited: [], stack: [], active: null, backEdge: null, note: "Start DFS from A" },
    { visited: ["A"], stack: ["A"], active: ["A", "B"], backEdge: null, note: "Enter A" },
    { visited: ["A", "B"], stack: ["A", "B"], active: ["B", "C"], backEdge: null, note: "Enter B" },
    { visited: ["A", "B", "C"], stack: ["A", "B", "C"], active: ["C", "A"], backEdge: ["C", "A"], note: "Back-edge found: C → A" },
];

export default function GraphCycleDetectionLevel() {
    const [step, setStep] = useState(0);
    const [graphType, setGraphType] = useState<"directed" | "undirected">("directed");
    const frame = frames[step];

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 4</span>
                    <h1>Cycle Detection</h1>
                </div>
                <div className="xp-badge">+260 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Identify back-edges during DFS traversal</li>
                    <li>Use recursion stack to detect directed cycles</li>
                    <li>Compare directed and undirected cycle intuition</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">{`function hasCycle(node, graph, visited, inStack) {
  visited.add(node);
  inStack.add(node);

  for (const nei of graph[node]) {
    if (!visited.has(nei) && hasCycle(nei, graph, visited, inStack)) {
      return true;
    }
    if (inStack.has(nei)) return true; // back-edge
  }

  inStack.delete(node);
  return false;
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(V + E)</span>
                    <span className="complexity-badge">Space: O(V)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🔁 Back-Edge + Recursion Stack</h3>
                <div className="type-toggle">
                    <button className={`mini-btn ${graphType === "directed" ? "active" : ""}`} onClick={() => setGraphType("directed")}>Directed</button>
                    <button className={`mini-btn ${graphType === "undirected" ? "active" : ""}`} onClick={() => setGraphType("undirected")}>Undirected</button>
                </div>
                <p className="hint">
                    {graphType === "directed"
                        ? "Directed graphs use recursion stack to catch back-edges."
                        : "Undirected graphs ignore parent edge and look for already-visited non-parent neighbors."}
                </p>

                <div className="graph-grid">
                    {nodes.map((n) => (
                        <div key={n} className={`graph-node ${frame.visited.includes(n) ? "visited" : ""} ${frame.stack.includes(n) ? "current" : ""}`}>
                            {n}
                        </div>
                    ))}
                </div>

                <div className="edge-list">
                    <strong>Edges</strong>
                    {edges.map(([u, v]) => {
                        const isBackEdge = frame.backEdge?.[0] === u && frame.backEdge?.[1] === v;
                        return (
                            <div key={`${u}-${v}`} className={`edge-item ${isBackEdge ? "back-edge" : ""}`}>
                                <span>{u} → {v}</span>
                                <span>{isBackEdge ? "Back-edge" : ""}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="stack-panel">
                    <strong>Recursion Stack</strong>
                    <div className="stack-row">
                        {frame.stack.map((n, i) => <span key={`${n}-${i}`} className="stack-chip">{n}</span>)}
                        {frame.stack.length === 0 && <span className="empty">Stack empty</span>}
                    </div>
                </div>

                <p className="success-message">{frame.note}</p>

                <div className="controls">
                    <button className="control-btn" onClick={() => setStep((s) => Math.min(s + 1, frames.length - 1))} disabled={step === frames.length - 1}>⏭ Step</button>
                    <button className="control-btn" onClick={() => setStep(frames.length - 1)} disabled={step === frames.length - 1}>▶ Complete</button>
                    <button className="control-btn" onClick={() => setStep(0)}>🔄 Reset</button>
                </div>
            </section>

            <section className="concepts-panel">
                <h3>💡 Skill</h3>
                <ul>
                    <li>Directed vs undirected cycles</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/Graphs/TopologicalSort" className="next-button">Continue to Level 5: Topological Sort →</a>
            </section>
        </div>
    );
}
