import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL + "api/";
axios.defaults.baseURL = BASE_URL;

// Attach Authorization header to every request
axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration (401 responses)
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      let path = window.location.pathname;
      const refreshToken = sessionStorage.getItem("refreshToken");
      if (!refreshToken) {
        path = window.location.pathname;
        if (path !== "/login" && path !== "/" && path !== "") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${BASE_URL}auth/refresh`, { refreshToken });
        const { accessToken } = res.data;

        // Save new access token
        sessionStorage.setItem("authToken", accessToken);

        // Update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired or invalid:", refreshError);
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("refreshToken");
        if (path !== "/login" && path !== "/" && path !== "") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
