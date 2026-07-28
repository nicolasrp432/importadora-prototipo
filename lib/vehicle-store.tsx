"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { vehicles as seedVehicles, type Vehicle } from "@/lib/mock-data";

const STORAGE_KEY = "eleven-motorworks:vehicles";

export type VehicleInput = Omit<Vehicle, "slug">;

interface VehicleStoreValue {
  vehicles: Vehicle[];
  hydrated: boolean;
  getVehicle: (slug: string) => Vehicle | undefined;
  addVehicle: (input: VehicleInput) => Vehicle;
  updateVehicle: (slug: string, input: VehicleInput) => void;
  deleteVehicle: (slug: string) => void;
}

const VehicleStoreContext = createContext<VehicleStoreValue | null>(null);

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function makeSlug(input: VehicleInput, existing: Vehicle[]) {
  const base = slugify(`${input.brand}-${input.model}-${input.variant}-${input.year}`);
  let slug = base;
  let suffix = 2;
  while (existing.some((vehicle) => vehicle.slug === slug)) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }
  return slug;
}

export function VehicleStoreProvider({ children }: { children: ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(seedVehicles);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Vehicle[];
        if (Array.isArray(parsed) && parsed.length > 0) setVehicles(parsed);
      }
    } catch {
      // localStorage no disponible o datos corruptos — se queda con el seed.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
    } catch {
      // Almacenamiento lleno o no disponible — no bloquea la app.
    }
  }, [vehicles, hydrated]);

  function getVehicle(slug: string) {
    return vehicles.find((vehicle) => vehicle.slug === slug);
  }

  function addVehicle(input: VehicleInput) {
    const slug = makeSlug(input, vehicles);
    const vehicle: Vehicle = { ...input, slug };
    setVehicles((prev) => [vehicle, ...prev]);
    return vehicle;
  }

  function updateVehicle(slug: string, input: VehicleInput) {
    setVehicles((prev) =>
      prev.map((vehicle) => (vehicle.slug === slug ? { ...input, slug } : vehicle))
    );
  }

  function deleteVehicle(slug: string) {
    setVehicles((prev) => prev.filter((vehicle) => vehicle.slug !== slug));
  }

  return (
    <VehicleStoreContext.Provider
      value={{ vehicles, hydrated, getVehicle, addVehicle, updateVehicle, deleteVehicle }}
    >
      {children}
    </VehicleStoreContext.Provider>
  );
}

export function useVehicleStore() {
  const ctx = useContext(VehicleStoreContext);
  if (!ctx) {
    throw new Error("useVehicleStore debe usarse dentro de VehicleStoreProvider");
  }
  return ctx;
}
