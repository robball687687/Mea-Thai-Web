// src/api/apiClient.js

import axios from "axios";

/**
 * Single source of truth for API base URL
 * (you can swap this per env later)
 */
export const API_ROOT =
  "https://rmrthemeaonlineorderingwebapi.azurewebsites.net/api";

/**
 * Shared axios instance
 */
export const api = axios.create({
  baseURL: API_ROOT,
  withCredentials: false,
});

/**
 * Handles .NET $values collections cleanly
 */
export const unwrap = (data) => {
  if (!data) return data;
  if (Array.isArray(data.$values)) return data.$values;
  return data;
};

/**
 * Global error logging
 */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err?.response || err);
    return Promise.reject(err);
  }
);