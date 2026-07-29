import Image from "next/image";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/asset-path";

type Ratio = "16/9" | "4/5" | "1/1" | "3/4";

interface MediaFrameProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  ratio?: Ratio;
  priority?: boolean;
}

export function MediaFrame({
  src,
  alt = "",
  ratio = "4/5",
  priority = false,
  className,
  children,
  ...props
}: MediaFrameProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-md bg-surface", className)}
      style={{ aspectRatio: ratio }}
      {...props}
    >
      {src ? (
        <Image
          src={assetPath(src) as string}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-border/60" aria-hidden="true" />
      )}
      {/* Scrim base: la foto del cliente nunca domina, se apoya sobre el fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-background/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/45 to-transparent"
      />
      {children ? (
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">{children}</div>
      ) : null}
    </div>
  );
}
