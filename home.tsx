// src/pages/Home.tsx
import React from "react";
import TamalForm from "@/components/TamalForm";
import BebidaForm from "@/components/BebidaForm";
import ComboForm from "@/components/ComboForm";
import InventoryForm from "@/components/InventoryForm";
import Dashboard from "@/components/Dashboard";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-green-800">
        La Cazuela Chapina - Panel de Administración
      </h1>

      <Dashboard />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TamalForm />
        <BebidaForm />
        <ComboForm />
        <InventoryForm />
      </section>
    </div>
  );
};

export default Home;
