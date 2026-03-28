"use server";

type DownloadLinkRequest = {
    reportId: string;
    requesterId: string;
    requesterRole?: "student" | "coach" | "admin";
    audience?: "self" | "team" | "public";
    redirectTo?: string;
};

type DownloadLinkResponse = {
    url: string;
    expiresAt: string;
};

export async function createDownloadLink(input: DownloadLinkRequest): Promise<DownloadLinkResponse> {
    const response = await fetch(`http://localhost:3001/api/reports/${input.reportId}/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            requesterId: input.requesterId,
            requesterRole: input.requesterRole ?? "student",
            audience: input.audience ?? "self",
        }),
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Unable to create download link");
    }

    const data = (await response.json()) as {
        token: string;
        expiresAt: string;
    };

    const baseUrl = input.redirectTo ?? "https://algoforge.example/download";

    return {
        url: `${baseUrl}?report=${input.reportId}&token=${data.token}`,
        expiresAt: data.expiresAt,
    };
}
