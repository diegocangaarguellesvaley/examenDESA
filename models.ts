// src/types/models.ts

export interface Tamal {
  id?: number;
  masa: "maiz amarillo" | "maiz blanco" | "arroz";
  relleno: "cerdo" | "pollo" | "vegetariano" | "chuchito";
  envoltura: "platano" | "tusa";
  picante: "sin" | "suave" | "chapin";
  cantidad: number;
}

export interface Bebida {
  id?: number;
  tipo: "atol de elote" | "atole shuco" | "pinol" | "cacao";
  tamaño: "vaso" | "jarro";
  endulzante: "panela" | "miel" | "sin";
  toppings: string[];
  cantidad: number;
}

export interface Combo {
  id?: number;
  nombre: string;
  tamales: Tamal[];
  bebidas: Bebida[];
  precio: number;
  editable?: boolean;
}

export interface InventarioItem {
  id?: number;
  nombre: string;
  tipo: "materia prima" | "empaque" | "combustible";
  cantidad: number;
  unidad: string;
  costo: number;
  mermas?: number;
  fechaEntrada: string;
  fechaSalida?: string;
}

export interface DashboardData {
  ventasDiarias: number;
  ventasMensuales: number;
  tamalesMasVendidos: string[];
  bebidasPorHorario: Record<string, string[]>;
  proporcionPicante: Record<"picante" | "no_picante", number>;
  utilidadPorLinea: Record<string, number>;
  desperdicio: Record<string, number>;
}
