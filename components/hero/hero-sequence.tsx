"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 164;
const TRACK_HEIGHT_VH = 650;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const frameUrl = (i: number) => `${basePath}/hero/frame-${String(i + 1).padStart(4, "0")}.webp`;

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
          "text-left font-display text-foreground",
          chapter.variant === "intro" ? "text-display" : "text-heading-lg",
          chapter.label ? "mt-4" : ""
        )}
      >
        {chapter.heading}
      </HeadingTag>
      {chapter.body ? (
        <p className="mt-6 max-w-md text-left text-body-lg text-muted">{chapter.body}</p>
      ) : null}
    </div>
  );
}

export function HeroSequence() {
  const trackRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
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

    resize();

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(i);
      img.onload = () => {
        if (cancelled) return;
        loaded += 1;
        setProgress(Math.round((loaded / FRAME_COUNT) * 100));
        if (i === 0) {
          currentFrameRef.current = 0;
          resize();
        }
        if (loaded === FRAME_COUNT) setReady(true);
      };
      img.onerror = () => {
        if (cancelled) return;
        loaded += 1;
        if (loaded === FRAME_COUNT) setReady(true);
      };
      imagesRef.current[i] = img;
    }

    window.addEventListener("resize", resize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

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
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.round(self.progress * (FRAME_COUNT - 1))
        );
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          const img = imagesRef.current[frameIndex];
          if (img) drawCover(ctx, canvas.width, canvas.height, img);
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
  }, [ready, reducedMotion]);

  if (reducedMotion === null) return null;

  if (reducedMotion) {
    return (
      <>
        <section className="relative h-screen w-full overflow-hidden bg-background">
          <NextImage
            src={frameUrl(0)}
            alt="Audi RS6 en carretera al atardecer"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-y-0 left-0 flex w-full items-center bg-gradient-to-r from-background/80 via-background/35 to-transparent">
            <div className="max-w-[85vw] pl-4 sm:max-w-[70vw] sm:pl-6 lg:max-w-[40vw] lg:pl-8">
              <ChapterCopy chapter={CHAPTERS[0]} />
            </div>
          </div>
        </section>
        {CHAPTERS.slice(1).map((chapter, i) => (
          <section key={i} className="border-t border-border py-24">
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
        style={{ height: `${TRACK_HEIGHT_VH}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
          <canvas ref={canvasRef} className="h-full w-full" />
          {!ready && (
            <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3">
              <span className="text-caption uppercase tracking-[0.14em] text-muted">
                Cargando {progress}%
              </span>
              <div className="h-px w-48 bg-border">
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
          className="pointer-events-none fixed inset-y-0 left-0 z-10 flex w-full items-center bg-gradient-to-r from-background/80 via-background/35 to-transparent"
          style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
        >
          <div className="max-w-[85vw] pl-4 sm:max-w-[70vw] sm:pl-6 lg:max-w-[40vw] lg:pl-8">
            <ChapterCopy chapter={chapter} />
          </div>
        </div>
      ))}
    </>
  );
}
