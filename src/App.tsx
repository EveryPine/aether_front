import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "./components/Sidebar";
import TaskKanban from "./pages/TaskKanban";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthRedirect from "./pages/AuthRedirect";
import Dashboard from "./pages/Dashboard";
import TeamSpace from "./pages/TeamSpace"
import Alarm from "./components/Alarm";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("업무");
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  const handleAlarmClick = () => {
    setIsAlarmOpen(prev => !prev);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/user-info" element={<SignUp />} />
          <Route path="/sign-up" element={<AuthRedirect />} />
          {[
            "/dashboard",
            "/teamspace",
            "/tasks"
          ].map((path) => (
            <Route
              key={path}
              path={path}
              element={
                <div style={{ display: "flex", height: "100vh", overflow: "hidden", position: "relative" }}>
                  <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onAlarmClick={handleAlarmClick} />
                  <div style={{ flex: 1, overflowY: "auto" }}>
                    {path === "/dashboard" && <Dashboard />}
                    {path === "/teamspace" && <TeamSpace />}
                    {path === "/tasks" && <TaskKanban activeTab={activeTab} setActiveTab={setActiveTab} />}
                  </div>
                  <div
                    className="absolute top-0 right-0 h-full w-[640px] bg-[#F8F9FC] z-50 transition-transform duration-300 ease-in-out"
                    style={{
                      transform: isAlarmOpen ? "translateX(0)" : "translateX(100%)",
                    }}
                  >
                    <Alarm />
                  </div>
                </div>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
