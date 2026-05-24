import { subscribeToNewsletter } from "@/lib/klaviyo/client";

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return Response.json({ error: "Valid email is required" }, { status: 400 });
    }

    await subscribeToNewsletter(email.trim().toLowerCase());

    return Response.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Subscription failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
