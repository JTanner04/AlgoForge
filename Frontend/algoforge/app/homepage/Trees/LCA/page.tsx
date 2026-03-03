"use client"

import { useMemo, useState } from "react";
import "./styles.css";

const treeRows = [
    [10],
    [6, 14],
    [4, 8, 12, 16],
];

const queries = [
    { id: "4-8", a: 4, b: 8, pathA: [10, 6, 4], pathB: [10, 6, 8], lca: 6 },
    { id: "4-12", a: 4, b: 12, pathA: [10, 6, 4], pathB: [10, 14, 12], lca: 10 },
    { id: "12-16", a: 12, b: 16, pathA: [10, 14, 12], pathB: [10, 14, 16], lca: 14 },
] as const;

export default function TreesLcaLevel() {
    const [queryIndex, setQueryIndex] = useState(0);
    const current = queries[queryIndex];

    const pathASet = useMemo(() => new Set(current.pathA), [current]);
    const pathBSet = useMemo(() => new Set(current.pathB), [current]);

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 4</span>
                    <h1>LCA & Tree Patterns</h1>
                </div>
                <div className="xp-badge">+260 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Trace path from root to each target node</li>
                    <li>Detect path intersection for lowest common ancestor</li>
                    <li>Build path reasoning for tree pattern problems</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code (LCA)</h3>
                <pre className="code-block">{`function lca(root, p, q) {
  if (!root || root === p || root === q) return root;

  const left = lca(root.left, p, q);
  const right = lca(root.right, p, q);

  if (left && right) return root;
  return left || right;
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(h)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🧭 Root Paths + Intersection</h3>
                <div className="toggle-row">
                    {queries.map((query, index) => (
                        <button
                            key={query.id}
                            className={`mini-btn ${queryIndex === index ? "active" : ""}`}
                            onClick={() => setQueryIndex(index)}
                        >
                            {query.a} & {query.b}
                        </button>
                    ))}
                </div>

                <div className="tree-layout">
                    {treeRows.map((row, rowIndex) => (
                        <div key={rowIndex} className="tree-row">
                            {row.map((value) => (
                                <div
                                    key={value}
                                    className={`tree-value ${pathASet.has(value) ? "path-a" : ""} ${pathBSet.has(value) ? "path-b" : ""} ${current.lca === value ? "intersection" : ""}`}
                                >
                                    {value}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="path-grid">
                    <div className="path-card">
                        <span>Path to {current.a}</span>
                        <p>{current.pathA.join(" → ")}</p>
                    </div>
                    <div className="path-card">
                        <span>Path to {current.b}</span>
                        <p>{current.pathB.join(" → ")}</p>
                    </div>
                </div>

                <div className="success-message">Intersection node (LCA): {current.lca}</div>
            </section>

            <section className="world-complete">
                <div className="complete-card">
                    <h2>🌲 Trees World Complete!</h2>
                    <p>You&apos;ve covered DFS, BFS, BST validation, and LCA reasoning.</p>
                    <div className="xp-earned">
                        <span>Total XP Earned:</span>
                        <span className="xp-value">+860 XP</span>
                    </div>
                    <a href="/homepage" className="return-button">🏠 Return to Galaxy</a>
                </div>
            </section>
        </div>
    );
}
