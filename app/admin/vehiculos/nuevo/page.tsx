"use client";

import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { AdminNav } from "@/components/admin/admin-nav";
import { VehicleForm, type VehicleFormValues } from "@/components/admin/vehicle-form";
import { useVehicleStore } from "@/lib/vehicle-store";
import { useStaggerReveal } from "@/hooks/use-scroll-reveal";

export default function NuevoVehiculoPage() {
  const router = useRouter();
  const { addVehicle } = useVehicleStore();
  const headerRef = useStaggerReveal<HTMLDivElement>();

  function handleSubmit(values: VehicleFormValues) {
    addVehicle(values);
    router.push("/admin/vehiculos");
  }

  return (
    <main className="pb-32 pt-24">
      <AdminNav />
      <Container>
        <div ref={headerRef} className="mt-10 max-w-2xl">
          <div data-stagger-item>
            <SectionLabel>Panel interno</SectionLabel>
          </div>
          <h1 data-stagger-item className="mt-4 font-display text-heading-lg text-foreground">
            Alta de vehículo
          </h1>
          <p data-stagger-item className="mt-4 text-body-sm text-muted">
            Se añade al sistema al guardar — visible en el catálogo público
            si el estado no es &quot;Borrador&quot;. Guardado en este
            navegador, sin base de datos real.
          </p>
        </div>

        <VehicleForm
          submitLabel="Guardar vehículo"
          onSubmit={handleSubmit}
          onDiscard={() => router.push("/admin/vehiculos")}
        />
      </Container>
    </main>
  );
}
