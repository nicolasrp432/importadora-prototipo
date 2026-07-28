"use client";

import { useParams } from "next/navigation";
import { estimateImportCost } from "@/lib/import-calculator";
import { VehicleFicha } from "@/components/catalog/vehicle-ficha";
import { useVehicleStore } from "@/lib/vehicle-store";
import VehicleNotFound from "./not-found";

export default function VehicleFichaPage() {
  const params = useParams<{ slug: string }>();
  const { getVehicle, hydrated } = useVehicleStore();
  const vehicle = getVehicle(params.slug);

  if (!vehicle) {
    // Puede que sea un vehículo añadido desde el panel de admin, guardado
    // en localStorage — esperamos a que cargue antes de dar 404 por bueno.
    if (!hydrated) return null;
    return <VehicleNotFound />;
  }

  const estimate = estimateImportCost(vehicle.originPrice, vehicle.emissions);

  return <VehicleFicha vehicle={vehicle} estimate={estimate} />;
}
