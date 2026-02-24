"use client"

import { useState, useEffect } from "react";
import "./styles.css";

const sampleArray = [2, 4, 1, 3, 5, 2];

export default function PrefixSumLevel() {
    const [prefixSum, setPrefixSum] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isBuilding, setIsBuilding] = useState(false);
    const [buildComplete, setBuildComplete] = useState(false);
    const [queryLeft, setQueryLeft] = useState(1);
    const [queryRight, setQueryRight] = useState(4);
    const [showComparison, setShowComparison] = useState(false);
    const [speed, setSpeed] = useState(600);

    // Build prefix sum array
    useEffect(() => {
        if (!isBuilding || currentIndex >= sampleArray.length - 1) {
            if (currentIndex >= sampleArray.length - 1) {
                setIsBuilding(false);
                setBuildComplete(true);
            }
            return;
        }

        const timer = setTimeout(() => {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            
            setPrefixSum(prev => {
                const lastSum = prev.length > 0 ? prev[prev.length - 1] : 0;
                return [...prev, lastSum + sampleArray[nextIndex]];
            });
        }, speed);

        return () => clearTimeout(timer);
    }, [isBuilding, currentIndex, speed]);

    const reset = () => {
        setPrefixSum([]);
        setCurrentIndex(-1);
        setIsBuilding(false);
        setBuildComplete(false);
        setShowComparison(false);
    };

    const startBuilding = () => {
        reset();
        setIsBuilding(true);
    };

    // Calculate range sum
    const naiveSum = () => {
        let sum = 0;
        for (let i = queryLeft; i <= queryRight; i++) {
            sum += sampleArray[i];
        }
        return sum;
    };

    const prefixSumQuery = () => {
        if (!buildComplete || prefixSum.length === 0) return 0;
        const rightSum = prefixSum[queryRight];
        const leftSum = queryLeft > 0 ? prefixSum[queryLeft - 1] : 0;
        return rightSum - leftSum;
    };

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 4</span>
                    <h1>Prefix Sum</h1>
                </div>
                <div className="xp-badge">+140 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Understand precomputation technique</li>
                    <li>Transform O(n) queries → O(1) queries</li>
                    <li>Trade space for time efficiency</li>
                </ul>
            </section>

            <section className="problem-card">
                <h3>📋 Problem: Range Sum Query</h3>
                <p>Given an array, answer multiple queries asking for the sum of elements between index <strong>left</strong> and <strong>right</strong>.</p>
                <p className="hint">💡 Without preprocessing: O(n) per query. With prefix sum: O(1) per query!</p>
            </section>

            <section className="code-panel">
                <h3>📝 Building Prefix Sum</h3>
                <pre className="code-block">
{`// Build prefix sum array
function buildPrefixSum(arr) {
    const prefix = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        prefix[i] = prefix[i-1] + arr[i];
    }
    return prefix;
}

// Query range sum in O(1)
function rangeSum(prefix, left, right) {
    const rightSum = prefix[right];
    const leftSum = left > 0 ? prefix[left - 1] : 0;
    return rightSum - leftSum;
}`}
                </pre>
                <div className="code-info">
                    <span className="complexity-badge">Build: O(n)</span>
                    <span className="complexity-badge">Query: O(1)</span>
                    <span className="complexity-badge">Space: O(n)</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🔍 Prefix Sum Visualization</h3>
                
                {/* Original Array */}
                <div className="array-section">
                    <h4>Original Array</h4>
                    <div className="array-row">
                        {sampleArray.map((value, index) => (
                            <div 
                                key={index} 
                                className={`prefix-cell ${
                                    index === currentIndex && isBuilding ? 'building' : 
                                    index <= currentIndex ? 'processed' : ''
                                }`}
                            >
                                <span className="cell-value">{value}</span>
                                <span className="cell-index">arr[{index}]</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Build Animation Arrow */}
                {(isBuilding || prefixSum.length > 0) && (
                    <div className="build-arrow">
                        <span>↓ Cumulative Sum ↓</span>
                    </div>
                )}

                {/* Prefix Sum Array */}
                <div className="array-section">
                    <h4>Prefix Sum Array</h4>
                    <div className="array-row">
                        {sampleArray.map((_, index) => (
                            <div 
                                key={index} 
                                className={`prefix-cell prefix ${
                                    index < prefixSum.length ? 'filled' : 'empty'
                                } ${index === currentIndex && isBuilding ? 'current' : ''}`}
                            >
                                <span className="cell-value">
                                    {prefixSum[index] !== undefined ? prefixSum[index] : '?'}
                                </span>
                                <span className="cell-index">pre[{index}]</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Build Controls */}
                {!buildComplete && (
                    <div className="controls">
                        <button 
                            className="control-btn primary"
                            onClick={startBuilding}
                            disabled={isBuilding}
                        >
                            {isBuilding ? "Building..." : "▶️ Build Prefix Sum"}
                        </button>
                        <button className="control-btn" onClick={reset}>
                            🔄 Reset
                        </button>
                    </div>
                )}
            </section>

            {/* Query Section */}
            {buildComplete && (
                <section className="query-panel">
                    <h3>🔎 Range Sum Query</h3>
                    
                    <div className="query-controls">
                        <div className="query-input">
                            <label>Left Index:</label>
                            <input 
                                type="number" 
                                min="0" 
                                max={sampleArray.length - 1}
                                value={queryLeft}
                                onChange={(e) => setQueryLeft(Math.max(0, Math.min(Number(e.target.value), queryRight)))}
                            />
                        </div>
                        <div className="query-input">
                            <label>Right Index:</label>
                            <input 
                                type="number" 
                                min="0" 
                                max={sampleArray.length - 1}
                                value={queryRight}
                                onChange={(e) => setQueryRight(Math.max(queryLeft, Math.min(Number(e.target.value), sampleArray.length - 1)))}
                            />
                        </div>
                    </div>

                    {/* Highlighted Query Range */}
                    <div className="array-section">
                        <h4>Query: Sum from index {queryLeft} to {queryRight}</h4>
                        <div className="array-row">
                            {sampleArray.map((value, index) => (
                                <div 
                                    key={index} 
                                    className={`prefix-cell ${
                                        index >= queryLeft && index <= queryRight ? 'query-range' : 'outside'
                                    }`}
                                >
                                    <span className="cell-value">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Formula */}
                    <div className="formula-display">
                        <div className="formula">
                            <span>prefix[{queryRight}]</span>
                            <span>-</span>
                            <span>{queryLeft > 0 ? `prefix[${queryLeft - 1}]` : '0'}</span>
                            <span>=</span>
                            <span className="result">{prefixSumQuery()}</span>
                        </div>
                        <div className="formula-values">
                            <span>{prefixSum[queryRight]}</span>
                            <span>-</span>
                            <span>{queryLeft > 0 ? prefixSum[queryLeft - 1] : 0}</span>
                            <span>=</span>
                            <span className="result">{prefixSumQuery()}</span>
                        </div>
                    </div>

                    <button 
                        className="control-btn compare-btn"
                        onClick={() => setShowComparison(true)}
                    >
                        📊 Compare with Naive Approach
                    </button>

                    {showComparison && (
                        <div className="comparison">
                            <div className="compare-card naive">
                                <h4>❌ Naive Approach</h4>
                                <pre>
{`for (i = ${queryLeft}; i <= ${queryRight}; i++)
    sum += arr[i];
// ${queryRight - queryLeft + 1} operations`}
                                </pre>
                                <p>Time: <strong>O(n)</strong> per query</p>
                            </div>
                            <div className="compare-card optimal">
                                <h4>✅ Prefix Sum</h4>
                                <pre>
{`prefix[${queryRight}] - prefix[${queryLeft > 0 ? queryLeft - 1 : 0}]
// 2 operations (constant!)`}
                                </pre>
                                <p>Time: <strong>O(1)</strong> per query</p>
                            </div>
                        </div>
                    )}
                </section>
            )}

            <section className="concepts-panel">
                <h3>💡 Key Insights</h3>
                <div className="concept-cards">
                    <div className="concept-card">
                        <h4>Precomputation</h4>
                        <p>Do work upfront (O(n)) to make future queries instant (O(1)).</p>
                    </div>
                    <div className="concept-card">
                        <h4>Space-Time Tradeoff</h4>
                        <p>Use O(n) extra space to save O(n) time per query.</p>
                    </div>
                    <div className="concept-card">
                        <h4>Common Applications</h4>
                        <p>Subarray sum problems, 2D range queries, running averages</p>
                    </div>
                </div>
            </section>

            <section className="next-level">
                <a href="/homepage/Arrays&Strings/BinarySearch" className="next-button">
                    Continue to Level 5: Binary Search →
                </a>
            </section>
        </div>
    );
}
