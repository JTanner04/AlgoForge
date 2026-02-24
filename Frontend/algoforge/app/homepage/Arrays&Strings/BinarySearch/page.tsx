"use client"

import { useState, useEffect } from "react";
import "./styles.css";

const sampleArray = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
const target = 23;

export default function BinarySearchLevel() {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(sampleArray.length - 1);
    const [mid, setMid] = useState(Math.floor((0 + sampleArray.length - 1) / 2));
    const [isRunning, setIsRunning] = useState(false);
    const [found, setFound] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [speed, setSpeed] = useState(1200);
    const [history, setHistory] = useState<string[]>([]);
    const [eliminated, setEliminated] = useState<number[]>([]);

    const reset = () => {
        setLeft(0);
        setRight(sampleArray.length - 1);
        setMid(Math.floor((0 + sampleArray.length - 1) / 2));
        setIsRunning(false);
        setFound(false);
        setNotFound(false);
        setHistory([]);
        setEliminated([]);
    };

    useEffect(() => {
        if (!isRunning || found || notFound) return;

        const timer = setTimeout(() => {
            const midValue = sampleArray[mid];
            
            if (midValue === target) {
                setFound(true);
                setIsRunning(false);
                setHistory(prev => [...prev, `✅ Found ${target} at index ${mid}!`]);
            } else if (left > right) {
                setNotFound(true);
                setIsRunning(false);
                setHistory(prev => [...prev, `❌ Target ${target} not found in array.`]);
            } else if (midValue < target) {
                const newElim: number[] = [];
                for (let i = left; i <= mid; i++) newElim.push(i);
                setEliminated(prev => [...prev, ...newElim]);
                
                setHistory(prev => [...prev, `arr[${mid}] = ${midValue} < ${target} → Search RIGHT half`]);
                
                const newLeft = mid + 1;
                const newMid = Math.floor((newLeft + right) / 2);
                setLeft(newLeft);
                setMid(newMid);
            } else {
                const newElim: number[] = [];
                for (let i = mid; i <= right; i++) newElim.push(i);
                setEliminated(prev => [...prev, ...newElim]);
                
                setHistory(prev => [...prev, `arr[${mid}] = ${midValue} > ${target} → Search LEFT half`]);
                
                const newRight = mid - 1;
                const newMid = Math.floor((left + newRight) / 2);
                setRight(newRight);
                setMid(newMid);
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [isRunning, left, right, mid, found, notFound, speed]);

    const stepOnce = () => {
        if (found || notFound) return;
        
        const midValue = sampleArray[mid];
        
        if (midValue === target) {
            setFound(true);
            setHistory(prev => [...prev, `✅ Found ${target} at index ${mid}!`]);
        } else if (left > right) {
            setNotFound(true);
            setHistory(prev => [...prev, `❌ Target ${target} not found.`]);
        } else if (midValue < target) {
            const newElim: number[] = [];
            for (let i = left; i <= mid; i++) newElim.push(i);
            setEliminated(prev => [...prev, ...newElim]);
            
            setHistory(prev => [...prev, `arr[${mid}] = ${midValue} < ${target} → Search RIGHT half`]);
            
            const newLeft = mid + 1;
            const newMid = Math.floor((newLeft + right) / 2);
            setLeft(newLeft);
            setMid(newMid);
        } else {
            const newElim: number[] = [];
            for (let i = mid; i <= right; i++) newElim.push(i);
            setEliminated(prev => [...prev, ...newElim]);
            
            setHistory(prev => [...prev, `arr[${mid}] = ${midValue} > ${target} → Search LEFT half`]);
            
            const newRight = mid - 1;
            const newMid = Math.floor((left + newRight) / 2);
            setRight(newRight);
            setMid(newMid);
        }
    };

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 5</span>
                    <h1>Binary Search</h1>
                </div>
                <div className="xp-badge">+160 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Understand divide and conquer strategy</li>
                    <li>Learn loop invariants (what stays true each iteration)</li>
                    <li>Master O(log n) time complexity</li>
                </ul>
            </section>

            <section className="problem-card">
                <h3>📋 Problem: Find Target in Sorted Array</h3>
                <p>Search for <strong>{target}</strong> in the sorted array. Return its index.</p>
                <p className="hint">💡 Each step eliminates half the remaining elements!</p>
            </section>

            <section className="code-panel">
                <h3>📝 The Algorithm</h3>
                <pre className="code-block">
{`function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;  // Not found
}`}
                </pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(log n)</span>
                    <span className="complexity-badge">Space: O(1)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🔍 Binary Search Visualization</h3>
                <p className="target-display">Searching for: <strong>{target}</strong></p>
                
                <div className="binary-array">
                    {sampleArray.map((value, index) => (
                        <div key={index} className="binary-item">
                            <div className="binary-pointers">
                                {index === left && !found && <span className="ptr-label left-ptr">L</span>}
                                {index === mid && !found && <span className="ptr-label mid-ptr">M</span>}
                                {index === right && !found && <span className="ptr-label right-ptr">R</span>}
                            </div>
                            
                            <div 
                                className={`binary-cell ${
                                    found && index === mid ? 'found' :
                                    eliminated.includes(index) ? 'eliminated' :
                                    index >= left && index <= right ? 'active' : ''
                                } ${index === mid && !found && !eliminated.includes(index) ? 'mid-highlight' : ''}`}
                            >
                                {value}
                            </div>
                            <span className="binary-index">{index}</span>
                        </div>
                    ))}
                </div>

                <div className="range-indicator">
                    <div className="range-bar">
                        <div 
                            className="range-active"
                            style={{
                                left: `${(left / sampleArray.length) * 100}%`,
                                width: `${((right - left + 1) / sampleArray.length) * 100}%`
                            }}
                        />
                        {!found && !notFound && (
                            <div 
                                className="mid-marker"
                                style={{ left: `${((mid + 0.5) / sampleArray.length) * 100}%` }}
                            />
                        )}
                    </div>
                    <div className="range-labels">
                        <span>Search Range: [{left}, {right}]</span>
                        <span>Mid Index: {mid}</span>
                        <span>Mid Value: {sampleArray[mid]}</span>
                    </div>
                </div>

                {found && (
                    <div className="success-message">
                        🎉 Found {target} at index {mid} in {history.length} steps!
                    </div>
                )}
                {notFound && (
                    <div className="error-message">
                        ❌ Target {target} not found in array.
                    </div>
                )}

                <div className="controls">
                    <button 
                        className="control-btn primary"
                        onClick={() => setIsRunning(!isRunning)}
                        disabled={found || notFound}
                    >
                        {isRunning ? "⏸ Pause" : "▶️ Play"}
                    </button>
                    <button 
                        className="control-btn"
                        onClick={stepOnce}
                        disabled={isRunning || found || notFound}
                    >
                        ⏭ Step
                    </button>
                    <button className="control-btn" onClick={reset}>
                        🔄 Reset
                    </button>
                    <div className="speed-control">
                        <label>Speed:</label>
                        <input 
                            type="range" 
                            min="400" 
                            max="2000" 
                            value={2400 - speed}
                            onChange={(e) => setSpeed(2400 - Number(e.target.value))}
                        />
                    </div>
                </div>
            </section>

            <section className="log-panel">
                <h3>📜 Search Steps</h3>
                <div className="log-entries">
                    {history.length === 0 ? (
                        <p className="log-empty">Click Play or Step to see the search progress...</p>
                    ) : (
                        history.map((entry, i) => (
                            <div key={i} className="log-entry">
                                <span className="log-step">Step {i + 1}:</span> {entry}
                            </div>
                        ))
                    )}
                </div>
            </section>

            <section className="complexity-panel">
                <h3>📊 Why O(log n)?</h3>
                <div className="complexity-visual">
                    <div className="complexity-example">
                        <p>Array size: <strong>1,000,000</strong> elements</p>
                        <div className="compare-row">
                            <div className="compare-item linear">
                                <span className="compare-label">Linear Search</span>
                                <span className="compare-value">1,000,000 steps</span>
                            </div>
                            <div className="compare-item binary">
                                <span className="compare-label">Binary Search</span>
                                <span className="compare-value">~20 steps</span>
                            </div>
                        </div>
                    </div>
                    <p className="insight">Each step cuts the problem in half: 2²⁰ = 1,048,576</p>
                </div>
            </section>

            <section className="concepts-panel">
                <h3>💡 Key Concepts</h3>
                <div className="concept-cards">
                    <div className="concept-card">
                        <h4>Loop Invariant</h4>
                        <p>If target exists, it&apos;s always within [left, right]. This stays true every iteration.</p>
                    </div>
                    <div className="concept-card">
                        <h4>Divide &amp; Conquer</h4>
                        <p>Divide problem in half each step. Conquer by solving smaller subproblem.</p>
                    </div>
                    <div className="concept-card">
                        <h4>Variations</h4>
                        <p>Find first/last occurrence, search rotated array, find insertion point</p>
                    </div>
                </div>
            </section>

            <section className="world-complete">
                <div className="complete-card">
                    <h2>🎉 World 1 Complete!</h2>
                    <p>You&apos;ve mastered Arrays &amp; Strings fundamentals!</p>
                    <div className="xp-earned">
                        <span>Total XP Earned:</span>
                        <span className="xp-value">+670 XP</span>
                    </div>
                    <a href="/homepage" className="return-button">
                        🏠 Return to Galaxy
                    </a>
                </div>
            </section>
        </div>
    );
}
