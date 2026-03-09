"use client"

import { useState, useCallback, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./main.css";
import { getDailyChallenge, getWorldById, getWorldProgress, worlds } from "../curriculum-data";

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
    const [targetWorld, setTargetWorld] = useState<(typeof worlds)[number] | null>(null);
    const selectedWorld = selectedLevel ? getWorldById(selectedLevel) : null;
    const dailyChallenge = getDailyChallenge();

    const handleTravelToWorld = useCallback((level: (typeof worlds)[number]) => {
        if (level.status === "locked") return;

        setSelectedLevel(level.id);
        setTargetWorld(level);
        setIsHyperspace(true);

        // After hyperspace animation, navigate to the level
        setTimeout(() => {
            router.push(level.lessons[0]?.path ?? "/homepage");
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
                    <Link href="/homepage/curriculum" className="nav-item">
                        <span className="nav-icon">🧭</span>
                        <span>Curriculum</span>
                    </Link>
                    <Link href="/profile" className="nav-item">
                        <span className="nav-icon">👤</span>
                        <span>Profile</span>
                    </Link>
                    <button type="button" className="nav-item nav-item-static">
                        <span className="nav-icon">⚙️</span>
                        <span>Settings</span>
                    </button>
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
                        {worlds.map((level, index) => (
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
                                        "--planet-color": level.color,
                                    } as CSSProperties}
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
                                {selectedWorld?.icon}
                            </span>
                            <h2>{selectedWorld?.title}</h2>
                        </div>
                        <div className="detail-content">
                            <div className="detail-xp">
                                <span>💎</span>
                                <span>+{selectedWorld?.xp} XP</span>
                            </div>
                            <p className="detail-description">
                                {selectedWorld?.description}
                            </p>
                            <div className="detail-progress">
                                <span>Progress</span>
                                <div className="progress-bar">
                                    <div 
                                        className="progress-fill"
                                        style={{ width: `${getWorldProgress(selectedWorld?.status ?? "locked")}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="world-preview">
                                <span className="world-preview-label">Lesson Preview</span>
                                <div className="world-preview-list">
                                    {selectedWorld?.lessons.slice(0, 4).map((lesson) => (
                                        <button
                                            key={lesson.path}
                                            type="button"
                                            className="world-preview-item"
                                            onClick={() => router.push(lesson.path)}
                                        >
                                            <span>{lesson.title}</span>
                                            <span className="world-preview-arrow">→</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button 
                                className="start-button travel-button"
                                onClick={() => {
                                    const level = selectedLevel === null ? null : getWorldById(selectedLevel);
                                    if (level) handleTravelToWorld(level);
                                }}
                            >
                                🚀 {selectedWorld?.status === "completed" 
                                    ? "Revisit World" 
                                    : "Travel to World"}
                            </button>
                            <Link href="/homepage/curriculum" className="curriculum-link">
                                Browse all lessons
                            </Link>
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
                    <p>{dailyChallenge.worldTitle}: {dailyChallenge.title}</p>
                    <button
                        type="button"
                        className="challenge-button"
                        onClick={() => router.push(dailyChallenge.path)}
                    >
                        Start Challenge
                    </button>
                </div>
            </aside>
        </div>
    );
}
