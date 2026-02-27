"use client"

function testCardinalDay3() {
  console.log("Testing differ pipeline");
}
//Testing Files
import { useState, useEffect } from "react";
import "../../shared-level-styles.css";

function combinationSum(candidates: number[], target: number): number[][] {
    const res: number[][] = [];
    function backtrack(remain: number, path: number[], start: number) {
        if (remain === 0) {
            res.push([...path]);
            return;
        }
        if (remain < 0) return;
        for (let i = start; i < candidates.length; i++) {
            path.push(candidates[i]);
            backtrack(remain - candidates[i], path, i);
            path.pop();
        }
    }
    backtrack(target, [], 0);
    return res;
}

export default function CombinationSumLevel() {
    const [input] = useState([2, 3, 6, 7]);
    const [target] = useState(7);
    const [step, setStep] = useState(0);
    const [tree, setTree] = useState<{ path: number[]; remain: number; valid: boolean | null }[]>([]);
    const [combos, setCombos] = useState<number[][]>([]);
    const [showAll, setShowAll] = useState(false);

    // Precompute the tree for visualization
    function buildTree() {
        const nodes: { path: number[]; remain: number; valid: boolean | null }[] = [];
        function backtrack(remain: number, path: number[], start: number) {
            if (remain === 0) {
                nodes.push({ path: [...path], remain, valid: true });
                return;
            }
            if (remain < 0) {
                nodes.push({ path: [...path], remain, valid: false });
                return;
            }
            for (let i = start; i < input.length; i++) {
                path.push(input[i]);
                nodes.push({ path: [...path], remain, valid: null });
                backtrack(remain - input[i], path, i);
                path.pop();
            }
        }
        backtrack(target, [], 0);
        return nodes;
    }

    useEffect(() => {
        setTree(buildTree());
        setCombos([]);
        setStep(0);
        setShowAll(false);
    }, []);

    // Step through the tree
    const handleStep = () => {
        if (step < tree.length) {
            const node = tree[step];
            if (node.valid === true) {
                setCombos((prev) => [...prev, node.path]);
            }
            setStep(step + 1);
        }
    };
    const handleReset = () => {
        setStep(0);
        setCombos([]);
        setShowAll(false);
    };
    const handleShowAll = () => {
        setCombos(combinationSum(input, target));
        setShowAll(true);
        setStep(tree.length);
    };

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 4</span>
                    <h1>Combination Sum</h1>
                </div>
                <div className="xp-badge">+150 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Visualize backtracking with pruning</li>
                    <li>Understand valid/invalid path highlighting</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">{`function combinationSum(candidates, target) {
  const res = [];
  function backtrack(remain, path, start) {
    if (remain === 0) {
      res.push([...path]);
      return;
    }
    if (remain < 0) return;
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      backtrack(remain - candidates[i], path, i);
      path.pop();
    }
  }
  backtrack(target, [], 0);
  return res;
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(2^n)</span>
                    <span className="complexity-badge">Space: O(target)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🌿 Backtracking Tree Visualization</h3>
                <div className="tree-vis">
                    {tree.slice(0, step).map((node, idx) => (
                        <div key={idx} className={`tree-node${node.valid === true ? ' valid' : node.valid === false ? ' invalid' : ''}`}>
                            <span className="tree-label">{node.valid === true ? 'Valid' : node.valid === false ? 'Invalid' : 'Node'}</span>
                            <span className="tree-path">[{node.path.join(", ")}]</span>
                            <span className="tree-remain">remain: {node.remain}</span>
                        </div>
                    ))}
                </div>
                <div className="controls">
                    <button className="control-btn" onClick={handleStep} disabled={step >= tree.length}>Step</button>
                    <button className="control-btn" onClick={handleShowAll} disabled={showAll}>Show All</button>
                    <button className="control-btn" onClick={handleReset}>Reset</button>
                </div>
                <div className="subsets-list">
                    <strong>Combinations:</strong>
                    {combos.map((s, i) => <span key={i} className="subset-chip">[{s.join(", ")}]</span>)}
                </div>
            </section>

            <section className="concepts-panel">
                <h3>Skills</h3>
                <ul>
                    <li>Pruning invalid paths</li>
                    <li>Backtracking to find all valid combinations</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage" className="next-button">🏠 Return to Galaxy</a>
            </section>
        </div>
    );
}
