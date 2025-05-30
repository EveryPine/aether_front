import React from 'react';
import BackgroundImage from "../assets/Login-Logo.svg";
import GoogleLogo from "../assets/G-logo.svg";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "https://aether.asia/oauth2/authorization/google";
  };

  return (
    <div
      className="relative w-full h-screen bg-white flex items-center justify-start"
      style={{ overflow: "hidden" }}
    >
      {/* 배경 SVG 이미지 */}
      <img
        src={BackgroundImage}
        alt="Background Graphic"
        className="absolute right-0 bottom-0 h-full object-cover pointer-events-none select-none"
      />

      <div className="ml-24 z-10">
        <h1 className="text-3xl font-extrabold mb-4">반가워요!</h1>
        <p className="text-gray-500 mb-6">계속 하려면 Google 계정으로 로그인 해주세요.</p>

        <button
          onClick={handleLogin}
          className="flex items-center px-6 py-3 bg-white border rounded-lg shadow-md hover:shadow-lg transition"
        >
          <img src={GoogleLogo} alt="Google Logo" className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Google 계정으로 로그인</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
