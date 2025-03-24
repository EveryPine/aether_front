import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("✅ AuthRedirect.tsx 실행됨");

    const urlParams = new URLSearchParams(window.location.search);
    // const accessToken = urlParams.get("accessToken");
    // const userId = urlParams.get("id");
    // const username = urlParams.get("username");
    // const email = urlParams.get("email");
    // 완전히 안전하게 처리하기 위해 로컬 스토리지에 이미 존재한다면 그걸 불러오도록
    const accessToken = urlParams.get("accessToken") ?? localStorage.getItem("accessToken");
    const userId = urlParams.get("id") ?? localStorage.getItem("userId");
    const username = urlParams.get("username") ?? localStorage.getItem("username");
    const email = urlParams.get("email") ?? localStorage.getItem("email");

    console.log("🔍 파싱된 쿼리스트링:", { accessToken, userId, username, email });

    if (accessToken && userId && username && email) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);

      navigate("/user-info");
    } else {
      console.error("❌ 로그인 정보가 누락됨");
      navigate("/login");
    }
  }, [navigate]);

  return <div>로그인 중입니다. 잠시만 기다려주세요...</div>;
};

export default AuthRedirect;
