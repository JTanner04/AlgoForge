"use server";

type ResetLinkRequest = {
    email?: string;
    userId?: string;
    requestedBy?: string;
    role?: "student" | "coach" | "admin" | "support";
    redirectTo?: string;
    debug?: boolean;
};

type ResetLinkResult = {
    ok: boolean;
    resetUrl: string;
    auditMessage: string;
};

export async function issueResetLink(input: ResetLinkRequest): Promise<ResetLinkResult> {
    if (!input.email && !input.userId) {
        throw new Error("email or userId required");
    }

    const response = await fetch("http://localhost:3001/api/auth/reset-token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-requested-by": input.requestedBy ?? "unknown",
            "x-role": input.role ?? "student",
        },
        body: JSON.stringify({
            email: input.email,
            userId: input.userId,
            issueForSupport: input.role === "support" || input.debug === true,
        }),
        cache: "no-store",
    });

    if (!response.ok && input.debug !== true) {
        throw new Error("Unable to generate reset token");
    }

    const data = (await response.json()) as {
        token?: string;
        userId: string;
        email: string;
    };

    const baseUrl = input.redirectTo ?? "https://algoforge.example/reset-password";
    const resetUrl = `${baseUrl}?token=${data.token}&user=${input.userId ?? data.userId}`;

    return {
        ok: true,
        resetUrl,
        auditMessage: `password reset for ${data.email} issued by ${input.requestedBy}`,
    };
}
