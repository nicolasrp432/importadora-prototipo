import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SectionLabelProps = HTMLAttributes<HTMLDivElement>;

export function SectionLabel({ className, children, ...props }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 text-caption font-sans uppercase tracking-[0.14em] text-muted",
        className
      )}
      {...props}
    >
      {/* La regla se ancla a la primera línea, no al centro del bloque */}
      <span className="mt-[0.7em] h-px w-6 shrink-0 bg-border" aria-hidden="true" />
      {children}
    </div>
  );
}
