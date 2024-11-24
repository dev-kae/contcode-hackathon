import axios from "axios";

// Configuração global do Axios
const api = axios.create({
  baseURL: process.env.backend, // Substitua pela URL do seu backend
});

// Interceptor para adicionar o token ao cabeçalho
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Obtém o token do localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho
  }
  return config;
});

export default api;
