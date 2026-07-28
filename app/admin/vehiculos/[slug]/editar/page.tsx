import { vehicles } from "@/lib/mock-data";
import { EditarVehiculoClient } from "./editar-vehiculo-client";

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export default function EditarVehiculoPage() {
  return <EditarVehiculoClient />;
}
