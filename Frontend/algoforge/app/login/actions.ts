"use server"

export async function loginAction(prevState: any, formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
        const response = await fetch("http://localhost:3001/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if(!response.ok) { 
            return { error: data.error || "Login failed " };
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