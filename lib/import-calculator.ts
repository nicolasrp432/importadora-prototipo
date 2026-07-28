export interface ImportBreakdownItem {
  label: string;
  range: [number, number];
}

export interface ImportEstimate {
  items: ImportBreakdownItem[];
  total: [number, number];
}

// TODO: validar con asesor fiscal — modelo aproximado para importar un
// vehículo desde fuera de la UE (Emiratos Árabes Unidos) a España: arancel
// de aduana, IVA de importación e impuesto de matriculación por tramos de
// CO2. Los porcentajes y rangos varían según el vehículo y la normativa
// vigente. No usar en producción sin validación de un asesor fiscal/aduanero.
function registrationTaxRate(emissions: number) {
  if (emissions <= 120) return 0;
  if (emissions <= 160) return 0.0475;
  if (emissions <= 200) return 0.0975;
  return 0.1475;
}

const CUSTOMS_DUTY_RATE = 0.1;
const IMPORT_VAT_RATE = 0.21;

export function estimateImportCost(
  originPrice: number,
  emissions: number
): ImportEstimate {
  const registrationRate = registrationTaxRate(emissions);

  const customsDuty: [number, number] = [
    Math.round(originPrice * CUSTOMS_DUTY_RATE * 0.95),
    Math.round(originPrice * CUSTOMS_DUTY_RATE * 1.05),
  ];

  const importVat: [number, number] = [
    Math.round((originPrice + customsDuty[0]) * IMPORT_VAT_RATE),
    Math.round((originPrice + customsDuty[1]) * IMPORT_VAT_RATE),
  ];

  const items: ImportBreakdownItem[] = [
    { label: "Precio origen", range: [originPrice, originPrice] },
    { label: "Transporte desde Dubái", range: [2200, 3400] },
    { label: "Aduana", range: customsDuty },
    { label: "IVA de importación", range: importVat },
    {
      label: "Impuesto de matriculación",
      range: [
        Math.round(originPrice * registrationRate * 0.94),
        Math.round(originPrice * registrationRate * 1.08),
      ],
    },
    { label: "Homologación individual", range: [900, 1900] },
    { label: "Gestoría", range: [750, 1100] },
  ];

  const total: [number, number] = [
    items.reduce((sum, item) => sum + item.range[0], 0),
    items.reduce((sum, item) => sum + item.range[1], 0),
  ];

  return { items, total };
}
