// src/components/BebidaForm.tsx
import React, { useState } from "react";

interface Bebida {
  tipo: string;
  endulzante: string;
  topping: string[];
  tamaño: string;
}

const tipos = ["Atol de Elote", "Atole Shuco", "Pinol", "Cacao Batido"];
const endulzantes = ["Panela", "Miel", "Sin Azúcar"];
const toppings = ["Malvaviscos", "Canela", "Ralladura de Cacao"];
const tamaños = ["12 oz", "1 litro"];

const BebidaForm: React.FC = () => {
  const [bebida, setBebida] = useState<Bebida>({
    tipo: "",
    endulzante: "",
    topping: [],
    tamaño: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBebida({ ...bebida, [e.target.name]: e.target.value });
  };

  const handleToppingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setBebida((prev) => {
      const newToppings = checked
        ? [...prev.topping, value]
        : prev.topping.filter((t) => t !== value);
      return { ...prev, topping: newToppings };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Bebida creada:", bebida);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Crear Bebida</h2>

      <label className="block mb-2">
        Tipo:
        <select
          name="tipo"
          value={bebida.tipo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Seleccione</option>
          {tipos.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        Endulzante:
        <select
          name="endulzante"
          value={bebida.endulzante}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Seleccione</option>
          {endulzantes.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="mb-2">
        <legend className="font-semibold">Toppings:</legend>
        {toppings.map((t) => (
          <label key={t} className="block">
            <input
              type="checkbox"
              value={t}
              checked={bebida.topping.includes(t)}
              onChange={handleToppingChange}
              className="mr-2"
            />
            {t}
          </label>
        ))}
      </fieldset>

      <label className="block mb-2">
        Tamaño:
        <select
          name="tamaño"
          value={bebida.tamaño}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Seleccione</option>
          {tamaños.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Guardar Bebida
      </button>
    </form>
  );
};

export default BebidaForm;
