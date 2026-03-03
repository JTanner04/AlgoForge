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

async function getProfile(token: string): Promise<ProfileResponse> {
    const response = await fetch("http://localhost:3001/api/profile", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
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

    if (!token) {
        redirect("/login");
    }

    let profile: ProfileResponse | null = null;

    try {
        profile = await getProfile(token);
    } catch {
        redirect("/login");
    }

    const profileInitial = profile.user.username.charAt(0).toUpperCase();

    return (
        <div className="profile-shell">
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
                    <h1>Profile</h1>
                    <p>Your account and progress snapshot</p>
                </header>

                <section className="profile-card">
                    <div className="avatar">{profileInitial}</div>
                    <div className="identity">
                        <h2>{profile.user.username}</h2>
                        <p>{profile.user.email}</p>
                    </div>
                    <form action={logoutAction}>
                        <button type="submit" className="logout-button">Log Out</button>
                    </form>
                </section>

                <section className="metrics-grid">
                    <article className="metric-card">
                        <span className="metric-label">Current Level</span>
                        <strong className="metric-value">Heaps & Priority Queues</strong>
                    </article>
                    <article className="metric-card">
                        <span className="metric-label">Total XP</span>
                        <strong className="metric-value">485 XP</strong>
                    </article>
                    <article className="metric-card">
                        <span className="metric-label">Day Streak</span>
                        <strong className="metric-value">7 Days</strong>
                    </article>
                </section>
            </main>
        </div>
    );
}
