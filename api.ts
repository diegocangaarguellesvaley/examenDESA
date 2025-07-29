// src/api/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// TAMAL
export const createTamal = (data: any) => api.post("/tamales", data);
export const getTamales = () => api.get("/tamales");

// BEBIDA
export const createBebida = (data: any) => api.post("/bebidas", data);
export const getBebidas = () => api.get("/bebidas");

// COMBO
export const createCombo = (data: any) => api.post("/combos", data);
export const getCombos = () => api.get("/combos");

// INVENTARIO
export const createIngrediente = (data: any) => api.post("/inventario", data);
export const getInventario = () => api.get("/inventario");

export default api;
