import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export default function VehicleNotFound() {
  return (
    <main className="flex min-h-screen items-center py-24">
      <Container>
        <div className="max-w-lg">
          <SectionLabel>404</SectionLabel>
          <h1 className="mt-4 font-display text-heading-lg text-foreground">
            Este vehículo ya no está disponible
          </h1>
          <p className="mt-4 text-body-sm text-muted">
            Puede que se haya vendido o que el enlace sea incorrecto. Vuelve
            al catálogo para ver el inventario actual.
          </p>
          <Link
            href="/catalogo"
            className="mt-8 inline-flex items-center gap-2 text-body-sm text-accent"
          >
            ← Volver al catálogo
          </Link>
        </div>
      </Container>
    </main>
  );
}
