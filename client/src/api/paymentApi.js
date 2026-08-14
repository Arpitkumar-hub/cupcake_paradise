import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/payment",
});

// Create Razorpay order
export const createPaymentOrder = async (amount) => {
  const response = await API.post("/create-order", {
    amount,
  });

  return response.data;
};

// Verify Razorpay payment
export const verifyPayment = async (paymentData) => {
  const response = await API.post("/verify", paymentData);

  return response.data;
};