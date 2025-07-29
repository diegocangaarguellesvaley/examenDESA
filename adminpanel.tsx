// src/pages/AdminPanel.tsx
import React from "react";
import { Link } from "react-router-dom";

const AdminPanel: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-10">
        Panel de Administración
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/home" className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Productos</h2>
          <p>Gestiona tamales, bebidas y combos.</p>
        </Link>
        <Link to="/dashboard" className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Dashboard</h2>
          <p>Visualiza ventas y métricas clave.</p>
        </Link>
        <Link to="/sucursales" className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Sucursales</h2>
          <p>Consulta nuestras ubicaciones.</p>
        </Link>
        <Link to="/catalogo" className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Catálogo</h2>
          <p>Vista general de productos para clientes.</p>
        </Link>
        <Link to="/carrito" className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Carrito</h2>
          <p>Revisa y edita tu pedido actual.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;
