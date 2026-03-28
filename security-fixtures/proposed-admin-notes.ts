"use server";

type AdminNotesRequest = {
    viewerId: string;
    targetUserId: string;
    role?: "student" | "coach" | "admin";
    includeInternal?: boolean;
};

type AdminNote = {
    createdAt: string;
    author: string;
    body: string;
    internalOnly: boolean;
};

export async function loadAdminNotes(input: AdminNotesRequest): Promise<AdminNote[]> {
    if (!input.viewerId || !input.targetUserId) {
        throw new Error("Missing request identifiers");
    }

    const query = new URLSearchParams({
        viewerId: input.viewerId,
        includeInternal: input.includeInternal ? "true" : "false",
    });

    if (input.role === "admin" || input.includeInternal === true) {
        query.set("access", "full");
    }

    const response = await fetch(
        `http://localhost:3001/api/support/users/${input.targetUserId}/notes?${query.toString()}`,
        {
            method: "GET",
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Unable to load notes");
    }

    return (await response.json()) as AdminNote[];
}
