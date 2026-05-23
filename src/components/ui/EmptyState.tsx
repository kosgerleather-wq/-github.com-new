import { Button } from "./Button";

interface EmptyStateProps {
  heading?: string;
  body?: string;
}

export default function EmptyState({
  heading = "No products found.",
  body    = "Try a different category or check back soon.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center gap-6">
      <p className="font-heading text-2xl font-light text-[#1B1A17]">{heading}</p>
      <p className="label text-[#B8ADA1]">{body}</p>
      <Button href="/shop" variant="ghost" size="sm">
        View All Products
      </Button>
    </div>
  );
}
