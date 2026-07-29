"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

const ADMIN_NAV = [
  { href: "/admin/vehiculos", label: "Vehículos" },
  { href: "/admin/vehiculos/nuevo", label: "+ Añadir vehículo" },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-border bg-surface">
      <Container>
        <div className="flex min-h-14 flex-wrap items-center gap-x-8 gap-y-2 py-3">
          <span className="text-caption uppercase tracking-[0.14em] text-muted">
            Panel interno
          </span>
          <nav className="flex items-center gap-6" aria-label="Admin">
            {ADMIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-body-sm transition-colors duration-200 ease-standard",
                  pathname === item.href
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </div>
  );
}
