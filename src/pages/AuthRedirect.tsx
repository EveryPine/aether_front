import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 쿠키에서 특정 값을 가져오는 함수
const getCookie = (name: string): string | null => {
  const matches = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return matches ? decodeURIComponent(matches[2]) : null;
};

const AuthRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("✅ AuthRedirect.tsx 실행됨");
    
    // 쿠키에서 필요한 값 가져오기
    const accessToken = getCookie("accessToken");
    const userId = getCookie("id");
    const username = getCookie("username");
    const email = getCookie("email");

    console.log("🔍 쿠키에서 읽은 데이터:", { accessToken, userId, username, email });

    if (accessToken && userId && username && email) {
      console.log("✅ 로그인 성공! 로컬 스토리지 저장 후 SignUp 페이지로 이동");

      // 로컬 스토리지에 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);

      navigate("/user-info"); // ✅ 사용자 추가 정보 입력 페이지로 이동
    } else {
      console.error("❌ 로그인 정보가 없습니다. 다시 로그인 필요.");
      navigate("/login");
    }
  }, [navigate]);

  return <div>로그인 중입니다. 잠시만 기다려주세요...</div>;
};

export default AuthRedirect;
