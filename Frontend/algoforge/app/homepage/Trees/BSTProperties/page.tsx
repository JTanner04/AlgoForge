"use client"

import { useState } from "react";
import "../../shared-level-styles.css";

// BST with a violation (node 5 in right subtree of 2)
const bst = {
    val: 4,
    left: { val: 2, left: { val: 1 }, right: { val: 5 } },
    right: { val: 6, left: { val: 5 }, right: { val: 7 } }
};

function validate(node: any, min: number|null, max: number|null, bad: Set<number>): boolean {
    if (!node) return true;
    if ((min !== null && node.val <= min) || (max !== null && node.val >= max)) {
        bad.add(node.val);
        return false;
    }
    const leftOk: boolean = validate(node.left, min, node.val, bad);
    const rightOk: boolean = validate(node.right, node.val, max, bad);
    return leftOk && rightOk;
}

export default function BSTProperties() {
    const [badNodes] = useState<Set<number>>(() => {
        const s = new Set<number>();
        validate(bst, null, null, s);
        return s;
    });

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 3</span>
                    <h1>BST Properties</h1>
                </div>
                <div className="xp-badge">+140 XP</div>
            </header>
            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Check left &lt; root &lt; right property</li>
                    <li>Detect violations in a tree</li>
                </ul>
            </section>
            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">{`function isValidBST(node, min=null, max=null) {
  if (!node) return true;
  if ((min!==null && node.val<=min) || (max!==null && node.val>=max)) return false;
  return isValidBST(node.left, min, node.val) &&
         isValidBST(node.right, node.val, max);
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(n)</span>
                </div>
            </section>
            <section className="visualization-panel">
                <h3>🌳 Violation Highlight</h3>
                <div className="tree-svg-container">
                    {/* reuse same layout as DFS */}
                    <svg width="320" height="240">
                        {[ [4,2],[4,6],[2,1],[2,5],[6,5],[6,7] ].map(([a,b],i)=>(
                            <line key={i} x1={(a===4?150:a===2?80:a===6?220:(a===1?40:a===5?120:a===7?260:0))} y1={(a===4?40:a===2?120:a===6?120:(a===1?200:a===5?200:a===7?200:0))} x2={(b===4?150:b===2?80:b===6?220:(b===1?40:b===5?120:b===7?260:0))} y2={(b===4?40:b===2?120:b===6?120:(b===1?200:b===5?200:b===7?200:0))} stroke="#888" strokeWidth="2" />
                        ))}
                        {[4,2,6,1,5,5,7].map((id,i)=>(
                            <g key={i} transform={`translate(${id===4?150:id===2?80:id===6?220:id===1?40:id===5?120:260},${id===4?40:id===2?120:id===6?120:id===1?200:id===5?200:200})`}>
                                <circle r="18" fill={badNodes.has(id) ? '#ef4444' : '#1e293b'} stroke="#6366f1" strokeWidth="2" />
                                <text x="0" y="4" textAnchor="middle" fill="#e2e8f0" fontSize="14">{id}</text>
                            </g>
                        ))}
                    </svg>
                </div>
            </section>
            <section className="concepts-panel">
                <h3>Skills</h3>
                <ul>
                    <li>Validate BST invariants</li>
                    <li>Spot where property fails</li>
                </ul>
            </section>
            <section className="next-level">
                <a href="/homepage/Trees/LCAandPatterns" className="next-button">Continue to Level 4: LCA & Patterns →</a>
            </section>
        </div>
    );
}
