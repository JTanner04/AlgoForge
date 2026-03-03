"use client"

import { useMemo, useState } from "react";
import "./styles.css";

const nodes = ["A", "B", "C", "D", "E"] as const;

type NodeId = (typeof nodes)[number];
type Edge = [NodeId, NodeId];

export default function GraphRepresentationLevel() {
    const [view, setView] = useState<"list" | "matrix">("list");
    const [from, setFrom] = useState<NodeId>("A");
    const [to, setTo] = useState<NodeId>("B");
    const [edges, setEdges] = useState<Edge[]>([
        ["A", "B"],
        ["A", "C"],
        ["B", "D"],
    ]);

    const addEdge = () => {
        if (from === to) return;
        if (edges.some(([u, v]) => u === from && v === to)) return;
        setEdges((prev) => [...prev, [from, to]]);
    };

    const adjacencyList = useMemo(() => {
        const list: Record<NodeId, NodeId[]> = {
            A: [],
            B: [],
            C: [],
            D: [],
            E: [],
        };

        edges.forEach(([u, v]) => list[u].push(v));
        return list;
    }, [edges]);

    const matrix = useMemo(() => {
        return nodes.map((u) =>
            nodes.map((v) => (edges.some(([a, b]) => a === u && b === v) ? 1 : 0)),
        );
    }, [edges]);

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 1</span>
                    <h1>Graph Representation</h1>
                </div>
                <div className="xp-badge">+210 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Goal: Generalized Trees</h2>
                <ul>
                    <li>Switch between adjacency list and adjacency matrix</li>
                    <li>Build edges and observe representation updates</li>
                    <li>Understand memory representation tradeoffs</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">{`// Adjacency List
const graph = {
  A: ["B", "C"],
  B: ["D"],
  C: [],
  D: [],
};

// Adjacency Matrix
const matrix = [
  [0, 1, 1, 0],
  [0, 0, 0, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">List Space: O(V + E)</span>
                    <span className="complexity-badge">Matrix Space: O(V²)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🧩 Visual Graph Builder</h3>
                <div className="builder-controls">
                    <label>
                        From
                        <select value={from} onChange={(e) => setFrom(e.target.value as NodeId)}>
                            {nodes.map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </label>
                    <label>
                        To
                        <select value={to} onChange={(e) => setTo(e.target.value as NodeId)}>
                            {nodes.map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </label>
                    <button className="control-btn" onClick={addEdge}>+ Add Edge</button>
                </div>

                <div className="graph-canvas">
                    <div className="node-row">
                        {nodes.map((node) => <span key={node} className="node-pill">{node}</span>)}
                    </div>
                    <div className="edge-row">
                        {edges.map(([u, v], idx) => <span key={`${u}-${v}-${idx}`} className="edge-pill">{u} → {v}</span>)}
                    </div>
                </div>

                <div className="toggle-row">
                    <button className={`mini-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")}>Adjacency List</button>
                    <button className={`mini-btn ${view === "matrix" ? "active" : ""}`} onClick={() => setView("matrix")}>Adjacency Matrix</button>
                </div>

                {view === "list" ? (
                    <div className="rep-panel">
                        {nodes.map((n) => (
                            <div key={n} className="rep-row">
                                <strong>{n}:</strong> <span>{adjacencyList[n].join(", ") || "∅"}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="matrix-wrap">
                        <table className="matrix-table">
                            <thead>
                                <tr>
                                    <th></th>
                                    {nodes.map((n) => <th key={n}>{n}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {matrix.map((row, i) => (
                                    <tr key={nodes[i]}>
                                        <th>{nodes[i]}</th>
                                        {row.map((cell, j) => <td key={`${i}-${j}`}>{cell}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <section className="concepts-panel">
                <h3>💡 Skill</h3>
                <ul>
                    <li>Memory representation understanding</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/Graphs/DFS" className="next-button">Continue to Level 2: DFS in Graph →</a>
            </section>
        </div>
    );
}
