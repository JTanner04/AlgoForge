"use client"

import { useState } from "react";
import "../../shared-level-styles.css";

// Simple binary tree data
const sampleTree = {
    val: 1,
    left: { val: 2, left: { val: 4 }, right: { val: 5 } },
    right: { val: 3, left: { val: 6 }, right: { val: 7 } }
};

// traversal orders
function preorder(node: any, arr: number[]) {
    if (!node) return;
    arr.push(node.val);
    preorder(node.left, arr);
    preorder(node.right, arr);
}
function inorder(node: any, arr: number[]) {
    if (!node) return;
    inorder(node.left, arr);
    arr.push(node.val);
    inorder(node.right, arr);
}
function postorder(node: any, arr: number[]) {
    if (!node) return;
    postorder(node.left, arr);
    postorder(node.right, arr);
    arr.push(node.val);
}

export default function DFSTraversals() {
    const [order, setOrder] = useState<'pre'|'in'|'post'>('pre');
    const [seq, setSeq] = useState<number[]>([]);
    const [idx, setIdx] = useState(0);

    // compute full sequence when order changes
    const fullSeq: number[] = [];
    if (order === 'pre') preorder(sampleTree, fullSeq);
    if (order === 'in') inorder(sampleTree, fullSeq);
    if (order === 'post') postorder(sampleTree, fullSeq);

    // static layout for sample tree nodes
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

    const visitedSet = new Set(seq);

    const step = () => {
        if (idx < fullSeq.length) {
            setSeq([...seq, fullSeq[idx]]);
            setIdx(idx+1);
        }
    };
    const reset = () => { setSeq([]); setIdx(0); };

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 1</span>
                    <h1>DFS Traversals</h1>
                </div>
                <div className="xp-badge">+120 XP</div>
            </header>
            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Understand preorder / inorder / postorder recursion</li>
                    <li>Follow traversal order using visual tree</li>
                </ul>
            </section>
            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">{`// preorder example
function dfs(node) {
  if (!node) return;
  console.log(node.val);
  dfs(node.left);
  dfs(node.right);
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(n)</span>
                </div>
            </section>
            <section className="visualization-panel">
                <h3>🌳 Tree Visualization</h3>
                {/* simple textual tree */}
                <div className="tree-svg-container">
                    <svg width="320" height="240">
                        {edges.map(([a,b],i)=>(
                            <line key={i} x1={layout[a].x} y1={layout[a].y} x2={layout[b].x} y2={layout[b].y} stroke="#888" strokeWidth="2" />
                        ))}
                        {Object.entries(layout).map(([id,pos]) => (
                            <g key={id} transform={`translate(${pos.x},${pos.y})`}>
                                <circle r="18" fill={visitedSet.has(Number(id)) ? '#22c55e' : '#1e293b'} stroke="#6366f1" strokeWidth="2" />
                                <text x="0" y="4" textAnchor="middle" fill="#e2e8f0" fontSize="14">{id}</text>
                            </g>
                        ))}
                    </svg>
                </div>
                <div className="controls">
                    <select value={order} onChange={e=>{reset(); setOrder(e.target.value as any)}}>
                        <option value="pre">Preorder</option>
                        <option value="in">Inorder</option>
                        <option value="post">Postorder</option>
                    </select>
                    <button className="control-btn" onClick={step} disabled={idx>=fullSeq.length}>Step</button>
                    <button className="control-btn" onClick={reset}>Reset</button>
                </div>
            </section>
            <section className="concepts-panel">
                <h3>Skills</h3>
                <ul>
                    <li>Recursive reasoning in trees</li>
                    <li>Recognize traversal orders</li>
                </ul>
            </section>
            <section className="next-level">
                <a href="/homepage/Trees/BFSLevelOrder" className="next-button">Continue to Level 2: BFS →</a>
            </section>
        </div>
    );
}
