"use client"

import { useState } from "react";
import "../../shared-level-styles.css";

// same sample tree
const tree = {
    val: 1,
    left: { val: 2, left: { val: 4 }, right: { val: 5 } },
    right: { val: 3, left: { val: 6 }, right: { val: 7 } }
};

// compute path from root to value
function findPath(node: any, val: number, path: number[]): boolean {
    if (!node) return false;
    path.push(node.val);
    if (node.val === val) return true;
    if (findPath(node.left, val, path) || findPath(node.right, val, path)) return true;
    path.pop();
    return false;
}

export default function LCAandPatterns() {
    const [a] = useState(4);
    const [b] = useState(7);
    const pathA: number[] = [];
    const pathB: number[] = [];
    findPath(tree, a, pathA);
    findPath(tree, b, pathB);
    const intersection = pathA.filter(v => pathB.includes(v));
    const lca = intersection[intersection.length-1];

    const layout: Record<number,{x:number,y:number}> = {
        1: { x: 150, y: 40 },
        2: { x: 80, y: 120 },
        3: { x: 220, y: 120 },
        4: { x: 40, y: 200 },
        5: { x: 120, y: 200 },
        6: { x: 200, y: 200 },
        7: { x: 260, y: 200 },
    };
    const edges: [number,number][] = [
        [1,2],[1,3],[2,4],[2,5],[3,6],[3,7]
    ];

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 4</span>
                    <h1>LCA & Tree Patterns</h1>
                </div>
                <div className="xp-badge">+150 XP</div>
            </header>
            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Highlight path from root to nodes</li>
                    <li>Detect intersection (LCA)</li>
                </ul>
            </section>
            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">{`function path(root, val) {
  if (!root) return null;
  if (root.val === val) return [root.val];
  const left = path(root.left,val);
  if (left) return [root.val, ...left];
  const right = path(root.right,val);
  if (right) return [root.val, ...right];
  return null;
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(n)</span>
                </div>
            </section>
            <section className="visualization-panel">
                <h3>🌳 Path Highlight</h3>
                <div className="tree-svg-container">
                    <svg width="320" height="240">
                        {edges.map(([a,b],i)=>(
                            <line key={i} x1={layout[a].x} y1={layout[a].y} x2={layout[b].x} y2={layout[b].y} stroke="#888" strokeWidth="2" />
                        ))}
                        {Object.entries(layout).map(([id,pos]) => {
                            const val = Number(id);
                            const inA = pathA.includes(val);
                            const inB = pathB.includes(val);
                            const isLca = val === lca;
                            return (
                                <g key={id} transform={`translate(${pos.x},${pos.y})`}>
                                    <circle r="18" fill={isLca ? '#fbbf24' : inA || inB ? '#3b82f6' : '#1e293b'} stroke="#6366f1" strokeWidth="2" />
                                    <text x="0" y="4" textAnchor="middle" fill="#e2e8f0" fontSize="14">{id}</text>
                                </g>
                            );
                        })}
                    </svg>
                </div>
                <div className="info-panel">
                    <p>Path A: [{pathA.join(', ')}]</p>
                    <p>Path B: [{pathB.join(', ')}]</p>
                    <p>Lowest Common Ancestor: {lca}</p>
                </div>
            </section>
            <section className="concepts-panel">
                <h3>Skills</h3>
                <ul>
                    <li>Trace paths in tree</li>
                    <li>Find intersection for LCA</li>
                </ul>
            </section>
            <section className="next-level">
                <a href="/homepage" className="next-button">🏠 Return to Galaxy</a>
            </section>
        </div>
    );
}
