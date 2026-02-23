"use client"

import { useState } from "react";
import "./main.css";

// Level data - you can expand this with your actual content
const levels = [
    { id: 1, title: "Variables", icon: "📦", status: "completed", xp: 50 },
    { id: 2, title: "Data Types", icon: "🔢", status: "completed", xp: 75 },
    { id: 3, title: "Operators", icon: "➕", status: "completed", xp: 60 },
    { id: 4, title: "Conditionals", icon: "🔀", status: "current", xp: 100 },
    { id: 5, title: "Loops", icon: "🔄", status: "locked", xp: 120 },
    { id: 6, title: "Functions", icon: "⚡", status: "locked", xp: 150 },
    { id: 7, title: "Arrays", icon: "📚", status: "locked", xp: 130 },
    { id: 8, title: "Objects", icon: "🎯", status: "locked", xp: 140 },
    { id: 9, title: "Classes", icon: "🏗️", status: "locked", xp: 175 },
    { id: 10, title: "Recursion", icon: "🌀", status: "locked", xp: 200 },
    { id: 11, title: "Sorting", icon: "📊", status: "locked", xp: 180 },
    { id: 12, title: "Searching", icon: "🔍", status: "locked", xp: 160 },
];

export default function HomePage() {
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

    const handleLevelClick = (level: typeof levels[0]) => {
        if (level.status !== "locked") {
            setSelectedLevel(level.id);
        }
    };

    const getNodePosition = (index: number) => {
        // Create a winding path effect
        const amplitude = 80; // How far left/right the path goes
        const offset = Math.sin(index * 0.8) * amplitude;
        return offset;
    };

    return (
        <div className="homepage-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <span className="logo-icon">⚡</span>
                    <span className="logo-text">AlgoForge</span>
                </div>
                
                <nav className="sidebar-nav">
                    <a href="#" className="nav-item active">
                        <span className="nav-icon">🏠</span>
                        <span>Learn</span>
                    </a>
                    <a href="#" className="nav-item">
                        <span className="nav-icon">🏆</span>
                        <span>Leaderboard</span>
                    </a>
                    <a href="#" className="nav-item">
                        <span className="nav-icon">👤</span>
                        <span>Profile</span>
                    </a>
                    <a href="#" className="nav-item">
                        <span className="nav-icon">⚙️</span>
                        <span>Settings</span>
                    </a>
                </nav>

                <div className="sidebar-stats">
                    <div className="stat-item">
                        <span className="stat-icon">🔥</span>
                        <span className="stat-value">7</span>
                        <span className="stat-label">Day Streak</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-icon">💎</span>
                        <span className="stat-value">485</span>
                        <span className="stat-label">Total XP</span>
                    </div>
                </div>
            </aside>

            {/* Main Content - Level Path */}
            <main className="main-content">
                <div className="path-header">
                    <h1>Algorithm Fundamentals</h1>
                    <p>Master the building blocks of programming</p>
                </div>

                <div className="level-path">
                    {/* SVG Path connecting nodes */}
                    <svg className="path-line" viewBox="0 0 200 1400" preserveAspectRatio="none">
                        <path
                            d={levels.map((_, i) => {
                                const x = 100 + getNodePosition(i);
                                const y = 60 + i * 110;
                                return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                            }).join(" ")}
                            fill="none"
                            stroke="rgba(99, 102, 241, 0.3)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        {/* Completed path overlay */}
                        <path
                            d={levels.slice(0, levels.findIndex(l => l.status === "current") + 1).map((_, i) => {
                                const x = 100 + getNodePosition(i);
                                const y = 60 + i * 110;
                                return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                            }).join(" ")}
                            fill="none"
                            stroke="url(#pathGradient)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <defs>
                            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#22c55e" />
                                <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Level Nodes */}
                    <div className="nodes-container">
                        {levels.map((level, index) => (
                            <div
                                key={level.id}
                                className="node-wrapper"
                                style={{ 
                                    transform: `translateX(${getNodePosition(index)}px)`,
                                }}
                            >
                                <button
                                    className={`level-node ${level.status}`}
                                    onClick={() => handleLevelClick(level)}
                                    disabled={level.status === "locked"}
                                >
                                    <span className="node-icon">{level.icon}</span>
                                    {level.status === "completed" && (
                                        <span className="node-check">✓</span>
                                    )}
                                    {level.status === "current" && (
                                        <span className="node-pulse"></span>
                                    )}
                                    {level.status === "locked" && (
                                        <span className="node-lock">🔒</span>
                                    )}
                                </button>
                                <div className={`node-info ${level.status}`}>
                                    <span className="node-title">{level.title}</span>
                                    <span className="node-xp">+{level.xp} XP</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Right Panel - Level Details */}
            <aside className="detail-panel">
                {selectedLevel ? (
                    <div className="level-detail">
                        <div className="detail-header">
                            <span className="detail-icon">
                                {levels.find(l => l.id === selectedLevel)?.icon}
                            </span>
                            <h2>{levels.find(l => l.id === selectedLevel)?.title}</h2>
                        </div>
                        <div className="detail-content">
                            <div className="detail-xp">
                                <span>💎</span>
                                <span>+{levels.find(l => l.id === selectedLevel)?.xp} XP</span>
                            </div>
                            <p className="detail-description">
                                Learn the fundamentals of {levels.find(l => l.id === selectedLevel)?.title.toLowerCase()} 
                                and practice with interactive challenges.
                            </p>
                            <div className="detail-progress">
                                <span>Progress</span>
                                <div className="progress-bar">
                                    <div 
                                        className="progress-fill"
                                        style={{ 
                                            width: levels.find(l => l.id === selectedLevel)?.status === "completed" 
                                                ? "100%" 
                                                : levels.find(l => l.id === selectedLevel)?.status === "current"
                                                ? "35%"
                                                : "0%"
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <button className="start-button">
                                {levels.find(l => l.id === selectedLevel)?.status === "completed" 
                                    ? "Practice Again" 
                                    : "Start Lesson"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="detail-empty">
                        <span className="empty-icon">👆</span>
                        <p>Select a lesson to see details</p>
                    </div>
                )}

                <div className="daily-challenge">
                    <h3>🎯 Daily Challenge</h3>
                    <p>Solve today's algorithm puzzle</p>
                    <button className="challenge-button">Start Challenge</button>
                </div>
            </aside>
        </div>
    );
}
