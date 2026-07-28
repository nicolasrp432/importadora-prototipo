"use client";

import { useParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { AdminNav } from "@/components/admin/admin-nav";
import { VehicleForm, type VehicleFormValues } from "@/components/admin/vehicle-form";
import { useVehicleStore } from "@/lib/vehicle-store";

export default function EditarVehiculoPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { getVehicle, updateVehicle, hydrated } = useVehicleStore();
  const vehicle = getVehicle(params.slug);

  function handleSubmit(values: VehicleFormValues) {
    updateVehicle(params.slug, values);
    router.push("/admin/vehiculos");
  }

  if (!hydrated) return null;

  if (!vehicle) {
    return (
      <main className="pb-32 pt-24">
        <AdminNav />
        <Container>
          <p className="mt-10 text-body-sm text-muted">
            Vehículo no encontrado.
          </p>
        </Container>
      </main>
    );
  }

  const initialValues: VehicleFormValues = {
    brand: vehicle.brand,
    model: vehicle.model,
    variant: vehicle.variant,
    year: vehicle.year,
    km: vehicle.km,
    power: vehicle.power,
    fuel: vehicle.fuel,
    transmission: vehicle.transmission,
    emissions: vehicle.emissions,
    originPrice: vehicle.originPrice,
    location: vehicle.location,
    image: vehicle.image,
    status: vehicle.status,
    notes: vehicle.notes,
  };

  return (
    <main className="pb-32 pt-24">
      <AdminNav />
      <Container>
        <div className="mt-10 max-w-2xl">
          <SectionLabel>Panel interno</SectionLabel>
          <h1 className="mt-4 font-display text-heading-lg text-foreground">
            Editar {vehicle.brand} {vehicle.model}
          </h1>
        </div>

        <VehicleForm
          initialValues={initialValues}
          submitLabel="Guardar cambios"
          onSubmit={handleSubmit}
          onDiscard={() => router.push("/admin/vehiculos")}
        />
      </Container>
    </main>
  );
}
