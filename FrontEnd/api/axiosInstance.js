// src/api/axiosInstance.js
import axios from "axios";

// Axios instansiyası
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Request interceptor – hər request göndəriləndə token əlavə et
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

// ✅ Response interceptor – 401 olduqda refresh token ilə yenilə
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ Response alındı:", response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");

    // Access token expired and refresh token is available
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;
      console.warn("⏳ Access Token vaxtı bitdi. Refresh ediləcək...");

      try {
        const role = localStorage.getItem("role"); // 'doctor' və ya 'patient'

        // Hər rola uyğun refresh endpoint
        const refreshEndpoint =
          role === "doctor" ? "/doctors/refresh" : "/patients/refresh";

        console.log("🔄 Refresh token ilə yeni access token alınır...");
        const res = await axios.post(
          `http://localhost:5000/api${refreshEndpoint}`,
          { refreshToken }
        );

        const newAccessToken = res.data.accessToken;
        console.log("✅ Yeni access token alındı:", newAccessToken);

        // Yeni access tokeni yaddaşa yaz
        localStorage.setItem("accessToken", newAccessToken);

        // Yeni tokeni request-ə əlavə et və yenidən göndər
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token xətası:", refreshError);

        // Tokenlər silinir və login səhifəsinə yönləndirilir
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("doctorId");
        localStorage.removeItem("patientId");
        localStorage.removeItem("role");

        console.warn("🔓 Yenidən giriş tələb olunur.");
        window.location.href = "/login";
      }
    }

    // Əgər başqa səbəbdən xətadırsa
    console.error("❌ Response interceptor xətası:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
