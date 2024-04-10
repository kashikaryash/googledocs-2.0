
window.global ||= window;
import axios from "axios";
export const BASE_URL = "http://localhost:8080/";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': 'http://localhost:5173'
  },
});

export default API;