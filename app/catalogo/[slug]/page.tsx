import { vehicles } from "@/lib/mock-data";
import { VehicleFichaClient } from "./vehicle-ficha-client";

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export default function VehicleFichaPage() {
  return <VehicleFichaClient />;
}
