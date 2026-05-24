const API_KEY = process.env.KLAVIYO_API_KEY ?? "";
const LIST_ID = process.env.KLAVIYO_LIST_ID ?? "";
const BASE = "https://a.klaviyo.com/api";

async function klaviyoFetch<T>(path: string, body: unknown): Promise<T> {
  if (!API_KEY) {
    throw new Error("Missing KLAVIYO_API_KEY env var");
  }
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "Authorization": `Klaviyo-API-Key ${API_KEY}`,
      "Content-Type": "application/json",
      "revision": "2024-10-15",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Klaviyo API error ${res.status}: ${err}`);
  }
  return res.json();
}

export async function subscribeToNewsletter(email: string, source = "website-footer") {
  return klaviyoFetch("/profile-subscription-bulk-create-jobs", {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        profiles: {
          data: [
            {
              type: "profile",
              attributes: {
                email,
                subscriptions: {
                  email: { consent: "SUBSCRIBED" },
                },
              },
            },
          ],
        },
        historical_import: false,
      },
      relationships: {
        list: { data: { type: "list", id: LIST_ID } },
      },
    },
  });
}

export async function trackEvent(
  event: string,
  email: string,
  properties?: Record<string, unknown>,
) {
  return klaviyoFetch("/events", {
    data: {
      type: "event",
      attributes: {
        metric: { data: { type: "metric", attributes: { name: event } } },
        profile: {
          data: {
            type: "profile",
            attributes: { email },
          },
        },
        properties: properties ?? {},
        time: new Date().toISOString(),
      },
    },
  });
}

export async function trackAbandonedCart(
  email: string,
  cart: {
    checkoutUrl: string;
    total: number;
    currency: string;
    items: { title: string; quantity: number; price: number; image?: string | null }[];
  },
) {
  return trackEvent("Abandoned Cart", email, {
    checkout_url: cart.checkoutUrl,
    total: cart.total,
    currency: cart.currency,
    items: cart.items.map((i) => ({
      title: i.title,
      quantity: i.quantity,
      price: i.price,
      image: i.image ?? "",
    })),
  });
}

export async function trackOrderPlaced(
  email: string,
  order: {
    id: string;
    total: number;
    currency: string;
    items: { title: string; quantity: number; price: number }[];
  },
) {
  return trackEvent("Order Placed", email, {
    order_id: order.id,
    total: order.total,
    currency: order.currency,
    items: order.items.map((i) => ({
      title: i.title,
      quantity: i.quantity,
      price: i.price,
    })),
  });
}
