// src/components/ComboForm.tsx
import React, { useState } from "react";

interface Combo {
  nombre: string;
  tamal: string;
  bebida: string;
  precio: string;
}

const tamalesDisponibles = ["Tamal de Pollo", "Tamal de Cerdo", "Tamal de Frijol"];
const bebidasDisponibles = ["Café", "Chocolate", "Atol de Elote"];

const ComboForm: React.FC = () => {
  const [combo, setCombo] = useState<Combo>({
    nombre: "",
    tamal: "",
    bebida: "",
    precio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCombo({ ...combo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Combo creado:", combo);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-2">Crear Combo</h2>

      <label className="block mb-2">
        Nombre del Combo:
        <input
          type="text"
          name="nombre"
          value={combo.nombre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Ej. Combo Chapín"
        />
      </label>

      <label className="block mb-2">
        Tamal:
        <select
          name="tamal"
          value={combo.tamal}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Seleccione</option>
          {tamalesDisponibles.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        Bebida:
        <select
          name="bebida"
          value={combo.bebida}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Seleccione</option>
          {bebidasDisponibles.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        Precio:
        <input
          type="text"
          name="precio"
          value={combo.precio}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Q25.00"
        />
      </label>

      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
      >
        Guardar Combo
      </button>
    </form>
  );
};

export default ComboForm;
