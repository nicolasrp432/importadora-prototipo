"use client";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import { VehicleCard } from "@/components/catalog/vehicle-card";
import { vehicles } from "@/lib/mock-data";
import { useSectionReveal, useStaggerReveal, useCountUp } from "@/hooks/use-scroll-reveal";

const colorTokens = [
  { name: "background", value: "#0B0C0E", className: "bg-background" },
  { name: "surface", value: "#14161A", className: "bg-surface" },
  { name: "border", value: "#23262B", className: "bg-border" },
  { name: "foreground", value: "#F2F0ED", className: "bg-foreground" },
  { name: "muted", value: "#8A8F96", className: "bg-muted" },
  { name: "accent", value: "#4A7A96", className: "bg-accent" },
  { name: "accent-hover", value: "#5C8CAA", className: "bg-accent-hover" },
  { name: "accent-active", value: "#3D6780", className: "bg-accent-active" },
];

const typeScale = [
  { name: "caption", size: "text-caption", font: "font-sans" },
  { name: "body-sm", size: "text-body-sm", font: "font-sans" },
  { name: "body", size: "text-body", font: "font-sans" },
  { name: "body-lg", size: "text-body-lg", font: "font-sans" },
  { name: "heading-sm", size: "text-heading-sm", font: "font-display" },
  { name: "heading", size: "text-heading", font: "font-display" },
  { name: "heading-lg", size: "text-heading-lg", font: "font-display" },
  { name: "display", size: "text-display", font: "font-display" },
];

const spacingSteps = [1, 2, 3, 4, 6, 8];

const radiusSamples = [
  { name: "none", className: "rounded-none" },
  { name: "sm", className: "rounded-sm" },
  { name: "md", className: "rounded-md" },
];

export default function KitchenSinkPage() {
  const heroRef = useStaggerReveal<HTMLDivElement>();
  const colorsRef = useSectionReveal<HTMLElement>("fade-up");
  const typeRef = useSectionReveal<HTMLElement>("scale-up");
  const spaceRef = useSectionReveal<HTMLElement>("clip-reveal");
  const motionRef = useStaggerReveal<HTMLDivElement>();
  const primitivesRef = useSectionReveal<HTMLElement>("fade-up");
  const mediaRef = useSectionReveal<HTMLElement>("scale-up");
  const cardRef = useStaggerReveal<HTMLDivElement>();

  const statRef = useCountUp(128, "+");

  return (
    <main className="pb-32">
      <section className="border-b border-border py-14 sm:py-20 lg:py-24">
        <Container>
          <div ref={heroRef} className="max-w-2xl">
            <div data-stagger-item>
              <SectionLabel>Sistema de diseño</SectionLabel>
            </div>
            <h1 data-stagger-item className="mt-6 font-display text-display text-foreground">
              Kitchen Sink
            </h1>
            <p data-stagger-item className="mt-6 max-w-lg text-body text-muted">
              Tokens, tipografía, primitivos y movimiento. Base visual del
              prototipo — todavía sin ninguna pantalla de producto.
            </p>
            <div data-stagger-item className="mt-8 flex flex-wrap gap-4">
              <Button variant="primary">Acción primaria</Button>
              <Button variant="secondary">Acción secundaria</Button>
            </div>
          </div>
        </Container>
      </section>

      <section ref={colorsRef} className="border-b border-border py-20">
        <Container>
          <SectionLabel>Color</SectionLabel>
          <h2 className="mt-4 font-display text-heading-lg text-foreground">
            Una paleta, un acento
          </h2>
          <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {colorTokens.map((token) => (
              <div key={token.name}>
                <div className={`h-20 rounded-md border border-border ${token.className}`} />
                <p className="mt-3 text-body-sm text-foreground">{token.name}</p>
                <p className="text-caption text-muted">{token.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section ref={typeRef} className="border-b border-border py-20">
        <Container>
          <SectionLabel>Tipografía</SectionLabel>
          <h2 className="mt-4 font-display text-heading-lg text-foreground">
            Dos grotesk, dos trabajos
          </h2>

          <div className="mt-8 sm:mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="font-display text-heading text-foreground">
                Bricolage Grotesque
              </p>
              <p className="mt-2 text-body-sm text-muted">
                Grotesk display con personalidad editorial y optical sizing
                variable: carácter propio en titulares grandes sin recurrir a
                una serif.
              </p>
            </div>
            <div>
              <p className="font-sans text-heading text-foreground">Inter</p>
              <p className="mt-2 text-body-sm text-muted">
                El grotesk de UI más probado en pantalla: x-height alta y
                pesos variables que garantizan legibilidad en labels, botones
                y cuerpos de texto pequeños.
              </p>
            </div>
          </div>

          <div className="mt-14 space-y-8">
            {typeScale.map((step) => (
              <div key={step.name} className="border-b border-border pb-6">
                <span className="text-caption uppercase tracking-[0.1em] text-muted">
                  {step.name}
                </span>
                <p className={`mt-2 text-foreground ${step.font} ${step.size}`}>
                  Eleven Motorworks
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-caption text-muted">
            Redimensiona la ventana: cada tamaño interpola con clamp() entre
            móvil y escritorio.
          </p>
        </Container>
      </section>

      <section ref={spaceRef} className="border-b border-border py-20">
        <Container>
          <SectionLabel>Espaciado y radios</SectionLabel>
          <h2 className="mt-4 font-display text-heading-lg text-foreground">
            Grilla de 8px
          </h2>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-end gap-6">
            {spacingSteps.map((step) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div
                  className="border border-border bg-surface"
                  style={{
                    width: `calc(var(--spacing) * ${step})`,
                    height: `calc(var(--spacing) * ${step})`,
                  }}
                />
                <span className="text-caption text-muted">{step * 8}px</span>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-6">
            {radiusSamples.map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-2">
                <div className={`h-16 w-16 border border-border bg-surface ${r.className}`} />
                <span className="text-caption text-muted">rounded-{r.name}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-caption text-muted">
            rounded-full existe en Tailwind pero está prohibido por el
            sistema visual: ninguna card debe verse tipo pill.
          </p>
        </Container>
      </section>

      <section className="border-b border-border py-20">
        <Container>
          <div ref={motionRef}>
            <div data-stagger-item>
              <SectionLabel>Movimiento</SectionLabel>
            </div>
            <h2 data-stagger-item className="mt-4 font-display text-heading-lg text-foreground">
              Lenis + GSAP ScrollTrigger
            </h2>

            <div data-stagger-item className="mt-8 sm:mt-10 grid gap-4 sm:grid-cols-2">
              <div className="cursor-default rounded-md border border-border bg-surface p-6 transition-transform duration-700 ease-reveal hover:-translate-y-2">
                <p className="text-body text-foreground">ease-reveal</p>
                <p className="mt-1 text-caption text-muted">
                  cubic-bezier(0.16, 1, 0.3, 1) · entradas, 0.6–0.9s
                </p>
              </div>
              <div className="cursor-default rounded-md border border-border bg-surface p-6 transition-transform duration-700 ease-standard hover:-translate-y-2">
                <p className="text-body text-foreground">ease-standard</p>
                <p className="mt-1 text-caption text-muted">
                  cubic-bezier(0.65, 0, 0.35, 1) · interacciones de UI
                </p>
              </div>
            </div>

            <div data-stagger-item className="mt-8 sm:mt-10">
              <p className="font-display text-display text-foreground">
                <span ref={statRef}>0</span>
              </p>
              <p className="mt-2 text-body-sm text-muted">
                vehículos gestionados — el número cuenta desde 0 al entrar en
                el viewport
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section ref={primitivesRef} className="border-b border-border py-20">
        <Container>
          <SectionLabel>Primitivos — Button</SectionLabel>
          <h2 className="mt-4 font-display text-heading-lg text-foreground">
            Tres variantes, un acento
          </h2>
          <p className="mt-4 max-w-lg text-body-sm text-muted">
            Tab para ver el foco, hover para el estado intermedio, clic para
            el activo. El acento (#4A7A96) solo aparece en la variante
            primaria.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </Container>
      </section>

      <section ref={mediaRef} className="py-20">
        <Container>
          <SectionLabel>Primitivos — MediaFrame</SectionLabel>
          <h2 className="mt-4 font-display text-heading-lg text-foreground">
            La foto nunca es el producto
          </h2>
          <p className="mt-4 max-w-lg text-body-sm text-muted">
            Aspect-ratio fijo, object-cover y gradiente inferior obligatorio.
            Test de aceptación: esto sigue funcionando aunque cada imagen sea
            un rectángulo gris.
          </p>

          <div className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-3">
            <MediaFrame ratio="16/9">
              <span className="text-caption uppercase tracking-[0.1em] text-foreground">
                16 / 9
              </span>
            </MediaFrame>
            <MediaFrame ratio="4/5">
              <span className="text-caption uppercase tracking-[0.1em] text-foreground">
                4 / 5
              </span>
            </MediaFrame>
            <MediaFrame ratio="1/1">
              <span className="text-caption uppercase tracking-[0.1em] text-foreground">
                1 / 1
              </span>
            </MediaFrame>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-20">
        <Container>
          <div ref={cardRef}>
            <div data-stagger-item>
              <SectionLabel>Catálogo — VehicleCard</SectionLabel>
            </div>
            <h2 data-stagger-item className="mt-4 font-display text-heading-lg text-foreground">
              La ficha, antes de la foto real
            </h2>
            <p data-stagger-item className="mt-4 max-w-lg text-body-sm text-muted">
              3 de los 10 vehículos mockeados en /lib/mock-data.ts. Sin
              imagen real todavía: MediaFrame cae al rectángulo gris y la
              card no pierde nada.
            </p>

            <div data-stagger-item className="mt-8 sm:mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {vehicles.slice(0, 3).map((vehicle) => (
                <VehicleCard key={vehicle.slug} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
