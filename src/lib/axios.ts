import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Change this to your API base URL
  // You can add headers or interceptors here
});

export default api;
