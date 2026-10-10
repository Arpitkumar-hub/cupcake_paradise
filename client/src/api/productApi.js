
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, "")}/products`
    : "http://localhost:5000/api/products",
});

// Get all products
export const getProducts = async () => {
  const response = await API.get("/");
  return response.data;
};

// Get single product
export const getProductById = async (id) => {
  const response = await API.get(`/${id}`);
  return response.data;
};

// Create product
export const createProduct = async (productData) => {
  const response = await API.post("/", productData);
  return response.data;
};

// Update product
export const updateProduct = async (id, productData) => {
  const response = await API.put(`/${id}`, productData);
  return response.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};
