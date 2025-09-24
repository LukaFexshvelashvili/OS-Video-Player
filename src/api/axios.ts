// lib/axios.ts
import axios from "axios";
// baseURL: "http://mymoviesbeta.moviesgo.ge/server/v1",

export const api = axios.create({
  // baseURL: "http://localhost/mymovies_next_server/v1",

  baseURL: "https://api.croconet.cam/embed",
  timeout: 10000,
});
