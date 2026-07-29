"use client";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { useVehicleStore } from "@/lib/vehicle-store";
import { useCountUp, useStaggerReveal } from "@/hooks/use-scroll-reveal";

interface Stat {
  target: number;
  suffix: string;
  label: string;
}

function Stat({ target, suffix, label }: Stat) {
  const ref = useCountUp(target, suffix);
  return (
    <div data-stagger-item>
      <span
        ref={ref}
        className="block font-display text-heading-lg text-foreground"
      >
        0{suffix}
      </span>
      <p className="mt-3 max-w-[22ch] text-body-sm text-muted">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const ref = useStaggerReveal<HTMLDivElement>();
  const { vehicles } = useVehicleStore();
  const publicCount = vehicles.filter((vehicle) => vehicle.status !== "borrador").length;

  const stats: Stat[] = [
    { target: publicCount, suffix: "", label: "Vehículos en stock ahora mismo" },
    { target: 48, suffix: "h", label: "Primera respuesta con opciones reales" },
    { target: 100, suffix: "%", label: "Del coste desglosado antes de decidir" },
  ];

  return (
    <section className="border-t border-border py-14 sm:py-20 lg:py-24">
      <Container>
        <div ref={ref}>
          <div data-stagger-item>
            <SectionLabel>Por qué importar con nosotros</SectionLabel>
          </div>
          <h2
            data-stagger-item
            className="mt-4 max-w-2xl font-display text-heading-lg text-foreground"
          >
            El coste real, por delante — nunca al final
          </h2>
          <div className="mt-10 grid gap-10 sm:mt-16 sm:grid-cols-3 sm:gap-12">
            {stats.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
