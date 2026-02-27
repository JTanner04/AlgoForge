"use client"

// Testing files

import { useState } from "react";
import "../../shared-level-styles.css";

function testCardinalDay3() {
  console.log("Testing differnts pipeline");
}
// Example: Factorial recursion
function factorial(n: number, callStack: number[] = []): number {
    if (n === 0) return 1;
    return n * factorial(n - 1, [...callStack, n]);
}

export default function RecursionBasics() {
    // For visualization: stack of calls
    const [input, setInput] = useState(4);
    const [stack, setStack] = useState<number[]>([]);
    const [result, setResult] = useState<number | null>(null);
    const [stepping, setStepping] = useState(false);
    const [stepIdx, setStepIdx] = useState(0);

    // Precompute call stack for visualization
    const callStack: number[] = [];
    let n = input;
    while (n > 0) { callStack.push(n); n--; }
    callStack.push(0); // base case

    const handleStep = () => {
        if (stepIdx < callStack.length) {
            setStack(callStack.slice(0, stepIdx + 1));
            setStepIdx(stepIdx + 1);
            if (stepIdx + 1 === callStack.length) {
                setResult(factorial(input));
            }
        }
    };
    const handleReset = () => {
        setStack([]);
        setStepIdx(0);
        setResult(null);
    };

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 1</span>
                    <h1>Recursion Basics</h1>
                </div>
                <div className="xp-badge">+120 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Understand base case and recursive case</li>
                    <li>Visualize the call stack</li>
                    <li>Follow return flow</li>
                </ul>
            </section>

            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">{`function factorial(n) {
  if (n === 0) return 1; // base case
  return n * factorial(n - 1);
}`}</pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(n)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🗂️ Call Stack Visualization</h3>
                <div className="call-stack-vis">
                    {stack.length === 0 && <div className="stack-empty">(empty)</div>}
                    {stack.map((val, idx) => (
                        <div key={idx} className={`stack-frame${idx === stack.length - 1 ? ' top' : ''}`}>
                            factorial({val})
                        </div>
                    ))}
                </div>
                <div className="controls">
                    <button className="control-btn" onClick={handleStep} disabled={stepIdx >= callStack.length}>Step</button>
                    <button className="control-btn" onClick={handleReset}>Reset</button>
                </div>
                {result !== null && <div className="success-message">Result: {result}</div>}
            </section>

            <section className="concepts-panel">
                <h3>Skills</h3>
                <ul>
                    <li>Base case stops recursion</li>
                    <li>Each call adds a new stack frame</li>
                    <li>Return values flow back up the stack</li>
                </ul>
            </section>

            <section className="next-level">
                <a href="/homepage/Recursion&Backtracking/Subsets" className="next-button">Continue to Level 2: Subsets →</a>
            </section>
        </div>
    );
}
