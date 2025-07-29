// src/components/Dashboard.tsx
import React from "react";

const Dashboard: React.FC = () => {
  const datos = {
    ventasHoy: 152,
    tamalesVendidos: 320,
    bebidasVendidas: 200,
    combosActivos: 5,
    ingresos: 2700,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h3 className="text-sm text-gray-500">Ventas de hoy</h3>
        <p className="text-2xl font-bold">{datos.ventasHoy}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4">
        <h3 className="text-sm text-gray-500">Tamales vendidos</h3>
        <p className="text-2xl font-bold">{datos.tamalesVendidos}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4">
        <h3 className="text-sm text-gray-500">Bebidas vendidas</h3>
        <p className="text-2xl font-bold">{datos.bebidasVendidas}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4">
        <h3 className="text-sm text-gray-500">Combos activos</h3>
        <p className="text-2xl font-bold">{datos.combosActivos}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 col-span-full lg:col-span-1">
        <h3 className="text-sm text-gray-500">Ingresos estimados (Q)</h3>
        <p className="text-2xl font-bold">Q{datos.ingresos}</p>
      </div>
    </div>
  );
};

export default Dashboard;
