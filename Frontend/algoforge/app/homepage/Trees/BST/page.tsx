"use client"

import { useState } from "react";
import "./styles.css";

const validRows = [
    [10],
    [6, 14],
    [4, 8, 12, 16],
];

const invalidRows = [
    [10],
    [6, 14],
    [4, 11, 12, 16],
];

const checks = [
    { id: "r1", relation: "6 < 10", valid: true },
    { id: "r2", relation: "14 > 10", valid: true },
    { id: "r3", relation: "4 < 6", valid: true },
    { id: "r4", relation: "11 < 6", valid: false },
];

export default function TreesBstLevel() {
    const [showViolation, setShowViolation] = useState(false);

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 3</span>
                    <h1>BST Properties</h1>
                </div>
                <div className="xp-badge">+220 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Apply the BST rule: left &lt; root &lt; right</li>
                    <li>Spot invalid nodes that break ordering constraints</li>
                    <li>Practice BST validation problem patterns</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code (Validation)</h3>
                <pre className="code-block">{`function isValidBST(node, min = -Infinity, max = Infinity) {
  if (!node) return true;

  if (node.val <= min || node.val >= max) {
    return false;
  }

  return (
    isValidBST(node.left, min, node.val) &&
    isValidBST(node.right, node.val, max)
  );
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(h)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>✅ Rule + Violation Detection</h3>
                <div className="controls">
                    <button className="control-btn" onClick={() => setShowViolation(false)} disabled={!showViolation}>Show Valid BST</button>
                    <button className="control-btn" onClick={() => setShowViolation(true)} disabled={showViolation}>Show Violation Case</button>
                </div>

                <div className="tree-layout">
                    {(showViolation ? invalidRows : validRows).map((row, rowIndex) => (
                        <div key={rowIndex} className="tree-row">
                            {row.map((value) => (
                                <div key={value} className={`tree-value ${showViolation && value === 11 ? "violation" : "visited"}`}>
                                    {value}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="rule-list">
                    {checks.map((check) => (
                        <div key={check.id} className={`rule-item ${check.valid || !showViolation ? "ok" : "bad"}`}>
                            <span>{check.relation}</span>
                            <strong>{check.valid || !showViolation ? "Valid" : "Violation"}</strong>
                        </div>
                    ))}
                </div>
            </section>

            <section className="concepts-panel">
                <h3>💡 Skill</h3>
                <ul>
                    <li>BST validation problems</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/Trees/LCA" className="next-button">Continue to Level 4: LCA & Tree Patterns →</a>
            </section>
        </div>
    );
}
