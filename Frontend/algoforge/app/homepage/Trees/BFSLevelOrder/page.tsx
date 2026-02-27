"use client"

import { useState } from "react";
import "../../shared-level-styles.css";

const sampleTree = {
    val: 1,
    left: { val: 2, left: { val: 4 }, right: { val: 5 } },
    right: { val: 3, left: { val: 6 }, right: { val: 7 } }
};

function levelOrder(root: any, arr: number[]) {
    if (!root) return;
    const queue = [root];
    while (queue.length) {
        const node = queue.shift();
        arr.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
}

export default function BFSLevelOrder() {
    const [seq, setSeq] = useState<number[]>([]);
    const [idx, setIdx] = useState(0);
    const full: number[] = [];
    levelOrder(sampleTree, full);

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
        if (idx < full.length) {
            setSeq([...seq, full[idx]]);
            setIdx(idx+1);
        }
    };
    const reset = () => { setSeq([]); setIdx(0); };

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 2</span>
                    <h1>BFS (Level Order)</h1>
                </div>
                <div className="xp-badge">+130 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Traverse tree layer by layer using a queue</li>
                    <li>Visualize nodes entering/exiting the queue</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">{`function bfs(root) {
  const q = [root];
  while (q.length) {
    const n = q.shift();
    console.log(n.val);
    if (n.left) q.push(n.left);
    if (n.right) q.push(n.right);
  }
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(n)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🌳 Queue Visualization</h3>
                <div className="queue-view">
                    {seq.map((v,i)=><span key={i} className="queue-item">{v}</span>)}
                </div>
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
                    <button className="control-btn" onClick={step} disabled={idx>=full.length}>Step</button>
                    <button className="control-btn" onClick={reset}>Reset</button>
                </div>
            </section>

            <section className="concepts-panel">
                <h3>Skills</h3>
                <ul>
                    <li>Use queue to track next nodes</li>
                    <li>Visit nodes by level</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/Trees/BSTProperties" className="next-button">Continue to Level 3: BST Properties →</a>
            </section>
        </div>
    );
}
