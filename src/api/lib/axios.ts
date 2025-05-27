import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const reissuePath = import.meta.env.VITE_API_REISSUE_PATH;

// Axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, //쿠키 인증 활성화
});

// 요청 인터셉터: 요청 시 자동으로 쿠키 포함
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 토큰 만료 시 자동 재발급
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshResponse = await axios.get(`${baseURL}${reissuePath}`, {
          withCredentials: true, // ✅ 쿠키 인증 포함
        });

        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.result.accessToken;
          localStorage.setItem("accessToken", newAccessToken);
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config); // 실패했던 요청 재시도
        }
      } catch (refreshError) {
        console.error("토큰 갱신 실패, 로그인 필요", refreshError);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;