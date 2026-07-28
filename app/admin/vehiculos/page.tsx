"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { AdminNav } from "@/components/admin/admin-nav";
import { useVehicleStore } from "@/lib/vehicle-store";
import { formatEUR, formatKm } from "@/lib/format";
import { useStaggerReveal } from "@/hooks/use-scroll-reveal";

const STATUS_LABEL: Record<string, string> = {
  borrador: "Borrador",
  transito: "En tránsito",
  disponible: "Disponible",
};

export default function AdminVehiculosPage() {
  const router = useRouter();
  const { vehicles, hydrated, deleteVehicle } = useVehicleStore();
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const headerRef = useStaggerReveal<HTMLDivElement>();

  function confirmDelete(slug: string) {
    deleteVehicle(slug);
    setPendingDelete(null);
  }

  return (
    <main className="pb-32 pt-24">
      <AdminNav />
      <Container>
        <div
          ref={headerRef}
          className="mt-10 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <div data-stagger-item>
              <SectionLabel>Panel interno</SectionLabel>
            </div>
            <h1
              data-stagger-item
              className="mt-4 font-display text-heading-lg text-foreground"
            >
              {vehicles.length} vehículos en el sistema
            </h1>
          </div>
          <div data-stagger-item>
            <Button
              variant="primary"
              onClick={() => router.push("/admin/vehiculos/nuevo")}
            >
              + Añadir vehículo
            </Button>
          </div>
        </div>

        <div className="mt-12 border-t border-border">
          {!hydrated ? null : vehicles.length === 0 ? (
            <p className="py-16 text-center text-body-sm text-muted">
              No hay vehículos todavía.
            </p>
          ) : (
            vehicles.map((vehicle) => (
              <div
                key={vehicle.slug}
                className="flex flex-wrap items-center justify-between gap-4 border-b border-border py-6"
              >
                <div>
                  <p className="text-body text-foreground">
                    {vehicle.brand} {vehicle.model}{" "}
                    <span className="text-muted">{vehicle.variant}</span>
                  </p>
                  <p className="mt-1 text-body-sm text-muted">
                    {vehicle.year} · {formatKm(vehicle.km)} ·{" "}
                    {formatEUR(vehicle.originPrice)} · {vehicle.location}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-caption uppercase tracking-[0.1em] text-muted">
                    {STATUS_LABEL[vehicle.status ?? "disponible"]}
                  </span>
                  <Link
                    href={`/catalogo/${vehicle.slug}`}
                    className="text-body-sm text-accent transition-colors duration-200 ease-standard hover:text-accent-hover"
                  >
                    Ver ficha
                  </Link>
                  <Button
                    variant="secondary"
                    onClick={() => router.push(`/admin/vehiculos/${vehicle.slug}/editar`)}
                  >
                    Editar
                  </Button>
                  {pendingDelete === vehicle.slug ? (
                    <div className="flex items-center gap-2">
                      <span className="text-body-sm text-muted">¿Seguro?</span>
                      <Button variant="primary" onClick={() => confirmDelete(vehicle.slug)}>
                        Sí, eliminar
                      </Button>
                      <Button variant="ghost" onClick={() => setPendingDelete(null)}>
                        Cancelar
                      </Button>
                    </div>
                  ) : (
                    <Button variant="ghost" onClick={() => setPendingDelete(vehicle.slug)}>
                      Eliminar
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </main>
  );
}
