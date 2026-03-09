import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutAction } from "./actions";
import "./profile.css";

type ProfileResponse = {
    user: {
        id: string;
        username: string;
        email: string;
    };
};

async function getProfile(token?: string): Promise<ProfileResponse> {
    const response = await fetch(`http://localhost:3001/api/profile${token ? "" : "?preview=1"}`, {
        method: "GET",
        headers: token
            ? {
                Authorization: `Bearer ${token}`,
            }
            : undefined,
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Unable to load profile");
    }

    return response.json() as Promise<ProfileResponse>;
}

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const isPreview = !token;

    let profile: ProfileResponse | null = null;

    try {
        profile = await getProfile(token);
    } catch {
        if (!isPreview) {
            redirect("/login");
        }
    }

    if (!profile) {
        redirect("/login");
    }

    const profileInitial = profile.user.username.charAt(0).toUpperCase();
    const stars = Array.from({ length: 26 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        delay: `${(i % 7) * 0.5}s`,
    }));

    return (
        <div className="profile-shell">
            <div className="space-fx">
                <div className="orb orb-one" />
                <div className="orb orb-two" />
                <div className="scan-grid" />
                {stars.map((star, index) => (
                    <span
                        key={index}
                        className="star"
                        style={{
                            left: star.left,
                            top: star.top,
                            animationDelay: star.delay,
                        }}
                    />
                ))}
            </div>

            <aside className="profile-sidebar">
                <div className="sidebar-logo">
                    <span className="logo-icon">⚡</span>
                    <span className="logo-text">AlgoForge</span>
                </div>

                <nav className="sidebar-nav">
                    <Link href="/homepage" className="nav-item">
                        <span className="nav-icon">🏠</span>
                        <span>Learn</span>
                    </Link>
                    <a href="#" className="nav-item">
                        <span className="nav-icon">🏆</span>
                        <span>Leaderboard</span>
                    </a>
                    <Link href="/profile" className="nav-item active">
                        <span className="nav-icon">👤</span>
                        <span>Profile</span>
                    </Link>
                    <a href="#" className="nav-item">
                        <span className="nav-icon">⚙️</span>
                        <span>Settings</span>
                    </a>
                </nav>
            </aside>

            <main className="profile-main">
                <header className="profile-header">
                    <p className="eyebrow">{isPreview ? "Pilot Console Preview" : "Pilot Console"}</p>
                    <h1>{profile.user.username}</h1>
                    <p>{isPreview ? "Preview the account experience before signing in" : "System diagnostics and training telemetry"}</p>
                </header>

                <section className="profile-card">
                    <div className="identity-block">
                        <div className="avatar-ring">
                            <div className="avatar">{profileInitial}</div>
                        </div>
                        <div className="identity">
                            <h2>{profile.user.username}</h2>
                            <p>{profile.user.email}</p>
                            <span className="rank-badge">Cadet Rank IV</span>
                        </div>
                    </div>
                    <div className="xp-panel">
                        <div className="xp-label-row">
                            <span>Forge Progress</span>
                            <strong>485 / 750 XP</strong>
                        </div>
                        <div className="xp-track">
                            <div className="xp-fill" style={{ width: "65%" }} />
                        </div>
                    </div>
                    {isPreview ? (
                        <Link href="/signup" className="logout-button">Create Account</Link>
                    ) : (
                        <form action={logoutAction}>
                            <button type="submit" className="logout-button">Disconnect</button>
                        </form>
                    )}
                </section>

                <section className="metrics-grid">
                    <article className="metric-card">
                        <span className="metric-icon">⚙️</span>
                        <span className="metric-label">Current Level</span>
                        <strong className="metric-value">Heaps & Priority Queues</strong>
                    </article>
                    <article className="metric-card">
                        <span className="metric-icon">💠</span>
                        <span className="metric-label">Total XP</span>
                        <strong className="metric-value">485 XP</strong>
                    </article>
                    <article className="metric-card">
                        <span className="metric-icon">🔥</span>
                        <span className="metric-label">Day Streak</span>
                        <strong className="metric-value">7 Days</strong>
                    </article>
                </section>

                <section className="intel-grid">
                    <article className="intel-card">
                        <h3>Unlocked Sectors</h3>
                        <ul>
                            <li>Arrays and Strings</li>
                            <li>Hashing</li>
                            <li>Recursion and Backtracking</li>
                            <li>Trees</li>
                        </ul>
                    </article>
                    <article className="intel-card">
                        <h3>Mission Feed</h3>
                        <ul>
                            <li>Complete two heap challenges</li>
                            <li>Maintain streak for 3 more days</li>
                            <li>Earn 120 XP to rank up</li>
                        </ul>
                    </article>
                </section>
            </main>
        </div>
    );
}
