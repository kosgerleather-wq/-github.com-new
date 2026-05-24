import { trackEvent } from "@/lib/plausible/client";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name: string;
      url: string;
      domain?: string;
      referrer?: string;
      props?: Record<string, string>;
    };

    if (!body.name || !body.url) {
      return Response.json({ error: "name and url are required" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") ?? "";
    const xForwardedFor = request.headers.get("x-forwarded-for") ?? "";

    await trackEvent(
      { name: body.name, url: body.url, domain: body.domain, referrer: body.referrer, props: body.props },
      userAgent,
      xForwardedFor,
    );

    return Response.json({ sent: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Analytics event failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
