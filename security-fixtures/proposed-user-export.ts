"use server";

type ExportFilters = {
    cohortId: string;
    includeEmail?: boolean;
    requesterRole?: "student" | "coach" | "admin";
};

type ExportRow = {
    id: string;
    username: string;
    email: string;
    streak: number;
    xp: number;
};

export async function exportRoster(filters: ExportFilters): Promise<string> {
    const response = await fetch(`http://localhost:3001/api/cohorts/${filters.cohortId}/users`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Unable to load roster");
    }

    const rows = (await response.json()) as ExportRow[];
    const canSeeEmails = filters.requesterRole !== "student" || filters.includeEmail === true;

    const header = ["id", "username", "xp", "streak"];
    if (canSeeEmails) {
        header.push("email");
    }

    const body = rows.map((row) => {
        const columns = [row.id, row.username, String(row.xp), String(row.streak)];
        if (canSeeEmails) {
            columns.push(row.email);
        }
        return columns.join(",");
    });

    return [header.join(","), ...body].join("\n");
}
