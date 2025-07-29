// src/pages/Catalogo.tsx
import React, { useEffect, useState } from "react";

interface Tamal {
  id: number;
  tipo: string;
  relleno: string;
  precio: number;
}

interface Bebida {
  id: number;
  nombre: string;
  tamaño: string;
  precio: number;
}

interface Combo {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

const Catalogo: React.FC = () => {
  const [tamales, setTamales] = useState<Tamal[]>([]);
  const [bebidas, setBebidas] = useState<Bebida[]>([]);
  const [combos, setCombos] = useState<Combo[]>([]);

  useEffect(() => {
    fetch("/api/tamales").then((res) => res.json()).then(setTamales);
    fetch("/api/bebidas").then((res) => res.json()).then(setBebidas);
    fetch("/api/combos").then((res) => res.json()).then(setCombos);
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-red-700">Catálogo</h1>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Tamales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tamales.map((tamal) => (
            <div key={tamal.id} className="p-4 border rounded-xl shadow-sm bg-green-50">
              <h3 className="font-bold">{tamal.tipo}</h3>
              <p>Relleno: {tamal.relleno}</p>
              <p>Precio: Q{tamal.precio}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Bebidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bebidas.map((bebida) => (
            <div key={bebida.id} className="p-4 border rounded-xl shadow-sm bg-blue-50">
              <h3 className="font-bold">{bebida.nombre}</h3>
              <p>Tamaño: {bebida.tamaño}</p>
              <p>Precio: Q{bebida.precio}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Combos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {combos.map((combo) => (
            <div key={combo.id} className="p-4 border rounded-xl shadow-sm bg-yellow-50">
              <h3 className="font-bold">{combo.nombre}</h3>
              <p>{combo.descripcion}</p>
              <p>Precio: Q{combo.precio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Catalogo;
