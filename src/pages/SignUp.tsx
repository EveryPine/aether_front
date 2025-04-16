import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/Login-Logo.svg";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    position: "",
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "";
    setForm((prevForm) => ({ ...prevForm, name: storedUsername }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (form.name && form.employeeId && form.position) {
      setTimeout(() => navigate("/dashboard"), 1000);
    }
  }, [form, navigate]);

  return (
    <div
      className="relative w-full h-screen bg-white flex items-center justify-start"
      style={{ overflow: "hidden" }}
    >
      {/* 배경 이미지 */}
      <img
        src={BackgroundImage}
        alt="Background Graphic"
        className="absolute right-0 bottom-0 h-full object-cover pointer-events-none select-none"
      />

      <div className="ml-24 z-10 max-w-md w-full">
        <h1 className="text-3xl font-extrabold mb-2">당신에 대해 알려주세요!</h1>
        <p className="text-gray-500 mb-[2.5rem] text-sm">회원 정보를 입력해주세요.</p>

        <div className="flex flex-col gap-6">
          {/* 이름 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-gray-600 font-medium">
              이름
            </label>
            <input
              id="name"
              name="name"
              placeholder="이름(실명)을 입력해주세요."
              value={form.name}
              onChange={handleChange}
              style={{
                boxShadow: "0px 0px 8px 0px #1A1A231F inset",
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          {/* 사원 번호 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="employeeId" className="text-sm text-gray-600 font-medium">
              사원 번호
            </label>
            <input
              id="employeeId"
              name="employeeId"
              placeholder="사원번호(N자리)를 입력해 주세요."
              value={form.employeeId}
              onChange={handleChange}
              style={{
                boxShadow: "0px 0px 8px 0px #1A1A231F inset",
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          {/* 직급 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="position" className="text-sm text-gray-600 font-medium">
              직급
            </label>
            <input
              id="position"
              name="position"
              placeholder="직급을 입력해 주세요."
              value={form.position}
              onChange={handleChange}
              style={{
                boxShadow: "0px 0px 8px 0px #1A1A231F inset",
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
