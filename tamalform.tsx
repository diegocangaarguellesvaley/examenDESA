// src/components/TamalForm.tsx
import React, { useState } from "react";

interface Tamal {
  masa: string;
  relleno: string;
  acompañamiento: string;
  hoja: string;
  tamaño: string;
}

const masas = ["Blanca", "Roja", "Verde"];
const rellenos = ["Pollo", "Cerdo", "Frijol", "Vegetales"];
const acompañamientos = ["Salsa", "Pan francés", "Chirmol"];
const hojas = ["Banano", "Mashán"];
const tamaños = ["Pequeño", "Mediano", "Grande"];

const TamalForm: React.FC = () => {
  const [tamal, setTamal] = useState<Tamal>({
    masa: "",
    relleno: "",
    acompañamiento: "",
    hoja: "",
    tamaño: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTamal({ ...tamal, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tamal creado:", tamal);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Crear Tamal</h2>

      <label className="block mb-2">
        Masa:
        <select
          name="masa"
          value={tamal.masa}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Seleccione</option>
          {masas.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        Relleno:
        <select
          name="relleno"
          value={tamal.relleno}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Seleccione</option>
          {rellenos.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        Acompañamiento:
        <select
          name="acompañamiento"
          value={tamal.acompañamiento}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Seleccione</option>
          {acompañamientos.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        Hoja:
        <select
          name="hoja"
          value={tamal.hoja}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Seleccione</option>
          {hojas.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        Tamaño:
        <select
          name="tamaño"
          value={tamal.tamaño}
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
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Guardar Tamal
      </button>
    </form>
  );
};

export default TamalForm;

