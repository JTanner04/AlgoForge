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

const bfsLevels = [[10], [6, 14], [4, 8, 12, 16]];

const bstValidRows = [
    [10],
    [6, 14],
    [4, 8, 12, 16],
];

const bstInvalidRows = [
    [10],
    [6, 14],
    [4, 11, 12, 16],
];

const bstChecks = [
    { node: 6, relation: "6 < 10", valid: true },
    { node: 14, relation: "14 > 10", valid: true },
    { node: 4, relation: "4 < 6", valid: true },
    { node: 11, relation: "11 < 6", valid: false },
];

const lcaQueries = [
    { id: "4-8", a: 4, b: 8, pathA: [10, 6, 4], pathB: [10, 6, 8], lca: 6 },
    { id: "4-12", a: 4, b: 12, pathA: [10, 6, 4], pathB: [10, 14, 12], lca: 10 },
    { id: "12-16", a: 12, b: 16, pathA: [10, 14, 12], pathB: [10, 14, 16], lca: 14 },
] as const;

export default function TreesBasics() {
    const [activeLevel, setActiveLevel] = useState(1);
    const [dfsType, setDfsType] = useState<"pre" | "in" | "post">("pre");
    const [dfsStep, setDfsStep] = useState(0);
    const [bfsStep, setBfsStep] = useState(0);
    const [showInvalidBst, setShowInvalidBst] = useState(false);
    const [queryIndex, setQueryIndex] = useState(0);

    const activeDfsOrder = dfsOrders[dfsType];
    const dfsVisited = useMemo(() => new Set(activeDfsOrder.slice(0, dfsStep)), [activeDfsOrder, dfsStep]);
    const bfsVisited = useMemo(() => new Set(bfsLevels.slice(0, bfsStep).flat()), [bfsStep]);
    const currentQuery = lcaQueries[queryIndex];
    const pathASet = useMemo(() => new Set(currentQuery.pathA), [currentQuery]);
    const pathBSet = useMemo(() => new Set(currentQuery.pathB), [currentQuery]);

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Trees</span>
                    <h1>Tree World: Traversals to LCA</h1>
                </div>
                <div className="xp-badge">+180 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Goal: Hierarchical Thinking</h2>
                <ul>
                    <li>Move from recursive traversals to layer-wise exploration</li>
                    <li>Validate BST structure using ordering constraints</li>
                    <li>Reason about root-to-node paths and LCA intersections</li>
                </ul>
            </section>

            <section className="level-tabs" aria-label="Trees Levels">
                <button className={`level-tab ${activeLevel === 1 ? "active" : ""}`} onClick={() => setActiveLevel(1)}>Level 1: DFS</button>
                <button className={`level-tab ${activeLevel === 2 ? "active" : ""}`} onClick={() => setActiveLevel(2)}>Level 2: BFS</button>
                <button className={`level-tab ${activeLevel === 3 ? "active" : ""}`} onClick={() => setActiveLevel(3)}>Level 3: BST</button>
                <button className={`level-tab ${activeLevel === 4 ? "active" : ""}`} onClick={() => setActiveLevel(4)}>Level 4: LCA</button>
            </section>

            {activeLevel === 1 && (
                <>
                    <section className="concepts-panel">
                        <h3>Level 1: DFS Traversals</h3>
                        <div className="meta-grid">
                            <div className="meta-card"><span>UI</span><p>Tree visual, live traversal order, Pre/In/Post toggle</p></div>
                            <div className="meta-card"><span>Skill</span><p>Recursive tree reasoning</p></div>
                        </div>
                    </section>

                    <section className="visualization-panel">
                        <h3>🌲 DFS Tree Visual</h3>
                        <div className="toggle-row">
                            <button className={`mini-btn ${dfsType === "pre" ? "active" : ""}`} onClick={() => { setDfsType("pre"); setDfsStep(0); }}>Preorder</button>
                            <button className={`mini-btn ${dfsType === "in" ? "active" : ""}`} onClick={() => { setDfsType("in"); setDfsStep(0); }}>Inorder</button>
                            <button className={`mini-btn ${dfsType === "post" ? "active" : ""}`} onClick={() => { setDfsType("post"); setDfsStep(0); }}>Postorder</button>
                        </div>

                        <div className="tree-layout">
                            {treeRows.map((row, rowIndex) => (
                                <div key={rowIndex} className="tree-row">
                                    {row.map((value) => (
                                        <div key={value} className={`tree-value ${dfsVisited.has(value) ? "visited" : ""} ${activeDfsOrder[dfsStep - 1] === value ? "current" : ""}`}>
                                            {value}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="visit-strip">
                            <span className="label">Traversal Order:</span>
                            {activeDfsOrder.slice(0, dfsStep).map((value, idx) => (
                                <span key={`${value}-${idx}`} className="visit-chip">{value}</span>
                            ))}
                            {dfsStep === 0 && <span className="empty">Start stepping to see live order</span>}
                        </div>

                        <div className="controls">
                            <button className="control-btn" onClick={() => setDfsStep((prev) => Math.min(prev + 1, activeDfsOrder.length))} disabled={dfsStep === activeDfsOrder.length}>⏭ Step DFS</button>
                            <button className="control-btn" onClick={() => setDfsStep(activeDfsOrder.length)} disabled={dfsStep === activeDfsOrder.length}>▶ Complete</button>
                            <button className="control-btn" onClick={() => setDfsStep(0)}>🔄 Reset</button>
                        </div>
                    </section>
                </>
            )}

            {activeLevel === 2 && (
                <>
                    <section className="concepts-panel">
                        <h3>Level 2: BFS (Level Order)</h3>
                        <div className="meta-grid">
                            <div className="meta-card"><span>UI</span><p>Queue visual next to tree and level-by-level highlight</p></div>
                            <div className="meta-card"><span>Skill</span><p>Layer-based traversal</p></div>
                        </div>
                    </section>

                    <section className="visualization-panel">
                        <h3>📶 Level-by-Level Traversal</h3>
                        <div className="split-visual">
                            <div className="tree-layout">
                                {bfsLevels.map((row, rowIndex) => (
                                    <div key={rowIndex} className="tree-row">
                                        {row.map((value) => (
                                            <div key={value} className={`tree-value ${bfsVisited.has(value) ? "visited" : ""} ${bfsStep > 0 && bfsLevels[bfsStep - 1]?.includes(value) ? "current" : ""}`}>
                                                {value}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <div className="queue-panel">
                                <h4>Queue / Frontier</h4>
                                <div className="queue-row">
                                    {(bfsLevels[bfsStep] ?? []).map((value) => (
                                        <span className="queue-chip" key={value}>{value}</span>
                                    ))}
                                    {!bfsLevels[bfsStep] && <span className="empty">Queue empty</span>}
                                </div>
                                <p className="hint">Current layer: {bfsStep < bfsLevels.length ? bfsStep + 1 : "Done"}</p>
                            </div>
                        </div>

                        <div className="controls">
                            <button className="control-btn" onClick={() => setBfsStep((prev) => Math.min(prev + 1, bfsLevels.length))} disabled={bfsStep === bfsLevels.length}>⏭ Step Layer</button>
                            <button className="control-btn" onClick={() => setBfsStep(0)}>🔄 Reset</button>
                        </div>
                    </section>
                </>
            )}

            {activeLevel === 3 && (
                <>
                    <section className="concepts-panel">
                        <h3>Level 3: BST Properties</h3>
                        <div className="meta-grid">
                            <div className="meta-card"><span>UI</span><p>Highlight left &lt; root &lt; right with violation detection</p></div>
                            <div className="meta-card"><span>Skill</span><p>BST validation problems</p></div>
                        </div>
                    </section>

                    <section className="visualization-panel">
                        <h3>✅ BST Checker</h3>
                        <div className="controls">
                            <button className="control-btn" onClick={() => setShowInvalidBst(false)} disabled={!showInvalidBst}>Show Valid BST</button>
                            <button className="control-btn" onClick={() => setShowInvalidBst(true)} disabled={showInvalidBst}>Show Violation Case</button>
                        </div>

                        <div className="tree-layout">
                            {(showInvalidBst ? bstInvalidRows : bstValidRows).map((row, rowIndex) => (
                                <div key={rowIndex} className="tree-row">
                                    {row.map((value) => (
                                        <div
                                            key={value}
                                            className={`tree-value ${showInvalidBst && value === 11 ? "violation" : "visited"}`}
                                        >
                                            {value}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="rule-list">
                            {bstChecks.map((check) => (
                                <div key={check.node} className={`rule-item ${check.valid || !showInvalidBst ? "ok" : "bad"}`}>
                                    <span>{check.relation}</span>
                                    <strong>{check.valid || !showInvalidBst ? "Valid" : "Violation"}</strong>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}

            {activeLevel === 4 && (
                <>
                    <section className="concepts-panel">
                        <h3>Level 4: LCA & Tree Patterns</h3>
                        <div className="meta-grid">
                            <div className="meta-card"><span>UI</span><p>Highlight paths from root and detect intersection</p></div>
                            <div className="meta-card"><span>Skill</span><p>Path reasoning</p></div>
                        </div>
                    </section>

                    <section className="visualization-panel">
                        <h3>🧭 Root Paths + LCA</h3>
                        <div className="toggle-row">
                            {lcaQueries.map((query, index) => (
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
                                            className={`tree-value ${pathASet.has(value) ? "path-a" : ""} ${pathBSet.has(value) ? "path-b" : ""} ${currentQuery.lca === value ? "intersection" : ""}`}
                                        >
                                            {value}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="path-grid">
                            <div className="path-card">
                                <span>Path to {currentQuery.a}</span>
                                <p>{currentQuery.pathA.join(" → ")}</p>
                            </div>
                            <div className="path-card">
                                <span>Path to {currentQuery.b}</span>
                                <p>{currentQuery.pathB.join(" → ")}</p>
                            </div>
                        </div>

                        <div className="success-message">Intersection node (LCA): {currentQuery.lca}</div>
                    </section>
                </>
            )}

            <section className="next-level">
                <a href="/homepage" className="next-button">🏠 Return to Galaxy</a>
            </section>
        </div>
    );
}
