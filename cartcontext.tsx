// src/context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Tamal, Bebida, Combo } from "../types/models";

interface CartItem {
  tipo: "tamal" | "bebida" | "combo";
  item: Tamal | Bebida | Combo;
  cantidad: number;
}

interface CartContextType {
  items: CartItem[];
  agregarItem: (tipo: CartItem["tipo"], item: Tamal | Bebida | Combo, cantidad?: number) => void;
  eliminarItem: (tipo: CartItem["tipo"], id?: number) => void;
  actualizarCantidad: (tipo: CartItem["tipo"], id?: number, cantidad?: number) => void;
  limpiarCarrito: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const agregarItem = (tipo: CartItem["tipo"], item: Tamal | Bebida | Combo, cantidad: number = 1) => {
    setItems((prev) => {
      // Revisar si ya existe un item igual para sumar cantidad
      const index = prev.findIndex(
        (i) =>
          i.tipo === tipo &&
          i.item.id === item.id
      );
      if (index !== -1) {
        const nuevos = [...prev];
        nuevos[index].cantidad += cantidad;
        return nuevos;
      }
      return [...prev, { tipo, item, cantidad }];
    });
  };

  const eliminarItem = (tipo: CartItem["tipo"], id?: number) => {
    if (id === undefined) return;
    setItems((prev) => prev.filter((i) => !(i.tipo === tipo && i.item.id === id)));
  };

  const actualizarCantidad = (tipo: CartItem["tipo"], id?: number, cantidad: number = 1) => {
    if (id === undefined) return;
    setItems((prev) =>
      prev.map((i) =>
        i.tipo === tipo && i.item.id === id ? { ...i, cantidad: cantidad } : i
      )
    );
  };

  const limpiarCarrito = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0);

  return (
    <CartContext.Provider
      value={{ items, agregarItem, eliminarItem, actualizarCantidad, limpiarCarrito, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
