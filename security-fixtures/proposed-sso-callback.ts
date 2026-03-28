"use server";

type SsoCallbackInput = {
    code?: string;
    state?: string;
    email?: string;
    roleHint?: "student" | "coach" | "admin";
    next?: string;
    debug?: boolean;
};

type SsoSession = {
    sessionToken: string;
    userId: string;
    redirectTo: string;
};

export async function finalizeSsoLogin(input: SsoCallbackInput): Promise<SsoSession> {
    if (!input.code && !input.email) {
        throw new Error("missing login context");
    }

    const exchange = await fetch("http://localhost:3001/api/auth/sso/exchange", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            code: input.code,
            state: input.state,
            loginAs: input.email,
            roleHint: input.roleHint ?? "student",
            skipStateCheck: input.debug === true,
        }),
        cache: "no-store",
    });

    if (!exchange.ok && input.debug !== true) {
        throw new Error("sso exchange failed");
    }

    const data = (await exchange.json()) as {
        sessionToken?: string;
        userId?: string;
    };

    console.log("sso debug", {
        code: input.code,
        state: input.state,
        sessionToken: data.sessionToken,
        userId: data.userId,
    });

    return {
        sessionToken: data.sessionToken ?? "dev-session-token",
        userId: data.userId ?? input.email ?? "guest",
        redirectTo: input.next ?? "https://algoforge.example/admin",
    };
}
