"use client"

import { useState, useEffect } from "react";
import "./styles.css";

const sampleArray = [1, 3, 5, 7, 9, 11, 13, 15];
const targetSum = 16; // 3 + 13 = 16

export default function TwoPointersLevel() {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(sampleArray.length - 1);
    const [isRunning, setIsRunning] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [found, setFound] = useState(false);
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState<string[]>([]);

    const reset = () => {
        setLeft(0);
        setRight(sampleArray.length - 1);
        setIsRunning(false);
        setFound(false);
        setMessage("");
        setHistory([]);
    };

    const currentSum = sampleArray[left] + sampleArray[right];

    useEffect(() => {
        if (!isRunning || found || left >= right) {
            return;
        }

        const timer = setTimeout(() => {
            const sum = sampleArray[left] + sampleArray[right];
            
            if (sum === targetSum) {
                setFound(true);
                setMessage(`✅ Found! ${sampleArray[left]} + ${sampleArray[right]} = ${targetSum}`);
                setIsRunning(false);
                setHistory(prev => [...prev, `Sum = ${sum} → TARGET FOUND!`]);
            } else if (sum < targetSum) {
                setHistory(prev => [...prev, `Sum = ${sum} < ${targetSum} → Move LEFT pointer right`]);
                setLeft(prev => prev + 1);
            } else {
                setHistory(prev => [...prev, `Sum = ${sum} > ${targetSum} → Move RIGHT pointer left`]);
                setRight(prev => prev - 1);
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [isRunning, left, right, found, speed]);

    const stepOnce = () => {
        if (found || left >= right) return;
        
        const sum = sampleArray[left] + sampleArray[right];
        
        if (sum === targetSum) {
            setFound(true);
            setMessage(`✅ Found! ${sampleArray[left]} + ${sampleArray[right]} = ${targetSum}`);
            setHistory(prev => [...prev, `Sum = ${sum} → TARGET FOUND!`]);
        } else if (sum < targetSum) {
            setHistory(prev => [...prev, `Sum = ${sum} < ${targetSum} → Move LEFT pointer right`]);
            setLeft(prev => prev + 1);
        } else {
            setHistory(prev => [...prev, `Sum = ${sum} > ${targetSum} → Move RIGHT pointer left`]);
            setRight(prev => prev - 1);
        }
    };

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 2</span>
                    <h1>Two Pointers</h1>
                </div>
                <div className="xp-badge">+120 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Understand left/right pointer logic</li>
                    <li>Learn shrinking window technique</li>
                    <li>Apply to sorted array problems</li>
                </ul>
            </section>

            {/* Problem Statement */}
            <section className="problem-card">
                <h3>📋 Problem: Two Sum II</h3>
                <p>Given a <strong>sorted</strong> array, find two numbers that add up to <strong>{targetSum}</strong>.</p>
                <p className="hint">💡 Since it's sorted, we can use two pointers instead of brute force O(n²)!</p>
            </section>

            <section className="code-panel">
                <h3>📝 The Algorithm</h3>
                <pre className="code-block">
{`function twoSum(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        
        if (sum === target) return [left, right];
        else if (sum < target) left++;   // Need bigger sum
        else right--;                     // Need smaller sum
    }
    return null;
}`}
                </pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(1)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🔍 Two Pointer Visualization</h3>
                <p className="target-display">Target Sum: <strong>{targetSum}</strong></p>
                
                <div className="array-container two-pointer">
                    {sampleArray.map((value, index) => (
                        <div key={index} className="array-item-wrapper">
                            {/* Pointer indicators */}
                            <div className="pointer-indicators">
                                {index === left && <span className="pointer left-pointer">L ↓</span>}
                                {index === right && <span className="pointer right-pointer">R ↓</span>}
                            </div>
                            <div 
                                className={`array-cell ${
                                    index === left ? 'left-active' : 
                                    index === right ? 'right-active' :
                                    index > left && index < right ? 'in-range' : 'out-range'
                                } ${found && (index === left || index === right) ? 'found' : ''}`}
                            >
                                {value}
                            </div>
                            <span className="array-index">i={index}</span>
                        </div>
                    ))}
                </div>

                <div className="state-display">
                    <div className="state-item">
                        <span className="state-label">Left Value</span>
                        <span className="state-value left-color">{sampleArray[left]}</span>
                    </div>
                    <div className="state-item">
                        <span className="state-label">+ Right Value</span>
                        <span className="state-value right-color">{sampleArray[right]}</span>
                    </div>
                    <div className="state-item">
                        <span className="state-label">= Current Sum</span>
                        <span className={`state-value ${currentSum === targetSum ? 'found-color' : ''}`}>
                            {currentSum}
                        </span>
                    </div>
                </div>

                {message && (
                    <div className="success-message">{message}</div>
                )}

                <div className="controls">
                    <button 
                        className="control-btn primary"
                        onClick={() => setIsRunning(!isRunning)}
                        disabled={found || left >= right}
                    >
                        {isRunning ? "⏸ Pause" : "▶️ Play"}
                    </button>
                    <button 
                        className="control-btn"
                        onClick={stepOnce}
                        disabled={isRunning || found || left >= right}
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
                            min="200" 
                            max="1500" 
                            value={1700 - speed}
                            onChange={(e) => setSpeed(1700 - Number(e.target.value))}
                        />
                    </div>
                </div>
            </section>

            {/* Decision Log */}
            <section className="log-panel">
                <h3>🧠 Decision Log</h3>
                <div className="log-entries">
                    {history.length === 0 ? (
                        <p className="log-empty">Click Play or Step to see the algorithm's decisions...</p>
                    ) : (
                        history.map((entry, i) => (
                            <div key={i} className="log-entry">
                                <span className="log-step">Step {i + 1}:</span> {entry}
                            </div>
                        ))
                    )}
                </div>
            </section>

            <section className="concepts-panel">
                <h3>💡 Why This Works</h3>
                <div className="concept-cards">
                    <div className="concept-card">
                        <h4>Sorted Array Advantage</h4>
                        <p>Since array is sorted, we know moving left pointer right increases sum, moving right pointer left decreases sum.</p>
                    </div>
                    <div className="concept-card">
                        <h4>O(n) vs O(n²)</h4>
                        <p>Brute force checks all pairs. Two pointers eliminates half the search space each step!</p>
                    </div>
                    <div className="concept-card">
                        <h4>Common Interview Problems</h4>
                        <p>Two Sum II, Valid Palindrome, Container With Most Water, Remove Duplicates</p>
                    </div>
                </div>
            </section>

            <section className="next-level">
                <a href="/homepage/Arrays&Strings/SlidingWindow" className="next-button">
                    Continue to Level 3: Sliding Window →
                </a>
            </section>
        </div>
    );
}
