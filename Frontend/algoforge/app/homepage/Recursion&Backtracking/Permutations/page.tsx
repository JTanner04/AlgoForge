"use client"

//Testing files
import { useState, useEffect } from "react";
import "../../shared-level-styles.css";
function testCardinalDay3() {
  console.log("Testing differen pipeline");
}

function permute(nums: number[]): number[][] {
    const res: number[][] = [];
    function backtrack(path: number[], used: boolean[]) {
        if (path.length === nums.length) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.push(nums[i]);
            backtrack(path, used);
            path.pop();
            used[i] = false;
        }
    }
    backtrack([], Array(nums.length).fill(false));
    return res;
}

export default function PermutationsLevel() {
    const [input] = useState([1, 2, 3]);
    const [step, setStep] = useState(0);
    const [tree, setTree] = useState<{ path: number[]; used: boolean[] }[]>([]);
    const [perms, setPerms] = useState<number[][]>([]);
    const [showAll, setShowAll] = useState(false);

    // Precompute the permutation tree for visualization
    function buildTree() {
        const nodes: { path: number[]; used: boolean[] }[] = [];
        function backtrack(path: number[], used: boolean[]) {
            nodes.push({ path: [...path], used: [...used] });
            if (path.length === input.length) return;
            for (let i = 0; i < input.length; i++) {
                if (used[i]) continue;
                used[i] = true;
                path.push(input[i]);
                backtrack(path, used);
                path.pop();
                used[i] = false;
            }
        }
        backtrack([], Array(input.length).fill(false));
        return nodes;
    }

    // On mount, build tree
    useEffect(() => {
        setTree(buildTree());
        setPerms([]);
        setStep(0);
        setShowAll(false);
    }, []);

    // Step through the tree
    const handleStep = () => {
        if (step < tree.length) {
            const node = tree[step];
            if (node.path.length === input.length) {
                setPerms((prev) => [...prev, node.path]);
            }
            setStep(step + 1);
        }
    };
    const handleReset = () => {
        setStep(0);
        setPerms([]);
        setShowAll(false);
    };
    const handleShowAll = () => {
        setPerms(permute(input));
        setShowAll(true);
        setStep(tree.length);
    };

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 3</span>
                    <h1>Permutations</h1>
                </div>
                <div className="xp-badge">+140 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Visualize permutation tree (swap positions)</li>
                    <li>Understand state mutation and backtracking</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">{`function permute(nums) {
  const res = [];
  function backtrack(path, used) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      backtrack(path, used);
      path.pop();
      used[i] = false;
    }
  }
  backtrack([], Array(nums.length).fill(false));
  return res;
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n!)</span>
                    <span className="complexity-badge">Space: O(n!)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🔄 Permutation Tree Visualization</h3>
                <div className="tree-vis">
                    {tree.slice(0, step).map((node, idx) => (
                        <div key={idx} className={`tree-node${node.path.length === input.length ? ' leaf' : ''}`}>
                            <span className="tree-label">{node.path.length === input.length ? 'Leaf' : 'Node'}</span>
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
                    <strong>Permutations:</strong>
                    {perms.map((s, i) => <span key={i} className="subset-chip">[{s.join(", ")}]</span>)}
                </div>
            </section>

            <section className="concepts-panel">
                <h3>Skills</h3>
                <ul>
                    <li>State mutation and restoration</li>
                    <li>Backtracking to explore all orderings</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/Recursion&Backtracking/CombinationSum" className="next-button">Continue to Level 4: Combination Sum →</a>
            </section>
        </div>
    );
}
