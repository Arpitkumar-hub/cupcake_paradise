import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getProducts = () => API.get("/products");

export const getProduct = (id) => API.get(`/products/${id}`);

export const createOrder = (orderData) =>
  API.post("/orders", orderData);

export default API;