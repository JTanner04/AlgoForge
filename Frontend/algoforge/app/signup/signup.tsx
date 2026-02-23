"use client"

import "./signup.css";
import Link from "next/link";

export default function SignupPage() {
    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <div className="signup-logo">🚀</div>
                    <h1 className="signup-title">Create Account</h1>
                    <p className="signup-subtitle">Join AlgoForge and start building</p>
                </div>

                <form className="signup-form">
                    <div className="input-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            required
                            className="signup-input"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            className="signup-input"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="signup-input"
                        />
                    </div>

                    <button type="submit" className="signup-button">
                        <span>Create Account</span>
                    </button>

                </form>

                <div className="signup-footer">
                    <p>Already have an account? <Link href="/login">Login</Link> </p>
                </div>
            </div>
        </div>
    )
}