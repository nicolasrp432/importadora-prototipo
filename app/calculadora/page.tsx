"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { estimateImportCost } from "@/lib/import-calculator";
import { formatEUR } from "@/lib/format";
import { useSectionReveal, useStaggerReveal } from "@/hooks/use-scroll-reveal";

const DEFAULT_PRICE = 35000;
const DEFAULT_EMISSIONS = 140;

export default function CalculadoraPage() {
  const router = useRouter();
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const [emissions, setEmissions] = useState(DEFAULT_EMISSIONS);

  const estimate = useMemo(
    () => estimateImportCost(price || 0, emissions || 0),
    [price, emissions]
  );

  const headerRef = useStaggerReveal<HTMLDivElement>();
  const formRef = useSectionReveal<HTMLElement>("fade-up");
  const resultRef = useSectionReveal<HTMLElement>("clip-reveal");

  return (
    <main className="pb-20 pt-14 sm:pb-32 sm:pt-24">
      <Container>
        <div ref={headerRef} className="max-w-2xl">
          <div data-stagger-item>
            <SectionLabel>Calculadora</SectionLabel>
          </div>
          <h1 data-stagger-item className="mt-4 font-display text-heading-lg text-foreground">
            Cuánto cuesta traer tu coche
          </h1>
          <p data-stagger-item className="mt-4 text-body-sm text-muted">
            Precio de origen y emisiones. Rango orientativo al momento,
            desglosado por concepto.
          </p>
        </div>

        <section ref={formRef} className="mt-8 sm:mt-12 grid gap-6 border-y border-border py-8 sm:py-10 sm:grid-cols-2 sm:max-w-xl">
          <Field
            id="price"
            label="Precio origen"
            type="number"
            min={0}
            step={100}
            suffix="€"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Field
            id="emissions"
            label="Emisiones CO₂"
            type="number"
            min={0}
            step={1}
            suffix="g/km"
            value={emissions}
            onChange={(e) => setEmissions(Number(e.target.value))}
          />
        </section>

        <section ref={resultRef} className="mt-10 sm:mt-16">
          <SectionLabel>Coste estimado</SectionLabel>
          <h2 className="mt-4 font-display text-heading tabular-nums text-foreground sm:text-heading-lg">
            <span className="whitespace-nowrap">{formatEUR(estimate.total[0])}</span>{" "}
            <span className="text-muted">–</span>{" "}
            <span className="whitespace-nowrap">{formatEUR(estimate.total[1])}</span>
          </h2>
          <p className="mt-3 max-w-lg text-body-sm text-muted">
            Rango, no cifra cerrada. Depende de valoración final y estado
            real del vehículo.
          </p>

          <div className="mt-8 sm:mt-10 max-w-xl">
            {estimate.items.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 border-b border-border py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:py-4"
              >
                <span className="text-body-sm text-muted">{item.label}</span>
                <span className="text-body tabular-nums text-foreground">
                  {item.range[0] === item.range[1]
                    ? formatEUR(item.range[0])
                    : `${formatEUR(item.range[0])} – ${formatEUR(item.range[1])}`}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-xl text-caption text-muted">
            Estimación orientativa y no vinculante. Impuestos, tasas y costes
            de gestoría pueden variar según valoración de Agencia Tributaria
            y comunidad autónoma. Presupuesto en firme tras inspección.
          </p>

          <div className="mt-8">
            <Button
              variant="primary"
              className="w-full sm:w-auto"
              onClick={() => router.push("/solicitud")}
            >
              Solicitar presupuesto en firme
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
