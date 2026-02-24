"use client"

import { useState, useEffect } from "react";
import "./styles.css";

const sampleString = "abcabcbb";
const chars = sampleString.split("");

export default function SlidingWindowLevel() {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [speed, setSpeed] = useState(800);
    const [charSet, setCharSet] = useState<Set<string>>(new Set([chars[0]]));
    const [maxLength, setMaxLength] = useState(1);
    const [maxWindow, setMaxWindow] = useState({ start: 0, end: 0 });
    const [finished, setFinished] = useState(false);
    const [history, setHistory] = useState<string[]>([`Window: "${chars[0]}", Length: 1`]);

    const reset = () => {
        setLeft(0);
        setRight(0);
        setCharSet(new Set([chars[0]]));
        setMaxLength(1);
        setMaxWindow({ start: 0, end: 0 });
        setIsRunning(false);
        setFinished(false);
        setHistory([`Window: "${chars[0]}", Length: 1`]);
    };

    useEffect(() => {
        if (!isRunning || finished) return;

        const timer = setTimeout(() => {
            if (right >= chars.length - 1) {
                setFinished(true);
                setIsRunning(false);
                setHistory(prev => [...prev, `✅ Done! Longest substring without repeats: "${sampleString.slice(maxWindow.start, maxWindow.end + 1)}" (length ${maxLength})`]);
                return;
            }

            const nextRight = right + 1;
            const nextChar = chars[nextRight];

            if (charSet.has(nextChar)) {
                // Contract window from left until no duplicate
                let newLeft = left;
                const newSet = new Set(charSet);
                
                while (newSet.has(nextChar)) {
                    newSet.delete(chars[newLeft]);
                    newLeft++;
                }
                
                newSet.add(nextChar);
                setLeft(newLeft);
                setRight(nextRight);
                setCharSet(newSet);
                setHistory(prev => [...prev, `'${nextChar}' duplicate! Contract left to ${newLeft}. Window: "${sampleString.slice(newLeft, nextRight + 1)}"`]);
            } else {
                // Expand window
                const newSet = new Set(charSet);
                newSet.add(nextChar);
                setRight(nextRight);
                setCharSet(newSet);
                
                const windowLength = nextRight - left + 1;
                if (windowLength > maxLength) {
                    setMaxLength(windowLength);
                    setMaxWindow({ start: left, end: nextRight });
                    setHistory(prev => [...prev, `Expand! Window: "${sampleString.slice(left, nextRight + 1)}" → New max: ${windowLength}`]);
                } else {
                    setHistory(prev => [...prev, `Expand! Window: "${sampleString.slice(left, nextRight + 1)}", Length: ${windowLength}`]);
                }
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [isRunning, right, left, charSet, maxLength, maxWindow, finished, speed]);

    const currentWindow = sampleString.slice(left, right + 1);

    return (
        <div className="level-container">
            <header className="level-header">
                <a href="/homepage" className="back-button">← Back to Galaxy</a>
                <div className="level-title">
                    <span className="level-badge">Level 3</span>
                    <h1>Sliding Window</h1>
                </div>
                <div className="xp-badge">+150 XP</div>
            </header>

            <section className="objective-card">
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Understand expand/contract window pattern</li>
                    <li>Track state inside the window (using Set/Map)</li>
                    <li>Recognize sliding window problems</li>
                </ul>
            </section>

            <section className="problem-card">
                <h3>📋 Problem: Longest Substring Without Repeating Characters</h3>
                <p>Find the length of the longest substring without repeating characters in <strong>"{sampleString}"</strong></p>
            </section>

            <section className="code-panel">
                <h3>📝 The Algorithm</h3>
                <pre className="code-block">
{`function lengthOfLongestSubstring(s) {
    const seen = new Set();
    let left = 0, maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;  // Contract window
        }
        seen.add(s[right]);  // Expand window
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`}
                </pre>
                <div className="code-info">
                    <span className="complexity-badge">Time: O(n)</span>
                    <span className="complexity-badge">Space: O(min(n, alphabet))</span>
                </div>
            </section>

            <section className="visualization-panel">
                <h3>🔍 Sliding Window Visualization</h3>
                
                <div className="string-container">
                    {chars.map((char, index) => (
                        <div 
                            key={index} 
                            className={`char-cell ${
                                index >= left && index <= right ? 'in-window' : ''
                            } ${index === left ? 'window-left' : ''} ${index === right ? 'window-right' : ''}`}
                        >
                            <span className="char-value">{char}</span>
                            <span className="char-index">{index}</span>
                        </div>
                    ))}
                </div>

                {/* Window highlight bar */}
                <div className="window-bar">
                    <div 
                        className="window-highlight"
                        style={{
                            left: `${left * 60 + 10}px`,
                            width: `${(right - left + 1) * 60 - 10}px`
                        }}
                    />
                </div>

                {/* State Panel */}
                <div className="window-state">
                    <div className="state-row">
                        <div className="state-item">
                            <span className="state-label">Current Window</span>
                            <span className="state-value window-value">"{currentWindow}"</span>
                        </div>
                        <div className="state-item">
                            <span className="state-label">Window Length</span>
                            <span className="state-value">{right - left + 1}</span>
                        </div>
                        <div className="state-item highlight">
                            <span className="state-label">Max Length</span>
                            <span className="state-value max-value">{maxLength}</span>
                        </div>
                    </div>
                    
                    {/* Character Set */}
                    <div className="char-set">
                        <span className="set-label">Characters in Window:</span>
                        <div className="set-items">
                            {Array.from(charSet).map((c, i) => (
                                <span key={i} className="set-item">{c}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {finished && (
                    <div className="success-message">
                        🎉 Longest substring: "{sampleString.slice(maxWindow.start, maxWindow.end + 1)}" (length {maxLength})
                    </div>
                )}

                <div className="controls">
                    <button 
                        className="control-btn primary"
                        onClick={() => setIsRunning(!isRunning)}
                        disabled={finished}
                    >
                        {isRunning ? "⏸ Pause" : "▶️ Play"}
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

            <section className="log-panel">
                <h3>📜 Algorithm Steps</h3>
                <div className="log-entries">
                    {history.map((entry, i) => (
                        <div key={i} className="log-entry">{entry}</div>
                    ))}
                </div>
            </section>

            <section className="concepts-panel">
                <h3>💡 Key Insights</h3>
                <div className="concept-cards">
                    <div className="concept-card">
                        <h4>Window = Subarray/Substring</h4>
                        <p>The window represents a contiguous portion of the input we're examining.</p>
                    </div>
                    <div className="concept-card">
                        <h4>Expand vs Contract</h4>
                        <p>Expand (right++) when valid, Contract (left++) when constraint violated.</p>
                    </div>
                    <div className="concept-card">
                        <h4>When to Use</h4>
                        <p>Subarray sum, Longest substring, Maximum in window, Anagram search</p>
                    </div>
                </div>
            </section>

            <section className="next-level">
                <a href="/homepage/Arrays&Strings/PrefixSum" className="next-button">
                    Continue to Level 4: Prefix Sum →
                </a>
            </section>
        </div>
    );
}
