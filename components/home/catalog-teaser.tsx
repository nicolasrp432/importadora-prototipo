"use client";

import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/catalog/vehicle-card";
import { useVehicleStore } from "@/lib/vehicle-store";
import { useSectionReveal, useStaggerReveal } from "@/hooks/use-scroll-reveal";

export function CatalogTeaser() {
  const router = useRouter();
  const { vehicles } = useVehicleStore();
  const publicVehicles = vehicles.filter((vehicle) => vehicle.status !== "borrador");
  const featured = publicVehicles.slice(0, 3);
  const headerRef = useSectionReveal<HTMLDivElement>("fade-up");
  const gridRef = useStaggerReveal<HTMLDivElement>();

  return (
    <section className="border-t border-border py-24">
      <Container>
        <div ref={headerRef} className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Catálogo</SectionLabel>
            <h2 className="mt-4 max-w-xl font-display text-heading-lg text-foreground">
              Disponibles ahora
            </h2>
          </div>
          <Button variant="secondary" onClick={() => router.push("/catalogo")}>
            Ver los {publicVehicles.length} vehículos →
          </Button>
        </div>

        <div ref={gridRef} className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((vehicle) => (
            <div key={vehicle.slug} data-stagger-item>
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
