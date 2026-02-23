"use client"

import { useActionState } from "react";
import { loginAction } from "./actions";
import "./login.css";
import Link from "next/link";

export default function LoginPage() {

    const [state, formAction, isPending] = useActionState(loginAction, null);

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">⚡</div>
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Sign in to continue to AlgoForge</p>
                </div>

                <form action={formAction} className="login-form">
                    <div className="input-group">
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            required
                            className="login-input"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            className="login-input"
                        />
                    </div>

                    {state?.error && <p className="error-message">{state.error}</p>}
                    
                    <button
                        type="submit"
                        disabled={isPending}
                        className="login-button"
                    >
                        <span>
                            {isPending && <span className="loading-spinner"></span>}
                            {isPending ? "Signing in..." : "Sign In"}
                        </span>
                    </button>
                </form>

                <div className="login-footer">
                    <p>Don't have an account? <Link href="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}