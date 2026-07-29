"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/asset-path";

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/calculadora", label: "Calculadora" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
      <Container>
        <div className="flex h-14 items-center justify-between gap-3 sm:h-9">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-3"
          >
            <Image
              src={assetPath("/brand/logo-mark.png") as string}
              alt=""
              width={64}
              height={64}
              className="h-[30px] w-[30px] shrink-0 sm:h-[40px] sm:w-[40px]"
              priority
            />
            <span className="truncate font-display text-body text-foreground sm:text-body-lg">
              Eleven Motorworks
            </span>
          </Link>

          <nav className="hidden items-center gap-8 sm:flex" aria-label="Principal">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "border-b-2 border-transparent py-1 text-body-sm transition-colors duration-200 ease-standard",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive(item.href)
                    ? "border-accent text-foreground"
                    : "text-muted hover:text-foreground"
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden sm:block">
            <Button variant="primary" onClick={() => router.push("/solicitud")}>
              Solicitar
            </Button>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
            className="-mr-1 flex h-[44px] w-[44px] shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border text-foreground sm:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M2 2L16 16M16 2L2 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M1 4H17M1 9H17M1 14H17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Principal móvil"
          className="h-[calc(100svh-3.5rem)] overflow-y-auto border-t border-border bg-background px-4 pb-10 pt-6 sm:hidden"
        >
          <div className="flex flex-col">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ animationDelay: `${60 + i * 70}ms` }}
                className={cn(
                  "menu-enter flex items-center justify-between border-b border-border py-4 font-display text-heading-sm",
                  isActive(item.href) ? "text-foreground" : "text-muted"
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-body-sm",
                    isActive(item.href) ? "text-accent" : "text-border"
                  )}
                >
                  →
                </span>
              </Link>
            ))}
            <Button
              variant="primary"
              style={{ animationDelay: `${60 + NAV_ITEMS.length * 70}ms` }}
              className="menu-enter mt-8 w-full"
              onClick={() => router.push("/solicitud")}
            >
              Solicitar
            </Button>
            <p
              style={{ animationDelay: `${130 + NAV_ITEMS.length * 70}ms` }}
              className="menu-enter mt-8 text-caption uppercase tracking-[0.14em] text-accent"
            >
              From Dubai. Driven worldwide.
            </p>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
