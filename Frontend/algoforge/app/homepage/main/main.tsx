"use client"

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./main.css";

// Algorithm Worlds - each level is a planet to explore
const levels = [
    { id: 1, title: "Arrays & Strings", icon: "🪐", status: "completed", xp: 100, color: "#22c55e" },
    { id: 2, title: "Hashing (Maps & Sets)", icon: "🌍", status: "completed", xp: 120, color: "#3b82f6" },
    { id: 3, title: "Recursion & Backtracking", icon: "🌙", status: "completed", xp: 150, color: "#94a3b8" },
    { id: 4, title: "Linked Lists", icon: "🔴", status: "completed", xp: 130, color: "#ef4444" },
    { id: 5, title: "Stacks & Queues", icon: "🟠", status: "completed", xp: 140, color: "#f97316" },
    { id: 6, title: "Trees", icon: "💜", status: "completed", xp: 180, color: "#a855f7" },
    { id: 7, title: "Heaps & Priority Queues", icon: "🌊", status: "current", xp: 160, color: "#06b6d4" },
    { id: 8, title: "Graphs", icon: "⭐", status: "current", xp: 200, color: "#fbbf24" },
    { id: 9, title: "Dynamic Programming", icon: "🪨", status: "current", xp: 250, color: "#78716c" },
];

// Generate random stars for the hyperspace effect
const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 0.3,
    }));
};

const stars = generateStars(200);

export default function HomePage() {
    const router = useRouter();
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
    const [isHyperspace, setIsHyperspace] = useState(false);
    const [targetWorld, setTargetWorld] = useState<typeof levels[0] | null>(null);

    const handleTravelToWorld = useCallback((level: typeof levels[0]) => {
        if (level.status === "locked") return;

        setSelectedLevel(level.id);
        setTargetWorld(level);
        setIsHyperspace(true);

        // After hyperspace animation, navigate to the level
        setTimeout(() => {
            // Route to the appropriate world's first level
            if (level.id === 1) {
                router.push('/homepage/Arrays&Strings/BasicTraversal');
            } else if (level.id === 2) {
                router.push('/homepage/Hashing/FrequencyCounting');
            } else if (level.id === 3) {
                router.push('/homepage/Recursion&Backtracking/RecursionBasics');
            } else if (level.id === 4) {
                router.push('/homepage/LinkedLists/Basics');
            } else if (level.id === 5) {
                router.push('/homepage/Stacks&Queues/Basics');
            } else if (level.id === 6) {
                router.push('/homepage/Trees/Basics');
            } else if (level.id === 7) {
                router.push('/homepage/Heaps&PriorityQueues/Basics');
            } else if (level.id === 8) {
                router.push('/homepage/Graphs/Representation');
            } else if (level.id === 9) {
                router.push('/homepage/DynamicProgramming/Memoization');
            } else {
                router.push(`/level/${level.id}`);
            }
        }, 2500);
    }, [router]);

    const getNodePosition = (index: number) => {
        // Create a winding path effect
        const amplitude = 80;
        const offset = Math.sin(index * 0.8) * amplitude;
        return offset;
    };

    return (
        <div className={`homepage-container ${isHyperspace ? 'hyperspace-active' : ''}`}>
            {/* Hyperspace Overlay */}
            {isHyperspace && (
                <div className="hyperspace-overlay">
                    <div className="stars-container">
                        {stars.map((star) => (
                            <div
                                key={star.id}
                                className="star-streak"
                                style={{
                                    left: `${star.x}%`,
                                    top: `${star.y}%`,
                                    width: `${star.size}px`,
                                    animationDelay: `${star.delay}s`,
                                }}
                            />
                        ))}
                    </div>
                    <div className="hyperspace-destination">
                        <div className="destination-planet" style={{ background: `radial-gradient(circle at 30% 30%, ${targetWorld?.color}, #000)` }}>
                            <span className="destination-icon">{targetWorld?.icon}</span>
                        </div>
                        <h2 className="destination-title">Traveling to {targetWorld?.title}</h2>
                        <p className="destination-subtitle">Entering hyperspace...</p>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <span className="logo-icon">⚡</span>
                    <span className="logo-text">AlgoForge</span>
                </div>
                
                <nav className="sidebar-nav">
                    <Link href="/homepage" className="nav-item active">
                        <span className="nav-icon">🏠</span>
                        <span>Learn</span>
                    </Link>
                    <a href="#" className="nav-item">
                        <span className="nav-icon">🏆</span>
                        <span>Leaderboard</span>
                    </a>
                    <Link href="/profile" className="nav-item">
                        <span className="nav-icon">👤</span>
                        <span>Profile</span>
                    </Link>
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
                    <h1>Algorithm Galaxy</h1>
                    <p>Explore worlds and master data structures & algorithms</p>
                </div>

                <div className="level-path">
                    {/* SVG Path connecting nodes - smooth curved line */}
                    <svg className="path-line" viewBox="0 0 300 1250" preserveAspectRatio="none">
                        {/* Glow filter for the path */}
                        <defs>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#22c55e" />
                                <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                            <linearGradient id="lockedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.3)" />
                                <stop offset="100%" stopColor="rgba(99, 102, 241, 0.15)" />
                            </linearGradient>
                        </defs>
                        
                        {/* Background path (locked portion) */}
                        <path
                            d={(() => {
                                let path = "";
                                const nodeSpacing = 138; // Match CSS gap
                                levels.forEach((_, i) => {
                                    const x = 150 + getNodePosition(i);
                                    const y = 55 + i * nodeSpacing;
                                    if (i === 0) {
                                        path += `M ${x} ${y}`;
                                    } else {
                                        const prevX = 150 + getNodePosition(i - 1);
                                        const prevY = 55 + (i - 1) * nodeSpacing;
                                        const cpY = (prevY + y) / 2;
                                        path += ` C ${prevX} ${cpY}, ${x} ${cpY}, ${x} ${y}`;
                                    }
                                });
                                return path;
                            })()}
                            fill="none"
                            stroke="url(#lockedGradient)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#glow)"
                            strokeDasharray="12 8"
                        />
                        
                        {/* Completed/Active path overlay */}
                        <path
                            d={(() => {
                                let path = "";
                                const nodeSpacing = 138; // Match CSS gap
                                const activeIndex = levels.findIndex(l => l.status === "current");
                                levels.slice(0, activeIndex + 1).forEach((_, i) => {
                                    const x = 150 + getNodePosition(i);
                                    const y = 55 + i * nodeSpacing;
                                    if (i === 0) {
                                        path += `M ${x} ${y}`;
                                    } else {
                                        const prevX = 150 + getNodePosition(i - 1);
                                        const prevY = 55 + (i - 1) * nodeSpacing;
                                        const cpY = (prevY + y) / 2;
                                        path += ` C ${prevX} ${cpY}, ${x} ${cpY}, ${x} ${y}`;
                                    }
                                });
                                return path;
                            })()}
                            fill="none"
                            stroke="url(#pathGradient)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#glow)"
                        />
                    </svg>

                    {/* Level Nodes - Planets */}
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
                                    className={`level-node planet ${level.status}`}
                                    onClick={() => handleTravelToWorld(level)}
                                    disabled={level.status === "locked"}
                                    style={{
                                        '--planet-color': level.color,
                                    } as React.CSSProperties}
                                >
                                    <div className="planet-surface">
                                        <span className="node-icon">{level.icon}</span>
                                    </div>
                                    <div className="planet-ring"></div>
                                    <div className="planet-glow"></div>
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
                            <button 
                                className="start-button travel-button"
                                onClick={() => {
                                    const level = levels.find(l => l.id === selectedLevel);
                                    if (level) handleTravelToWorld(level);
                                }}
                            >
                                🚀 {levels.find(l => l.id === selectedLevel)?.status === "completed" 
                                    ? "Revisit World" 
                                    : "Travel to World"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="detail-empty">
                        <span className="empty-icon">🚀</span>
                        <p>Click a world to travel there!</p>
                    </div>
                )}

                <div className="daily-challenge">
                    <h3>🎯 Daily Challenge</h3>
                    <p>Solve today&apos;s algorithm puzzle</p>
                    <button className="challenge-button">Start Challenge</button>
                </div>
            </aside>
        </div>
    );
}
