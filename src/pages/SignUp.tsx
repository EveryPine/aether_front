import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      setTimeout(() => navigate("/tasks"), 1000);
    }
  }, [form, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">당신에 대해 알려주세요!</h1>
      <input name="name" placeholder="이름(실명)" value={form.name} onChange={handleChange} />
      <input name="employeeId" placeholder="사원번호" onChange={handleChange} />
      <input name="position" placeholder="직급" onChange={handleChange} />
    </div>
  );
};

export default SignUp;
