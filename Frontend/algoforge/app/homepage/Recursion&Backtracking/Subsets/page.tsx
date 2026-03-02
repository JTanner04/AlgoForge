"use client"

import { useState, useEffect } from "react";
import "./styles.css";

// Helper to generate all subsets (power set)
function generateSubsets(arr: number[]): number[][] {
    const res: number[][] = [];
    function dfs(idx: number, path: number[]) {
        if (idx === arr.length) {
            res.push([...path]);
            return;
        }
        // Exclude
        dfs(idx + 1, path);
        // Include
        path.push(arr[idx]);
        dfs(idx + 1, path);
        path.pop();
    }
    dfs(0, []);
    return res;
}

export default function SubsetsLevel() {
    const [input] = useState([1, 2, 3]);
    const [step, setStep] = useState(0);
    const [tree, setTree] = useState<{ path: number[]; idx: number; include: boolean | null }[]>([]);
    const [subsets, setSubsets] = useState<number[][]>([]);
    const [showAll, setShowAll] = useState(false);

    // Precompute the binary tree of decisions for visualization
    function buildTree() {
        const nodes: { path: number[]; idx: number; include: boolean | null }[] = [];
        function dfs(idx: number, path: number[]) {
            if (idx === input.length) {
                nodes.push({ path: [...path], idx, include: null });
                return;
            }
            // Exclude
            nodes.push({ path: [...path], idx, include: false });
            dfs(idx + 1, path);
            // Include
            path.push(input[idx]);
            nodes.push({ path: [...path], idx, include: true });
            dfs(idx + 1, path);
            path.pop();
        }
        dfs(0, []);
        return nodes;
    }

    // On mount, build tree
    useEffect(() => {
        setTree(buildTree());
        setSubsets([]);
        setStep(0);
        setShowAll(false);
    }, []);

    // Step through the tree
    const handleStep = () => {
        if (step < tree.length) {
            const node = tree[step];
            if (node.idx === input.length) {
                setSubsets((prev) => [...prev, node.path]);
            }
            setStep(step + 1);
        }
    };
    const handleReset = () => {
        setStep(0);
        setSubsets([]);
        setShowAll(false);
    };
    const handleShowAll = () => {
        setSubsets(generateSubsets(input));
        setShowAll(true);
        setStep(tree.length);
    };

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 2</span>
                    <h1>Subsets (Power Set)</h1>
                </div>
                <div className="xp-badge">+130 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Visualize binary decision tree (include/exclude)</li>
                    <li>Understand power set generation</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">{`function subsets(nums) {
  const res = [];
  function dfs(i, path) {
    if (i === nums.length) {
      res.push([...path]);
      return;
    }
    dfs(i+1, path); // Exclude
    path.push(nums[i]);
    dfs(i+1, path); // Include
    path.pop();
  }
  dfs(0, []);
  return res;
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(2^n)</span>
                    <span className="complexity-badge">Space: O(2^n)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🌳 Decision Tree Visualization</h3>
                <div className="tree-vis">
                    {tree.slice(0, step).map((node, idx) => (
                        <div key={idx} className={`tree-node${node.include === true ? ' include' : node.include === false ? ' exclude' : ' leaf'}`}>
                            <span className="tree-label">{node.include === null ? 'Leaf' : node.include ? 'Include' : 'Exclude'}</span>
                            <span className="tree-path">[{node.path.join(", ")}]</span>
                        </div>
                    ))}
                </div>
                <div className="controls">
                    <button className="control-btn" onClick={handleStep} disabled={step >= tree.length}>Step</button>
                    <button className="control-btn" onClick={handleShowAll} disabled={showAll}>Show All</button>
                    <button className="control-btn" onClick={handleReset}>Reset</button>
                </div>
                <div className="subsets-list">
                    <strong>Subsets:</strong>
                    {subsets.map((s, i) => <span key={i} className="subset-chip">[{s.join(", ")}]</span>)}
                </div>
            </section>

            <section className="concepts-panel">
                <h3>Skills</h3>
                <ul>
                    <li>Recursive branching: include/exclude</li>
                    <li>Power set = all possible subsets</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/Recursion&Backtracking/Permutations" className="next-button">Continue to Level 3: Permutations →</a>
            </section>
        </div>
    );
}
