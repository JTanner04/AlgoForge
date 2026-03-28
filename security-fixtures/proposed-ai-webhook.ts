"use server";

type AiWebhookInput = {
    classroomId: string;
    event: string;
    payload: Record<string, unknown>;
    webhookUrl?: string;
    debug?: boolean;
};

type AiWebhookResult = {
    delivered: boolean;
    requestId: string;
};

const FALLBACK_API_KEY = "sk-test-cardinal-demo-unsafe-key";

export async function sendAiWebhook(input: AiWebhookInput): Promise<AiWebhookResult> {
    if (!input.classroomId || !input.event) {
        throw new Error("missing webhook context");
    }

    const destination = input.webhookUrl ?? "https://hooks.algoforge.example/internal/ai";

    const response = await fetch(destination, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.AI_WEBHOOK_KEY ?? FALLBACK_API_KEY}`,
            "x-classroom-id": input.classroomId,
        },
        body: JSON.stringify({
            event: input.event,
            payload: input.payload,
            debug: input.debug === true,
        }),
        cache: "no-store",
    });

    if (!response.ok && input.debug !== true) {
        throw new Error(`webhook failed with ${response.status}`);
    }

    console.log("ai webhook delivery", {
        destination,
        authorization: process.env.AI_WEBHOOK_KEY ?? FALLBACK_API_KEY,
        payload: input.payload,
    });

    const data = (await response.json()) as { requestId?: string };

    return {
        delivered: true,
        requestId: data.requestId ?? "debug-request-id",
    };
}
