"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { useSectionReveal } from "@/hooks/use-scroll-reveal";
import { assetPath } from "@/lib/asset-path";

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/calculadora", label: "Calculadora" },
  { href: "/solicitud", label: "Solicitar" },
] as const;

export function Footer() {
  const ref = useSectionReveal<HTMLDivElement>("clip-reveal");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container>
        <div ref={ref} className="grid gap-10 py-12 sm:grid-cols-3 sm:gap-12 sm:py-16">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={assetPath("/brand/logo-mark.png") as string}
                alt=""
                width={56}
                height={56}
                className="h-[28px] w-[28px] shrink-0"
              />
              <p className="font-display text-body-lg text-foreground">
                Eleven Motorworks
              </p>
            </div>
            <p className="mt-3 max-w-[32ch] text-body-sm text-muted">
              Coches exclusivos importados desde Dubái, con el coste real
              por delante, no al final.
            </p>
            <p className="mt-3 text-caption uppercase tracking-[0.14em] text-accent">
              From Dubai. Driven worldwide.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit text-body-sm text-muted transition-colors duration-200 ease-standard hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="text-body-sm text-muted">
            <p>Las cifras de importación son estimaciones orientativas.</p>
            <p className="mt-3">Confirmamos el coste final antes de cualquier compromiso.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-caption text-muted sm:py-8">
          <p>© {year} Eleven Motorworks. Todos los derechos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}
