// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
});

// ✅ Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    console.log("🔄 Yeni request göndərilir:", config.url);
    if (accessToken) {
      console.log("🔐 Access Token əlavə olunur:", accessToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.log("⚠️ Access Token tapılmadı.");
    }

    return config;
  },
  (error) => {
    console.error("❌ Request interceptor xətası:", error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ Response alındı:", response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      console.warn("⏳ Access Token expired. Refresh ediləcək...");
      originalRequest._retry = true;

      try {
        console.log("🔄 Refresh token ilə yeni access token alınır...");
        const res = await axios.post("http://localhost:5000/api/refresh", {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        console.log("✅ Yeni access token alındı:", newAccessToken);

        localStorage.setItem("accessToken", newAccessToken);

        // Yeni tokeni request-ə əlavə et
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        console.log("🔁 Retry olunan request:", originalRequest.url);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token xətası:", refreshError);

        // Tokenlər silinsin və login səhifəsinə yönləndirilsin
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        console.warn("🔓 Refresh uğursuz. Yenidən login tələb olunur.");
        window.location.href = "/login";
      }
    }

    console.error("❌ Response interceptor xətası:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
