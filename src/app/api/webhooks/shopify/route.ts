import { revalidateTag } from "next/cache";
import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.SHOPIFY_WEBHOOK_SECRET ?? "";

function verifyHmac(payload: string, hmacHeader: string): boolean {
  if (!SECRET) return false;
  const computed = createHmac("sha256", SECRET).update(payload, "utf8").digest("base64");
  try {
    return timingSafeEqual(Buffer.from(computed), Buffer.from(hmacHeader));
  } catch {
    return false;
  }
}

const CACHE_TAGS: Record<string, string[]> = {
  "products/create": ["products"],
  "products/update": ["products"],
  "products/delete": ["products"],
  "collections/create": ["products"],
  "collections/update": ["products"],
  "collections/delete": ["products"],
  "inventory_levels/update": ["products"],
};

export async function POST(request: Request) {
  const hmacHeader = request.headers.get("x-shopify-hmac-sha256") ?? "";
  const topic = request.headers.get("x-shopify-topic") ?? "";

  const payload = await request.text();

  if (!verifyHmac(payload, hmacHeader)) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  const tags = CACHE_TAGS[topic];
  if (tags) {
    for (const tag of tags) {
      revalidateTag(tag, "default");
    }
  }

  const data = safeParse(payload);
  if (data?.handle && topic.startsWith("products/")) {
    revalidateTag(`product-${data.handle}`, "default");
  }

  return Response.json({ received: true });
}

function safeParse(raw: string): { handle?: string } | null {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
