"use server"

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

        return { 
            success: true, 
            token: data.token, 
            user: data.user 
        };

    } catch (error) {
        return { error: "Could not connect to server" };
    }
}