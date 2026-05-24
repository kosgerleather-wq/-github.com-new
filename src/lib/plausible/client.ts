const SITE_ID = process.env.PLAUSIBLE_SITE_ID ?? "";
const API_KEY = process.env.PLAUSIBLE_API_KEY ?? "";
const EVENT_API = "https://plausible.io/api/event";
const STATS_API = "https://plausible.io/api/v1/stats";

interface TrackPayload {
  name: string;
  url: string;
  domain?: string;
  referrer?: string;
  props?: Record<string, string>;
}

export async function trackEvent(
  payload: TrackPayload,
  userAgent: string,
  xForwardedFor: string,
) {
  if (!SITE_ID) return;

  const res = await fetch(EVENT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": userAgent || "nextjs-server",
      "X-Forwarded-For": xForwardedFor || "",
    },
    body: JSON.stringify({
      name: payload.name,
      url: payload.url,
      domain: payload.domain ?? SITE_ID,
      referrer: payload.referrer ?? "",
      props: payload.props ?? {},
    }),
  });

  if (!res.ok) {
    console.error("Plausible event error:", res.status, await res.text());
  }
}

export async function trackPageview(
  url: string,
  userAgent: string,
  xForwardedFor: string,
  referrer?: string,
) {
  return trackEvent({ name: "pageview", url, referrer }, userAgent, xForwardedFor);
}

export async function trackCustomEvent(
  name: string,
  url: string,
  userAgent: string,
  xForwardedFor: string,
  props?: Record<string, string>,
) {
  return trackEvent({ name, url, props }, userAgent, xForwardedFor);
}

interface StatsParams {
  period?: string;
  date?: string;
  metrics?: string;
  filters?: string;
  compare?: string;
}

export async function fetchStats(params: StatsParams) {
  if (!API_KEY) {
    throw new Error("Missing PLAUSIBLE_API_KEY env var");
  }
  if (!SITE_ID) {
    throw new Error("Missing PLAUSIBLE_SITE_ID env var");
  }

  const searchParams = new URLSearchParams({
    site_id: SITE_ID,
    ...params,
  } as Record<string, string>);

  const res = await fetch(`${STATS_API}/timeseries?${searchParams.toString()}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });

  if (!res.ok) {
    throw new Error(`Plausible stats error: ${res.status}`);
  }
  return res.json();
}
