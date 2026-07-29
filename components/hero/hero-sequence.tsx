"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/asset-path";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 164;
/* En móvil la secuencia va a la mitad de frames (~3,4 MB en vez de 6,8 MB)
   y el track es más corto: el pulgar recorre menos que la rueda. */
const MOBILE_BREAKPOINT = 640;
const MOBILE_STRIDE = 2;
const TRACK_HEIGHT_VH = 650;
const MOBILE_TRACK_HEIGHT_VH = 420;
/* Arranca el scroll con las primeras frames listas; el resto sigue cargando. */
const READY_THRESHOLD = 0.35;

const frameUrl = (i: number) =>
  assetPath(`/hero/frame-${String(i + 1).padStart(4, "0")}.webp`) as string;

interface Chapter {
  start: number;
  end: number;
  feather: number;
  variant: "intro" | "story" | "cue";
  label?: string;
  heading: string;
  body?: string;
}

const CHAPTERS: Chapter[] = [
  {
    start: -1,
    end: 0.14,
    feather: 0.05,
    variant: "intro",
    heading: "Desde Dubái, conducido en todo el mundo",
    body: "De la vitrina en Dubái a tu garaje. Con el coste real por delante, no al final.",
  },
  {
    start: 0.22,
    end: 0.38,
    feather: 0.04,
    variant: "story",
    label: "Quiénes somos",
    heading: "Compramos donde está el mejor mercado del mundo",
    body: "Dubái concentra algunas de las mejores unidades de alta gama, con kilometrajes bajos y mantenimiento impecable. Elegimos unidad por unidad, no por catálogo.",
  },
  {
    start: 0.46,
    end: 0.62,
    feather: 0.04,
    variant: "story",
    label: "Cómo trabajamos",
    heading: "Tú eliges el coche, nosotros el resto",
    body: "Inspección antes de comprar, transporte, aduana y homologación — todo en un único coste que ves antes de decidir, nunca después.",
  },
  {
    start: 0.7,
    end: 0.86,
    feather: 0.04,
    variant: "story",
    label: "Sin sorpresas",
    heading: "La homologación, comprobada antes de comprar",
    body: "No todos los coches que se venden en Dubái pueden matricularse en España. Lo verificamos antes de cerrar la compra — te ahorra miles de euros y muchos dolores de cabeza.",
  },
  {
    start: 0.9,
    end: 0.97,
    feather: 0.03,
    variant: "cue",
    label: "Disponibles ahora",
    heading: "10 vehículos listos para revisar",
  },
];

function chapterOpacity(progress: number, chapter: Chapter) {
  const { start, end, feather } = chapter;
  const fadeInEnd = start + feather;
  const fadeOutStart = end - feather;
  if (progress < start) return 0;
  if (progress < fadeInEnd) return (progress - start) / feather;
  if (progress < fadeOutStart) return 1;
  if (progress < end) return 1 - (progress - fadeOutStart) / feather;
  return 0;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  cw: number,
  ch: number,
  img: HTMLImageElement
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih) return;
  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
}

function ChapterCopy({ chapter }: { chapter: Chapter }) {
  const HeadingTag = chapter.variant === "intro" ? "h1" : "h2";
  return (
    <div>
      {chapter.label ? (
        <p className="text-caption uppercase tracking-[0.14em] text-muted">{chapter.label}</p>
      ) : null}
      <HeadingTag
        className={cn(
          "text-balance text-left font-display text-foreground",
          chapter.variant === "intro" ? "text-display" : "text-heading-lg",
          chapter.label ? "mt-3 sm:mt-4" : ""
        )}
      >
        {chapter.heading}
      </HeadingTag>
      {chapter.body ? (
        <p className="mt-4 max-w-md text-left text-body text-foreground/70 sm:mt-6 sm:text-body-lg sm:text-muted">
          {chapter.body}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Velo de legibilidad. En móvil el texto vive abajo y necesita un degradado
 * vertical: el lateral de escritorio no tapa nada cuando el bloque ocupa
 * todo el ancho. Nunca dejamos la copy sobre el frame desnudo.
 */
function HeroScrim() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/10 sm:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-background/85 via-background/40 to-transparent sm:block"
      />
    </>
  );
}

const COPY_LAYOUT = "absolute inset-0 flex items-end pb-16 sm:items-center sm:pb-0";
const COPY_WIDTH =
  "relative w-full px-4 sm:max-w-[70vw] sm:px-6 lg:max-w-[42vw] lg:px-8";

export function HeroSequence() {
  const trackRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  /* Índices de frame reales: en móvil, uno de cada dos. */
  const frameIndices = useMemo(() => {
    const stride = isMobile ? MOBILE_STRIDE : 1;
    const list: number[] = [];
    for (let i = 0; i < FRAME_COUNT; i += stride) list.push(i);
    if (list[list.length - 1] !== FRAME_COUNT - 1) list.push(FRAME_COUNT - 1);
    return list;
  }, [isMobile]);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);

  useEffect(() => {
    if (reducedMotion !== false) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") ?? null;
    if (!canvas || !ctx) return;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = Math.round(rect.width * dpr);
      canvas!.height = Math.round(rect.height * dpr);
      const img = imagesRef.current[Math.max(currentFrameRef.current, 0)];
      if (img?.complete) drawCover(ctx!, canvas!.width, canvas!.height, img);
    }

    let cancelled = false;
    let loaded = 0;

    const total = frameIndices.length;
    const readyAt = Math.max(1, Math.ceil(total * READY_THRESHOLD));
    imagesRef.current = [];

    resize();

    function settle() {
      loaded += 1;
      setProgress(Math.min(100, Math.round((loaded / readyAt) * 100)));
      if (loaded >= readyAt) setReady(true);
    }

    frameIndices.forEach((frame, slot) => {
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(frame);
      img.onload = () => {
        if (cancelled) return;
        if (slot === 0) {
          currentFrameRef.current = 0;
          resize();
        }
        settle();
      };
      img.onerror = () => {
        if (cancelled) return;
        settle();
      };
      imagesRef.current[slot] = img;
    });

    window.addEventListener("resize", resize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion, frameIndices]);

  useEffect(() => {
    if (reducedMotion !== false || !ready) return;

    const canvas = canvasRef.current;
    const track = trackRef.current;
    const ctx = canvas?.getContext("2d") ?? null;
    if (!canvas || !track || !ctx) return;

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const lastSlot = frameIndices.length - 1;
        const slot = Math.min(lastSlot, Math.round(self.progress * lastSlot));
        if (slot !== currentFrameRef.current) {
          const img = imagesRef.current[slot];
          /* Si esa frame aún no ha bajado, mantenemos la anterior en pantalla. */
          if (img?.complete && img.naturalWidth) {
            currentFrameRef.current = slot;
            drawCover(ctx, canvas.width, canvas.height, img);
          }
        }

        CHAPTERS.forEach((chapter, i) => {
          const el = chapterRefs.current[i];
          if (!el) return;
          const opacity = chapterOpacity(self.progress, chapter);
          el.style.opacity = String(opacity);
          el.style.visibility = opacity <= 0.001 ? "hidden" : "visible";
        });
      },
    });

    return () => trigger.kill();
  }, [ready, reducedMotion, frameIndices]);

  if (reducedMotion === null) return null;

  if (reducedMotion) {
    return (
      <>
        <section className="relative h-[100svh] w-full overflow-hidden bg-background">
          <NextImage
            src={frameUrl(0)}
            alt="Audi RS6 en carretera al atardecer"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <HeroScrim />
          <div className={COPY_LAYOUT}>
            <div className={COPY_WIDTH}>
              <ChapterCopy chapter={CHAPTERS[0]} />
            </div>
          </div>
        </section>
        {CHAPTERS.slice(1).map((chapter, i) => (
          <section key={i} className="border-t border-border py-14 sm:py-20 lg:py-24">
            <Container>
              <div className="max-w-xl">
                <ChapterCopy chapter={chapter} />
              </div>
            </Container>
          </section>
        ))}
      </>
    );
  }

  return (
    <>
      <section
        ref={trackRef}
        className="relative"
        style={{
          height: `${isMobile ? MOBILE_TRACK_HEIGHT_VH : TRACK_HEIGHT_VH}vh`,
        }}
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-background">
          <canvas ref={canvasRef} className="h-full w-full" />
          {!ready && (
            <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 px-4">
              <span className="text-caption uppercase tracking-[0.14em] text-muted">
                Cargando {progress}%
              </span>
              <div className="h-px w-40 max-w-full bg-border sm:w-48">
                <div
                  className="h-px bg-foreground transition-[width] duration-200 ease-standard"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {CHAPTERS.map((chapter, i) => (
        <div
          key={i}
          ref={(el) => {
            chapterRefs.current[i] = el;
          }}
          className="pointer-events-none fixed inset-0 z-10"
          style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
        >
          <HeroScrim />
          <div className={COPY_LAYOUT}>
            <div className={COPY_WIDTH}>
              <ChapterCopy chapter={chapter} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
