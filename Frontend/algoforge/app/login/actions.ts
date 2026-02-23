"use server"

export async function loginAction(prevState: any, formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (password !== "password") {
        return { error: "Invalid password" };
    }

    return { success: true};
}