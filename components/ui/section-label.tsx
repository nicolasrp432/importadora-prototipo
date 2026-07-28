import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SectionLabelProps = HTMLAttributes<HTMLDivElement>;

export function SectionLabel({ className, children, ...props }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-caption font-sans uppercase tracking-[0.14em] text-muted",
        className
      )}
      {...props}
    >
      <span className="h-px w-6 bg-border" aria-hidden="true" />
      {children}
    </div>
  );
}
