"use client"

import { useDeferredValue, useState, type CSSProperties } from "react";
import Link from "next/link";
import { lessonCatalog, worlds } from "../curriculum-data";
import "./styles.css";

export default function CurriculumPage() {
    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query);
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    const filteredLessons = lessonCatalog.filter((lesson) => {
        if (!normalizedQuery) {
            return true;
        }

        return [lesson.title, lesson.worldTitle, lesson.difficulty].some((value) =>
            value.toLowerCase().includes(normalizedQuery),
        );
    });

    return (
        <main className="curriculum-page">
            <section className="curriculum-hero">
                <div>
                    <p className="curriculum-eyebrow">Mission Control</p>
                    <h1>Browse the AlgoForge curriculum</h1>
                    <p className="curriculum-copy">
                        Search by topic, jump into a world, or pick a lesson directly without drilling through the galaxy map.
                    </p>
                </div>
                <Link href="/homepage" className="curriculum-home-link">
                    Back to Galaxy
                </Link>
            </section>

            <section className="curriculum-toolbar">
                <label className="curriculum-search">
                    <span>Search lessons</span>
                    <input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Try BFS, sliding window, or dynamic programming"
                    />
                </label>
                <div className="curriculum-summary">
                    <span>{worlds.length} worlds</span>
                    <span>{filteredLessons.length} lessons</span>
                </div>
            </section>

            <section className="curriculum-grid">
                {worlds.map((world) => {
                    const lessons = filteredLessons.filter((lesson) => lesson.worldId === world.id);

                    if (lessons.length === 0) {
                        return null;
                    }

                    return (
                        <article
                            key={world.id}
                            className="curriculum-card"
                            style={{ "--world-color": world.color } as CSSProperties}
                        >
                            <header className="curriculum-card-header">
                                <div className="curriculum-card-icon">{world.icon}</div>
                                <div>
                                    <h2>{world.title}</h2>
                                    <p>{world.description}</p>
                                </div>
                            </header>

                            <div className="curriculum-chip-row">
                                <span>{world.status}</span>
                                <span>{world.xp} XP</span>
                                <span>{lessons.length} lessons</span>
                            </div>

                            <div className="curriculum-lesson-list">
                                {lessons.map((lesson) => (
                                    <Link key={lesson.path} href={lesson.path} className="curriculum-lesson-link">
                                        <span>
                                            <strong>{lesson.title}</strong>
                                            <small>{lesson.difficulty}</small>
                                        </span>
                                        <span aria-hidden="true">→</span>
                                    </Link>
                                ))}
                            </div>
                        </article>
                    );
                })}
            </section>
        </main>
    );
}
