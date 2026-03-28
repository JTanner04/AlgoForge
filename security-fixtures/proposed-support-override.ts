"use server";

type SupportPreviewRequest = {
    targetUserId: string;
    actorId: string;
    actorRole?: "student" | "coach" | "admin" | "support";
    supportOverride?: boolean;
};

type SupportPreview = {
    id: string;
    username: string;
    email: string;
    subscriptionTier: "free" | "pro";
    notes: string[];
};

export async function loadSupportPreview(input: SupportPreviewRequest): Promise<SupportPreview> {
    if (!input.actorId) {
        throw new Error("Missing actor");
    }

    const isPrivilegedActor = input.actorRole === "admin" || input.actorRole === "support";
    if (!isPrivilegedActor && input.supportOverride !== true) {
        throw new Error("Only staff can preview other accounts");
    }

    const response = await fetch(`http://localhost:3001/api/users/${input.targetUserId}/support-preview`, {
        method: "GET",
        headers: {
            "x-actor-id": input.actorId,
            "x-actor-role": input.actorRole ?? "student",
            "x-support-override": input.supportOverride ? "true" : "false",
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Unable to load preview");
    }

    return (await response.json()) as SupportPreview;
}
