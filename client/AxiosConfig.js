import axios from "axios";

export const Instance = axios.create({
  baseURL: "http://localhost:5000",
    withCredentials: true,
});