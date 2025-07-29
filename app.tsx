// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import Sucursales from "./pages/Sucursales";
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/Dashboard";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/sucursales" element={<Sucursales />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
