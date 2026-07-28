import Link from "next/link";
import { MediaFrame } from "@/components/ui/media-frame";
import type { Vehicle } from "@/lib/mock-data";
import { formatEUR, formatKm } from "@/lib/format";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      href={`/catalogo/${vehicle.slug}`}
      className="group block focus-visible:outline-none"
    >
      <MediaFrame ratio="16/9" src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`}>
        <span className="text-caption uppercase tracking-[0.14em] text-foreground">
          {vehicle.brand}
        </span>
      </MediaFrame>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-heading-sm text-foreground">
            {vehicle.model}{" "}
            <span className="text-muted">{vehicle.variant}</span>
          </h3>
          <p className="mt-1 text-body-sm text-muted">
            {vehicle.year} · {formatKm(vehicle.km)} · {vehicle.power} CV ·{" "}
            {vehicle.fuel}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="text-caption uppercase tracking-[0.1em] text-muted">
            Precio origen
          </p>
          <p className="mt-1 text-body text-foreground">
            {formatEUR(vehicle.originPrice)}
          </p>
        </div>
        <span className="flex items-center gap-2 text-body-sm text-accent transition-transform duration-200 ease-standard group-hover:translate-x-1">
          Ver ficha
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
