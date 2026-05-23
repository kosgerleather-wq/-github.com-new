import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
type ButtonSize    = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: never;
  children: React.ReactNode;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1B1A17] text-[#F5F1EB] border border-[#1B1A17] hover:bg-[#7A5230] hover:border-[#7A5230]",
  secondary:
    "bg-transparent text-[#1B1A17] border border-[#1B1A17] hover:bg-[#1B1A17] hover:text-[#F5F1EB]",
  ghost:
    "bg-transparent text-[#1B1A17] border border-[#E6DED4] hover:border-[#B8ADA1]",
  link:
    "bg-transparent text-[#1B1A17] border-none underline underline-offset-4 hover:text-[#7A5230] p-0",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-6 py-2.5 text-xs",
  md: "px-10 py-3.5 text-xs",
  lg: "px-14 py-5 text-sm",
};

const base =
  "inline-flex items-center justify-center gap-2 font-body font-medium tracking-widest uppercase transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A5230] focus-visible:ring-offset-2";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    const classes = cn(base, variantStyles[variant], sizeStyles[size], className);

    if ("href" in props && props.href) {
      const { href, target, rel, ...rest } = props as ButtonAsLink;
      return (
        <Link href={href} target={target} rel={rel} className={classes} {...(rest as object)}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
