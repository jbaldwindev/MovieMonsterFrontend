import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL + "api/";
axios.defaults.baseURL = BASE_URL;

// Attach Authorization header to every request
axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(config.headers.Authorization);
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

      const refreshToken = sessionStorage.getItem("refreshToken");
      if (!refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${BASE_URL}auth/refresh`, { refreshToken });
        const { accessToken } = res.data;

        // Save new access token
        sessionStorage.setItem("authToken", `Bearer ${accessToken}`);

        // Update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired or invalid:", refreshError);
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
