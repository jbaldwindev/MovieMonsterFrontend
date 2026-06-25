import axios from "axios";
import { API_BASE_URL } from "../config/api";

const CSRF_COOKIE_NAME = "XSRF-TOKEN";
const CSRF_HEADER_NAME = "X-XSRF-TOKEN";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
});

const csrfApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const getCookie = (name) => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1]) : "";
};

const isUnsafeMethod = (method = "get") => {
  return !["get", "head", "options", "trace"].includes(method.toLowerCase());
};

api.interceptors.request.use(async (config) => {
  if (config._skipCsrfBootstrap || !isUnsafeMethod(config.method)) {
    return config;
  }

  let csrfToken = getCookie(CSRF_COOKIE_NAME);
  if (!csrfToken) {
    await csrfApi.get("/auth/csrf");
    csrfToken = getCookie(CSRF_COOKIE_NAME);
  }

  if (csrfToken) {
    config.headers = config.headers || {};
    config.headers[CSRF_HEADER_NAME] = csrfToken;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isAuthEndpoint =
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/me") ||
      originalRequest.url.includes("/auth/csrf") ||
      originalRequest.url.includes("/auth/refresh") ||
      originalRequest.url.includes("/auth/logout");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");
        return api.request(originalRequest);
      } catch (refreshError) {
        try {
          await api.get("/auth/me", { _skipCsrfBootstrap: true });
          return api.request(originalRequest);
        } catch {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
