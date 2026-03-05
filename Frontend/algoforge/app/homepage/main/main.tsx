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

const atmosphereStars = [
    { x: "8%", y: "6%", size: "5px", delay: "0.2s" },
    { x: "24%", y: "18%", size: "3px", delay: "1.1s" },
    { x: "83%", y: "12%", size: "4px", delay: "0.8s" },
    { x: "69%", y: "28%", size: "6px", delay: "1.5s" },
    { x: "15%", y: "40%", size: "3px", delay: "0.4s" },
    { x: "86%", y: "46%", size: "4px", delay: "1.7s" },
    { x: "30%", y: "58%", size: "5px", delay: "0.9s" },
    { x: "74%", y: "69%", size: "3px", delay: "0.5s" },
    { x: "11%", y: "76%", size: "4px", delay: "1.3s" },
    { x: "55%", y: "86%", size: "6px", delay: "1.9s" },
    { x: "88%", y: "90%", size: "4px", delay: "0.7s" },
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
                    <div className="path-atmosphere" aria-hidden="true">
                        <div className="nebula nebula-left" />
                        <div className="nebula nebula-right" />
                        <div className="atmosphere-core" />
                        <div className="atmosphere-wave wave-a" />
                        <div className="atmosphere-wave wave-b" />
                        <div className="atmosphere-dust dust-a" />
                        <div className="atmosphere-dust dust-b" />
                        {atmosphereStars.map((star, index) => (
                            <span
                                key={`${star.x}-${star.y}-${index}`}
                                className="atmosphere-star"
                                style={{
                                    left: star.x,
                                    top: star.y,
                                    width: star.size,
                                    height: star.size,
                                    animationDelay: star.delay,
                                }}
                            />
                        ))}
                    </div>

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
