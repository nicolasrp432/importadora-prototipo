"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, SelectField, TextareaField } from "@/components/ui/field";
import { useSectionReveal } from "@/hooks/use-scroll-reveal";
import type { Vehicle } from "@/lib/mock-data";

const BRAND_OPTIONS = [
  { value: "Lamborghini", label: "Lamborghini" },
  { value: "Ferrari", label: "Ferrari" },
  { value: "Bentley", label: "Bentley" },
  { value: "Rolls-Royce", label: "Rolls-Royce" },
  { value: "McLaren", label: "McLaren" },
  { value: "Mercedes-AMG", label: "Mercedes-AMG" },
];

const FUEL_OPTIONS = [
  { value: "Gasolina", label: "Gasolina" },
  { value: "Híbrido enchufable", label: "Híbrido enchufable" },
];

const TRANSMISSION_OPTIONS = [
  { value: "Automática", label: "Automática" },
  { value: "Manual", label: "Manual" },
];

const STATUS_OPTIONS = [
  { value: "borrador", label: "Borrador" },
  { value: "transito", label: "En tránsito" },
  { value: "disponible", label: "Disponible" },
];

export type VehicleFormValues = Omit<Vehicle, "slug">;

const EMPTY_VALUES: VehicleFormValues = {
  brand: "Lamborghini",
  model: "",
  variant: "",
  year: 2024,
  km: 0,
  power: 0,
  fuel: "Gasolina",
  transmission: "Automática",
  emissions: 0,
  originPrice: 0,
  location: "Dubái, EAU",
  status: "borrador",
  notes: "",
};

export function VehicleForm({
  initialValues,
  submitLabel,
  onSubmit,
  onDiscard,
}: {
  initialValues?: VehicleFormValues;
  submitLabel: string;
  onSubmit: (values: VehicleFormValues) => void;
  onDiscard: () => void;
}) {
  const [values, setValues] = useState<VehicleFormValues>(initialValues ?? EMPTY_VALUES);

  const dropzoneRef = useSectionReveal<HTMLDivElement>("scale-up");
  const formRef = useSectionReveal<HTMLFormElement>("fade-up");

  function update<K extends keyof VehicleFormValues>(key: K, value: VehicleFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <>
      <div ref={dropzoneRef} className="mt-10 max-w-2xl">
        <p className="text-caption uppercase tracking-[0.1em] text-muted">Fotos</p>
        <div className="relative mt-3 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-md border border-dashed border-border bg-surface">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <p className="relative max-w-xs text-center text-body-sm text-muted">
            Arrastra fotos aquí o selecciona desde el móvil. Sin retoques —
            foto real en concesionario o garaje.
          </p>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="mt-10 max-w-2xl">
        <div className="grid gap-6 border-y border-border py-10 sm:grid-cols-2">
          <SelectField
            id="brand"
            label="Marca"
            options={BRAND_OPTIONS}
            value={values.brand}
            onChange={(e) => update("brand", e.target.value as Vehicle["brand"])}
          />
          <Field
            id="model"
            label="Modelo"
            required
            placeholder="Ej. Huracán"
            value={values.model}
            onChange={(e) => update("model", e.target.value)}
          />
          <Field
            id="variant"
            label="Variante"
            required
            placeholder="Ej. EVO RWD"
            value={values.variant}
            onChange={(e) => update("variant", e.target.value)}
          />
          <Field
            id="year"
            label="Año"
            type="number"
            required
            min={2000}
            max={2026}
            value={values.year}
            onChange={(e) => update("year", Number(e.target.value))}
          />
          <Field
            id="km"
            label="Kilómetros"
            type="number"
            required
            min={0}
            step={100}
            suffix="km"
            value={values.km}
            onChange={(e) => update("km", Number(e.target.value))}
          />
          <Field
            id="power"
            label="Potencia"
            type="number"
            required
            min={0}
            suffix="CV"
            value={values.power}
            onChange={(e) => update("power", Number(e.target.value))}
          />
          <SelectField
            id="fuel"
            label="Combustible"
            options={FUEL_OPTIONS}
            value={values.fuel}
            onChange={(e) => update("fuel", e.target.value as Vehicle["fuel"])}
          />
          <SelectField
            id="transmission"
            label="Transmisión"
            options={TRANSMISSION_OPTIONS}
            value={values.transmission}
            onChange={(e) => update("transmission", e.target.value as Vehicle["transmission"])}
          />
          <Field
            id="emissions"
            label="Emisiones CO₂"
            type="number"
            required
            min={0}
            suffix="g/km"
            value={values.emissions}
            onChange={(e) => update("emissions", Number(e.target.value))}
          />
          <Field
            id="originPrice"
            label="Precio origen"
            type="number"
            required
            min={0}
            step={1000}
            suffix="€"
            value={values.originPrice}
            onChange={(e) => update("originPrice", Number(e.target.value))}
          />
          <Field
            id="location"
            label="Ubicación"
            required
            placeholder="Dubái, EAU"
            className="sm:col-span-2"
            value={values.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <SelectField
            id="status"
            label="Estado"
            options={STATUS_OPTIONS}
            value={values.status}
            onChange={(e) => update("status", e.target.value as Vehicle["status"])}
          />
        </div>

        <div className="mt-6">
          <TextareaField
            id="notes"
            label="Notas internas"
            placeholder="Estado real del vehículo, extras negociables, urgencia del propietario..."
            value={values.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button type="submit" variant="primary">
            {submitLabel}
          </Button>
          <Button type="button" variant="ghost" onClick={onDiscard}>
            Descartar
          </Button>
        </div>
      </form>
    </>
  );
}
