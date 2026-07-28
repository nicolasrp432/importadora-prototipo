import Image from "next/image";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Ratio = "16/9" | "4/5" | "1/1" | "3/4";

interface MediaFrameProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  ratio?: Ratio;
}

export function MediaFrame({
  src,
  alt = "",
  ratio = "4/5",
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
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-border/60" aria-hidden="true" />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/40 to-transparent" />
      {children ? <div className="absolute inset-x-0 bottom-0 p-4">{children}</div> : null}
    </div>
  );
}
