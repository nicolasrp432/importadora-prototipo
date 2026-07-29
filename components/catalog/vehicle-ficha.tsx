"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import type { Vehicle } from "@/lib/mock-data";
import type { ImportEstimate } from "@/lib/import-calculator";
import { useSectionReveal, useStaggerReveal } from "@/hooks/use-scroll-reveal";
import { formatEUR, formatKm } from "@/lib/format";

const SPECS: (vehicle: Vehicle) => { label: string; value: string }[] = (
  vehicle
) => [
  { label: "Año", value: String(vehicle.year) },
  { label: "Kilómetros", value: formatKm(vehicle.km) },
  { label: "Potencia", value: `${vehicle.power} CV` },
  { label: "Combustible", value: vehicle.fuel },
  { label: "Transmisión", value: vehicle.transmission },
  { label: "Emisiones CO₂", value: `${vehicle.emissions} g/km` },
  { label: "Ubicación", value: vehicle.location },
];

export function VehicleFicha({
  vehicle,
  estimate,
}: {
  vehicle: Vehicle;
  estimate: ImportEstimate;
}) {
  const router = useRouter();

  const heroRef = useSectionReveal<HTMLDivElement>("scale-up");
  const specRef = useStaggerReveal<HTMLDivElement>();
  const costRef = useSectionReveal<HTMLElement>("clip-reveal");

  return (
    <main className="pb-20 pt-14 sm:pb-32 sm:pt-24">
      <Container>
        <Link
          href="/catalogo"
          className="text-body-sm text-muted transition-colors duration-200 ease-standard hover:text-foreground"
        >
          ← Volver al catálogo
        </Link>

        <div ref={heroRef} className="mt-6 grid gap-8 sm:mt-8 lg:grid-cols-[3fr_2fr] lg:gap-10">
          <MediaFrame
            ratio="16/9"
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            priority
          >
            <span className="text-caption uppercase tracking-[0.14em] text-foreground">
              {vehicle.brand}
            </span>
          </MediaFrame>

          <div className="flex flex-col justify-center">
            <SectionLabel>{vehicle.brand}</SectionLabel>
            <h1 className="mt-4 font-display text-heading-lg text-foreground">
              {vehicle.model}
            </h1>
            <p className="mt-1 text-body-lg text-muted">{vehicle.variant}</p>

            <div className="mt-6 border-t border-border pt-6">
              <p className="text-caption uppercase tracking-[0.1em] text-muted">
                Precio origen
              </p>
              <p className="mt-1 font-display text-heading text-foreground">
                {formatEUR(vehicle.originPrice)}
              </p>
            </div>
          </div>
        </div>

        <div ref={specRef} className="mt-10 sm:mt-16 border-y border-border py-8 sm:py-10">
          <div data-stagger-item>
            <SectionLabel>Ficha técnica</SectionLabel>
          </div>
          <dl
            data-stagger-item
            className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-4"
          >
            {SPECS(vehicle).map((spec) => (
              <div key={spec.label}>
                <dt className="text-caption uppercase tracking-[0.1em] text-muted">
                  {spec.label}
                </dt>
                <dd className="mt-1 text-body text-foreground">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <section ref={costRef} className="mt-10 sm:mt-16">
          <SectionLabel>Coste estimado de importación</SectionLabel>
          <h2 className="mt-4 font-display text-heading tabular-nums text-foreground sm:text-heading-lg">
            <span className="whitespace-nowrap">{formatEUR(estimate.total[0])}</span>{" "}
            <span className="text-muted">–</span>{" "}
            <span className="whitespace-nowrap">{formatEUR(estimate.total[1])}</span>
          </h2>
          <p className="mt-3 max-w-lg text-body-sm text-muted">
            Rango orientativo, no un precio cerrado. Depende de la
            valoración final y del estado real del vehículo.
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
            de gestoría pueden variar según la valoración de la Agencia
            Tributaria y la comunidad autónoma. El presupuesto en firme se
            confirma tras inspeccionar el vehículo.
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
