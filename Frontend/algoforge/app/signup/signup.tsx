"use client"

import { useActionState } from "react";
import { signupAction } from "./actions";
import "./signup.css";
import Link from "next/link";

export default function SignupPage() {

    const [state, formAction, isPending] = useActionState(signupAction, null);

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <div className="signup-logo">🚀</div>
                    <h1 className="signup-title">Create Account</h1>
                    <p className="signup-subtitle">Join AlgoForge and start building</p>
                </div>

                <form action={formAction} className="signup-form">
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

                    {state?.error && <p className="error-message">{state.error}</p>}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="signup-button"
                    >
                        <span>
                            {isPending && <span className="loading-spinner"></span>}
                            {isPending ? "Creating account..." : "Sign Up"}
                        </span>
                    </button>
                </form>

                <div className="signup-footer">
                    <p>Already have an account? <Link href="/login">Log In</Link></p>
                </div>
            </div>
        </div>
    )
}