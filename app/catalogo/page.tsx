"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/catalog/vehicle-card";
import type { Vehicle } from "@/lib/mock-data";
import { useVehicleStore } from "@/lib/vehicle-store";
import { cn } from "@/lib/cn";
import { useSectionReveal, useStaggerReveal } from "@/hooks/use-scroll-reveal";

const BRANDS = [
  "Todas",
  "Lamborghini",
  "Ferrari",
  "Bentley",
  "Rolls-Royce",
  "McLaren",
  "Mercedes-AMG",
] as const;
const FUELS = ["Todos", "Gasolina", "Híbrido enchufable"] as const;

type Brand = (typeof BRANDS)[number];
type Fuel = (typeof FUELS)[number];

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="text-caption uppercase tracking-[0.12em] text-muted">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option)}
              className={cn(
                "cursor-pointer rounded-sm border px-4 py-2 text-body-sm transition-colors duration-200 ease-standard",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                active
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border text-muted hover:border-muted hover:text-foreground"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  const router = useRouter();
  const { vehicles } = useVehicleStore();
  const [brand, setBrand] = useState<Brand>("Todas");
  const [fuel, setFuel] = useState<Fuel>("Todos");

  const publicVehicles = useMemo(
    () => vehicles.filter((vehicle) => vehicle.status !== "borrador"),
    [vehicles]
  );

  const filtered = useMemo(() => {
    return publicVehicles.filter((vehicle: Vehicle) => {
      const matchesBrand = brand === "Todas" || vehicle.brand === brand;
      const matchesFuel = fuel === "Todos" || vehicle.fuel === fuel;
      return matchesBrand && matchesFuel;
    });
  }, [publicVehicles, brand, fuel]);

  const headerRef = useStaggerReveal<HTMLDivElement>();
  const gridRef = useSectionReveal<HTMLDivElement>("fade-up");

  function resetFilters() {
    setBrand("Todas");
    setFuel("Todos");
  }

  return (
    <main className="pb-32 pt-24">
      <Container>
        <div ref={headerRef} className="max-w-2xl">
          <div data-stagger-item>
            <SectionLabel>Catálogo</SectionLabel>
          </div>
          <h1 data-stagger-item className="mt-4 font-display text-heading-lg text-foreground">
            {publicVehicles.length} vehículos disponibles ahora
          </h1>
          <p data-stagger-item className="mt-4 text-body-sm text-muted">
            Inventario en tránsito y en concesionario. Cada ficha incluye
            desglose real de coste de importación.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-10 border-y border-border py-8">
          <FilterGroup label="Marca" options={BRANDS} value={brand} onChange={setBrand} />
          <FilterGroup label="Combustible" options={FUELS} value={fuel} onChange={setFuel} />
        </div>

        <div ref={gridRef} className="mt-12">
          {filtered.length > 0 ? (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((vehicle) => (
                <VehicleCard key={vehicle.slug} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-md border border-dashed border-border py-24 text-center">
              <SectionLabel className="justify-center">Sin resultados</SectionLabel>
              <p className="max-w-md text-body text-foreground">
                No hay vehículos que coincidan con estos filtros.
              </p>
              <p className="max-w-md text-body-sm text-muted">
                Prueba a quitar algún filtro, o solicita este modelo por
                encargo — lo buscamos en el mercado de Dubái para ti.
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-4">
                <Button variant="secondary" onClick={resetFilters}>
                  Quitar filtros
                </Button>
                <Button variant="primary" onClick={() => router.push("/solicitud")}>
                  Solicitar por encargo
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
