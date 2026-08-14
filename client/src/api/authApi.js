import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const loginAdmin = async (loginData) => {
  const response = await API.post("/login", loginData);
  return response.data;
};