// 📁 Estructura base del proyecto React + .NET
// ==============================================

// 📁 Frontend (React + Vite + TypeScript)
// =======================================
// Estructura de carpetas sugerida:
// src/
// ├── assets/
// ├── components/
// │   ├── TamalForm.tsx
// │   ├── BebidaForm.tsx
// │   ├── ComboForm.tsx
// │   └── DashboardCard.tsx
// ├── pages/
// │   ├── Home.tsx
// │   ├── Catalogo.tsx
// │   ├── Carrito.tsx
// │   ├── Dashboard.tsx
// │   ├── Sucursales.tsx
// │   └── AdminPanel.tsx
// ├── services/
// │   └── api.ts
// ├── types/
// │   └── models.ts
// ├── context/
// │   └── CartContext.tsx
// ├── App.tsx
// ├── main.tsx
// └── index.css

// 📄 src/types/models.ts
export interface Tamal {
  id?: number;
  masa: 'maiz amarillo' | 'maiz blanco' | 'arroz';
  relleno: 'cerdo' | 'pollo' | 'vegetariano' | 'chuchito';
  envoltura: 'platano' | 'tusa';
  picante: 'sin' | 'suave' | 'chapin';
  cantidad: number;
}

export interface Bebida {
  id?: number;
  tipo: 'atol de elote' | 'atole shuco' | 'pinol' | 'cacao';
  tamaño: 'vaso' | 'jarro';
  endulzante: 'panela' | 'miel' | 'sin';
  toppings: string[]; // ['malvaviscos', 'canela', 'ralladura cacao']
  cantidad: number;
}

export interface Combo {
  id?: number;
  nombre: string;
  tamales: Tamal[];
  bebidas: Bebida[];
  precio: number;
}

export interface InventarioItem {
  id?: number;
  nombre: string;
  tipo: 'materia prima' | 'empaque' | 'combustible';
  cantidad: number;
  unidad: string;
  costo: number;
  mermas?: number;
}
export interface DashboardData {
  ventasDiarias: number;
  ventasMensuales: number;
  tamalesMasVendidos: string[];
  bebidasPorHorario: Record<string, string[]>;
  proporcionPicante: Record<'picante' | 'no_picante', number>;
  utilidadPorLinea: Record<string, number>;
  desperdicio: Record<string, number>;

// 📄 src/components/DashboardCard.tsx
import { DashboardData } from '../types/models';

export const DashboardCard = ({ data }: { data: DashboardData }) => (
  <div>
    <h2>Dashboard</h2>
    <p>Ventas Diarias: Q{data.ventasDiarias}</p>
    <p>Ventas Mensuales: Q{data.ventasMensuales}</p>
    <p>Tamales más vendidos: {data.tamalesMasVendidos.join(', ')}</p>
    <p>Bebidas por horario:</p>
    <ul>{Object.entries(data.bebidasPorHorario).map(([hora, bebidas]) => (<li key={hora}>{hora}: {bebidas.join(', ')}</li>))}</ul>
    <p>Proporción picante: Picante {data.proporcionPicante.picante}, No picante {data.proporcionPicante.no_picante}</p>
    <p>Utilidad por línea:</p>
    <ul>{Object.entries(data.utilidadPorLinea).map(([linea, valor]) => (<li key={linea}>{linea}: Q{valor}</li>))}</ul>
    <p>Desperdicio:</p>
    <ul>{Object.entries(data.desperdicio).map(([item, valor]) => (<li key={item}>{item}: {valor} unidades</li>))}</ul>
  </div>
);
// 📄 src/pages/AdminPanel.tsx
import { useState } from 'react';
import { Combo } from '../types/models';
import api from '../services/api';

export const AdminPanel = () => {
  const [combo, setCombo] = useState<Combo>({ nombre: '', tamales: [], bebidas: [], precio: 0, editable: true });

  const handleSubmit = async () => {
    await api.post('/combos', combo);
    alert('Combo creado o actualizado.');
  };

  return (
    <div>
      <h2>Crear o editar combo estacional</h2>
      <input placeholder="Nombre" onChange={e => setCombo({ ...combo, nombre: e.target.value })} />
      <input type="number" placeholder="Precio" onChange={e => setCombo({ ...combo, precio: +e.target.value })} />
      <button onClick={handleSubmit}>Guardar Combo</button>
    </div>
  );
};

// 📄 src/pages/Sucursales.tsx
export const Sucursales = () => {
  return (
    <div>
      <h2>Sucursales</h2>
      <p>En desarrollo: reportes y gestión local por cada sucursal.</p>
    </div>
  );
};

// 📄 src/services/api.ts (Axios Base)
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:5001/api',
});

export default api;

// 📄 src/context/CartContext.tsx (Contexto de carrito básico)
import { createContext, useContext, useState } from 'react';
import { Tamal, Bebida, Combo } from '../types/models';

interface Cart {
  tamales: Tamal[];
  bebidas: Bebida[];
  combos: Combo[];
}

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ tamales: [], bebidas: [], combos: [] });
  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

// 📁 Backend (.NET Minimal API)
// ============================
// Modelos (Entities)
public class Tamal
{
    public int Id { get; set; }
    public string Masa { get; set; } = "";
    public string Relleno { get; set; } = "";
    public string Envoltura { get; set; } = "";
    public string Picante { get; set; } = "";
    public int Cantidad { get; set; }
}

public class Bebida
{
    public int Id { get; set; }
    public string Tipo { get; set; } = "";
    public string Tamaño { get; set; } = "";
    public string Endulzante { get; set; } = "";
    public List<string> Toppings { get; set; } = new();
    public int Cantidad { get; set; }
}

public class Combo
{
    public int Id { get; set; }
    public string Nombre { get; set; } = "";
    public List<Tamal> Tamales { get; set; } = new();
    public List<Bebida> Bebidas { get; set; } = new();
    public decimal Precio { get; set; }
}

// Endpoint minimal API (Program.cs)
app.MapGet("/api/tamales", (AppDbContext db) => db.Tamales.ToList());
app.MapPost("/api/tamales", async (Tamal t, AppDbContext db) => { db.Tamales.Add(t); await db.SaveChangesAsync(); return Results.Ok(t); });

// Repite similar para bebidas, combos, inventario, ventas, etc.

// 📄 LLM Integración (ejemplo con OpenRouter)
// Desde frontend (React)
const prompt = `Recomiéndame un combo personalizado con 2 tamales picantes y una bebida sin azúcar.`;
const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: 'POST',
  headers: {
    'Authorization': `Bearer TU_API_KEY`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'openai/gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }]
  })
});
const data = await res.json();
console.log(data.choices[0].message.content);


