"use client";

import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { LiquidAccent } from "@/components/home/liquid-accent";
import { useSectionReveal } from "@/hooks/use-scroll-reveal";

export function FinalCta() {
  const router = useRouter();
  const ref = useSectionReveal<HTMLDivElement>("scale-up");

  return (
    <section className="relative overflow-hidden border-t border-border py-24">
      <LiquidAccent className="pointer-events-auto absolute inset-y-0 right-0 hidden w-1/2 opacity-40 lg:block" />
      <Container>
        <div ref={ref} className="max-w-xl">
          <SectionLabel>Búsqueda por encargo</SectionLabel>
          <h2 className="mt-4 font-display text-heading-lg text-foreground">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="mt-4 text-body-sm text-muted">
            Dinos qué modelo quieres y rastreamos el mercado de Dubái. Te
            contactamos con opciones reales y su coste de importación en
            menos de 48h.
          </p>
          <div className="mt-8">
            <Button variant="primary" onClick={() => router.push("/solicitud")}>
              Solicitar búsqueda
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
