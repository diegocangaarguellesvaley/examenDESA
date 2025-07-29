// src/pages/Sucursales.tsx
import React, { useState } from "react";

interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
}

const Sucursales: React.FC = () => {
  const [sucursales] = useState<Sucursal[]>([
    { id: 1, nombre: "Zona 1", direccion: "5a Avenida 3-15, Zona 1", telefono: "2222-1111" },
    { id: 2, nombre: "Zona 10", direccion: "Av. Reforma 10-50, Zona 10", telefono: "2333-4444" },
    { id: 3, nombre: "Mixco", direccion: "Blvd. El Naranjo 45-20, Mixco", telefono: "2444-5555" },
  ]);

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Nuestras Sucursales</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sucursales.map((sucursal) => (
          <div
            key={sucursal.id}
            className="bg-green-100 p-4 rounded-xl shadow hover:shadow-lg transition-all"
          >
            <h2 className="text-xl font-bold text-green-800">{sucursal.nombre}</h2>
            <p className="text-gray-700 mt-2">{sucursal.direccion}</p>
            <p className="text-gray-700 mt-1">Tel: {sucursal.telefono}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sucursales;
