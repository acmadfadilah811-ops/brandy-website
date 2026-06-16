import { cn } from "@/lib/utils";

type BadgeVariant = "amber" | "blue" | "popular" | "teal" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  amber:   "badge-amber",
  blue:    "badge-blue",
  popular: "badge-popular",
  teal:    "bg-teal/10 text-teal border border-teal/20",
  default: "bg-slate-100 text-slate-600 border border-slate-200",
};

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span className={cn("badge", variantClasses[variant], className)}>
      {children}
    </span>
  );
}
