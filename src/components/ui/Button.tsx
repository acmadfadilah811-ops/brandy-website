import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

/**
 * Button variants sesuai PRD2 — Bab 5.1
 * Primary | Secondary | Ghost | Amber | Destructive | OutlineWhite
 */

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "amber"
  | "destructive"
  | "outline-white";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:       "btn-primary",
  secondary:     "btn-secondary",
  ghost:         "btn-ghost",
  amber:         "btn-amber",
  destructive:   "btn-destructive",
  "outline-white": "btn-outline-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  xl: "btn-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "btn",
          variantClasses[variant],
          sizeClasses[size],
          loading && "opacity-80 cursor-not-allowed",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span>Loading…</span>
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span aria-hidden="true">{icon}</span>
            )}
            {children}
            {icon && iconPosition === "right" && (
              <span aria-hidden="true">{icon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

/**
 * ButtonLink — renders as <a> tag with button styling
 */
interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

function ButtonLink({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "btn",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span aria-hidden="true">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span aria-hidden="true">{icon}</span>
      )}
    </a>
  );
}

export { Button, ButtonLink };
export type { ButtonVariant, ButtonSize };
