"use client";

import { useParams } from "next/navigation";
import { estimateImportCost } from "@/lib/import-calculator";
import { VehicleFicha } from "@/components/catalog/vehicle-ficha";
import { useVehicleStore } from "@/lib/vehicle-store";
import VehicleNotFound from "./not-found";

export function VehicleFichaClient() {
  const params = useParams<{ slug: string }>();
  const { getVehicle, hydrated } = useVehicleStore();
  const vehicle = params?.slug ? getVehicle(params.slug) : undefined;

  if (!vehicle) {
    if (!hydrated) return null;
    return <VehicleNotFound />;
  }

  const estimate = estimateImportCost(vehicle.originPrice, vehicle.emissions);

  return <VehicleFicha vehicle={vehicle} estimate={estimate} />;
}
