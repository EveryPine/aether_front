import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/lib/axios"; // axios 인스턴스 사용

// 수정
const AuthRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("✅ AuthRedirect.tsx 실행됨"); // 실행 여부 확인

    const fetchAuthData = async () => {
      try {
        console.log("🔄 /auth/success 데이터 요청 시작");

        const response = await axios.get("https://aether.asia/auth/success", { withCredentials: true });

        console.log("📥 응답 수신:", response);

        if (response.status === 200) {
          const { accessToken, email, username } = response.data.result;

          if (accessToken && email && username) {
            console.log("✅ 로그인 성공! 로컬 스토리지 저장 후 /sign-up으로 이동");

            // 액세스 토큰과 유저 정보 저장
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("email", email);
            localStorage.setItem("username", username);

            // 즉시 /sign-up으로 이동
            window.location.href = "/sign-up";
          } else {
            console.error("⚠️ 필수 데이터 없음. 로그인 실패", response.data);
            window.location.href = "/login"; // 실패 시 로그인 페이지로 이동
          }
        }
      } catch (error) {
        console.error("❌ 인증 데이터 가져오기 실패:", error);
        window.location.href = "/login";
      }
    };

    fetchAuthData();
  }, [navigate]);

  return <div>로그인 중입니다. 잠시만 기다려주세요...</div>;
};

export default AuthRedirect;
