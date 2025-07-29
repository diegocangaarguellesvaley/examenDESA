// src/pages/Carrito.tsx
import React, { useState } from "react";

interface Item {
  id: number;
  tipo: "tamal" | "bebida" | "combo";
  nombre: string;
  precio: number;
  cantidad: number;
}

const Carrito: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    // Ejemplo de items agregados al carrito
    { id: 1, tipo: "tamal", nombre: "Tamal de Pollo", precio: 10, cantidad: 2 },
    { id: 2, tipo: "bebida", nombre: "Atole de Elote", precio: 8, cantidad: 1 },
  ]);

  const actualizarCantidad = (id: number, nuevaCantidad: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const eliminarItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-6">Carrito de Compras</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <h3 className="font-semibold">{item.nombre}</h3>
                <p className="text-sm text-gray-600">Tipo: {item.tipo}</p>
                <p className="text-sm text-gray-600">Precio: Q{item.precio}</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min={1}
                  value={item.cantidad}
                  onChange={(e) => actualizarCantidad(item.id, Number(e.target.value))}
                  className="w-16 border rounded px-2 py-1"
                />
                <button
                  onClick={() => eliminarItem(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-4 text-lg font-bold text-green-700">
            Total: Q{total.toFixed(2)}
          </div>

          <div className="flex justify-end">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Finalizar pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
