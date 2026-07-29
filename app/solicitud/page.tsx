"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { Field, SelectField, TextareaField } from "@/components/ui/field";
import { useSectionReveal, useStaggerReveal } from "@/hooks/use-scroll-reveal";

const BRAND_OPTIONS = [
  { value: "", label: "Sin preferencia" },
  { value: "Lamborghini", label: "Lamborghini" },
  { value: "Ferrari", label: "Ferrari" },
  { value: "Bentley", label: "Bentley" },
  { value: "Rolls-Royce", label: "Rolls-Royce" },
  { value: "McLaren", label: "McLaren" },
  { value: "Mercedes-AMG", label: "Mercedes-AMG" },
  { value: "Otra", label: "Otra" },
];

const FUEL_OPTIONS = [
  { value: "", label: "Sin preferencia" },
  { value: "Gasolina", label: "Gasolina" },
  { value: "Híbrido enchufable", label: "Híbrido enchufable" },
];

function ConfirmationPanel() {
  const ref = useSectionReveal<HTMLDivElement>("scale-up");
  return (
    <div ref={ref} className="max-w-lg">
      <SectionLabel>Solicitud recibida</SectionLabel>
      <h1 className="mt-4 font-display text-heading-lg text-foreground">
        Nos ponemos a buscarlo
      </h1>
      <p className="mt-4 text-body-sm text-muted">
        En menos de 48h te contactamos con las primeras opciones que
        encajen con lo que buscas, junto con el coste real de traerlo.
      </p>
      <Link
        href="/catalogo"
        className="mt-8 inline-flex items-center gap-2 text-body-sm text-accent"
      >
        Ver catálogo disponible ahora →
      </Link>
    </div>
  );
}

export default function SolicitudPage() {
  const [submitted, setSubmitted] = useState(false);

  const headerRef = useStaggerReveal<HTMLDivElement>();
  const formRef = useSectionReveal<HTMLFormElement>("clip-reveal");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="flex min-h-[100svh] items-center py-14 sm:py-20 lg:py-24">
        <Container>
          <ConfirmationPanel />
        </Container>
      </main>
    );
  }

  return (
    <main className="pb-20 pt-14 sm:pb-32 sm:pt-24">
      <Container>
        <div ref={headerRef} className="max-w-2xl">
          <div data-stagger-item>
            <SectionLabel>Búsqueda por encargo</SectionLabel>
          </div>
          <h1 data-stagger-item className="mt-4 font-display text-heading-lg text-foreground">
            ¿No está en el catálogo? Lo buscamos
          </h1>
          <p data-stagger-item className="mt-4 text-body-sm text-muted">
            Dinos qué buscas y rastreamos el mercado de Dubái. Te contactamos
            con opciones reales y su coste de importación.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 sm:mt-12 max-w-2xl">
          <div className="grid gap-6 border-y border-border py-8 sm:py-10 sm:grid-cols-2">
            <SelectField id="marca" label="Marca preferida" options={BRAND_OPTIONS} />
            <Field id="modelo" label="Modelo deseado" placeholder="Ej. Serie 5 Touring" />
            <Field
              id="presupuesto"
              label="Presupuesto máximo"
              type="number"
              min={0}
              step={500}
              suffix="€"
              placeholder="40000"
            />
            <Field
              id="anio"
              label="Año mínimo"
              type="number"
              min={2000}
              max={2026}
              placeholder="2020"
            />
            <Field
              id="km"
              label="Kilometraje máximo"
              type="number"
              min={0}
              step={1000}
              suffix="km"
              placeholder="80000"
            />
            <SelectField id="combustible" label="Combustible preferido" options={FUEL_OPTIONS} />
          </div>

          <div className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-2">
            <Field id="nombre" label="Nombre" required placeholder="Tu nombre" />
            <Field id="email" label="Email" type="email" required placeholder="tu@email.com" />
            <Field
              id="telefono"
              label="Teléfono"
              type="tel"
              className="sm:col-span-2"
              placeholder="+34 600 000 000"
            />
          </div>

          <div className="mt-6">
            <TextareaField
              id="comentarios"
              label="Comentarios adicionales"
              placeholder="Color, equipamiento, plazos, cualquier detalle que nos ayude a encontrarlo."
            />
          </div>

          <p className="mt-6 max-w-lg text-caption text-muted">
            Al enviar aceptas que te contactemos para gestionar tu búsqueda.
            No compartimos tus datos con terceros.
          </p>

          <div className="mt-8">
            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              Enviar solicitud
            </Button>
          </div>
        </form>
      </Container>
    </main>
  );
}
