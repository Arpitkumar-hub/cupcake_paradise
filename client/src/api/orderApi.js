import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/orders",
});

// Get all orders
export const getOrders = async () => {
  const response = await API.get("/");
  return response.data;
};

// Create order
export const createOrder = async (orderData) => {
  const response = await API.post("/", orderData);
  return response.data;
};

// Update order status
export const updateOrderStatus = async (id, status) => {
  const response = await API.put(`/${id}/status`, {
    status,
  });

  return response.data;
};