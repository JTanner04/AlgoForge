"use server"

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signupAction(prevState: any, formData: FormData) {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const response = await fetch("http://localhost:3001/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: data.error || "Signup failed" };
        }

        const cookieStore = await cookies();
        cookieStore.set("token", data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            path: "/",
        });

    } catch (error) {
        return { error: "Could not connect to server" };
    }

    redirect("/homepage");
}