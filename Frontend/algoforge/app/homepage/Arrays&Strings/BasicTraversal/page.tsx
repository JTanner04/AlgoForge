"use client"

import { useState, useEffect } from "react";
import "./styles.css";

const sampleArray = [5, 12, 8, 3, 19, 7, 15, 2, 11, 6];

export default function BasicTraversalLevel() {
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [isRunning, setIsRunning] = useState(false);
    const [speed, setSpeed] = useState(800);
    const [sum, setSum] = useState(0);
    const [visited, setVisited] = useState<number[]>([]);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

    // Reset function
    const reset = () => {
        setCurrentIndex(-1);
        setSum(0);
        setVisited([]);
        setIsRunning(false);
        setShowQuiz(false);
        setQuizAnswer(null);
    };

    // Step through animation
    useEffect(() => {
        if (!isRunning || currentIndex >= sampleArray.length - 1) {
            if (currentIndex >= sampleArray.length - 1) {
                setIsRunning(false);
                setShowQuiz(true);
            }
            return;
        }

        const timer = setTimeout(() => {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setSum(prev => prev + sampleArray[nextIndex]);
            setVisited(prev => [...prev, nextIndex]);
        }, speed);

        return () => clearTimeout(timer);
    }, [isRunning, currentIndex, speed]);

    // Step once
    const stepOnce = () => {
        if (currentIndex < sampleArray.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setSum(prev => prev + sampleArray[nextIndex]);
            setVisited(prev => [...prev, nextIndex]);
            if (nextIndex >= sampleArray.length - 1) {
                setShowQuiz(true);
            }
        }
    };

    const correctAnswer = sampleArray.reduce((a, b) => a + b, 0);

    return (
        <div className="level-container">
            {/* Header */}
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 1</span>
                    <h1>Traversal & Basics</h1>
                </div>
                <div className="xp-badge">+100 XP</div>
            </header>

            {/* Learning Objective */}
            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Understand how loops iterate through arrays</li>
                    <li>Recognize indexing and off-by-one errors</li>
                    <li>Learn O(n) time complexity</li>
                </ul>
            </section>

            {/* Code Panel */}
            <section className="code-panel">
                <h3>📝 The Code</h3>
                <pre className="code-block">
{`function sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];  // ← We're here!
    }
    return sum;
}`}
                </pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(1)</span>
                </div>
            </section>

            {/* Visualization */}
            <section className="visualization-panel">
                <h3>🔍 Array Visualization</h3>
                
                {/* Array bars */}
                <div className="array-container">
                    {sampleArray.map((value, index) => (
                        <div key={index} className="array-item-wrapper">
                            <div 
                                className={`array-bar ${
                                    index === currentIndex ? 'current' : 
                                    visited.includes(index) ? 'visited' : ''
                                }`}
                                style={{ height: `${value * 8}px` }}
                            >
                                <span className="bar-value">{value}</span>
                            </div>
                            <span className="array-index">i={index}</span>
                        </div>
                    ))}
                </div>

                {/* Current state display */}
                <div className="state-display">
                    <div className="state-item">
                        <span className="state-label">Current Index (i):</span>
                        <span className="state-value">{currentIndex === -1 ? "—" : currentIndex}</span>
                    </div>
                    <div className="state-item">
                        <span className="state-label">Current Value:</span>
                        <span className="state-value">
                            {currentIndex === -1 ? "—" : sampleArray[currentIndex]}
                        </span>
                    </div>
                    <div className="state-item highlight">
                        <span className="state-label">Running Sum:</span>
                        <span className="state-value">{sum}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="controls">
                    <button 
                        className="control-btn primary"
                        onClick={() => setIsRunning(!isRunning)}
                        disabled={currentIndex >= sampleArray.length - 1}
                    >
                        {isRunning ? "⏸ Pause" : "▶️ Play"}
                    </button>
                    <button 
                        className="control-btn"
                        onClick={stepOnce}
                        disabled={isRunning || currentIndex >= sampleArray.length - 1}
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

            {/* Quiz Section */}
            {showQuiz && (
                <section className="quiz-panel">
                    <h3>🧠 Quick Check</h3>
                    <p>What is the final sum of all elements?</p>
                    <div className="quiz-options">
                        {[correctAnswer - 10, correctAnswer, correctAnswer + 5, correctAnswer - 3].sort(() => Math.random() - 0.5).map((option, i) => (
                            <button
                                key={i}
                                className={`quiz-option ${
                                    quizAnswer === option 
                                        ? option === correctAnswer ? 'correct' : 'incorrect'
                                        : ''
                                }`}
                                onClick={() => setQuizAnswer(option)}
                                disabled={quizAnswer !== null}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    {quizAnswer !== null && (
                        <div className={`quiz-feedback ${quizAnswer === correctAnswer ? 'success' : 'error'}`}>
                            {quizAnswer === correctAnswer 
                                ? "✅ Correct! You understand array traversal!"
                                : `❌ Not quite. The sum is ${correctAnswer}. Each element was added once.`
                            }
                        </div>
                    )}
                </section>
            )}

            {/* Key Concepts */}
            <section className="concepts-panel">
                <h3>💡 Key Concepts</h3>
                <div className="concept-cards">
                    <div className="concept-card">
                        <h4>Indexing</h4>
                        <p>Arrays are 0-indexed. First element is at index 0, last at length - 1.</p>
                    </div>
                    <div className="concept-card">
                        <h4>Off-by-One Errors</h4>
                        <p>Common bug: using {"<="} instead of {"<"} causes accessing undefined.</p>
                    </div>
                    <div className="concept-card">
                        <h4>O(n) Time</h4>
                        <p>We visit each element exactly once. Time grows linearly with input size.</p>
                    </div>
                </div>
            </section>

            {/* Next Level */}
            <section className="next-level">
                <a href="/homepage/Arrays&Strings/TwoPointers" className="next-button">
                    Continue to Level 2: Two Pointers →
                </a>
            </section>
        </div>
    );
}
