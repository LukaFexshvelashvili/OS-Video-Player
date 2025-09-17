// lib/axios.ts
import axios from "axios";
// baseURL: "http://mymoviesbeta.moviesgo.ge/server/v1",

export const api = axios.create({
  baseURL: "http://localhost/mymovies_next_server/v1",
  // baseURL: "http://localhost/croconet_server/v1",
  // baseURL: "http://mymoviesbeta.moviesgo.ge/server/v1",

  // baseURL: "http://api.mymovies.cc/v1",
  // baseURL: "https://api.croconet.cam/v1",
  // baseURL: "https://api.croconet.cam/embed",
  // baseURL: "https://api.croconet.cam/v2",
  timeout: 10000,
});
