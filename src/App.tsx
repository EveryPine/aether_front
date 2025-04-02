import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "./components/Sidebar";
import TaskKanban from "./pages/TaskKanban";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthRedirect from "./pages/AuthRedirect";
import Dashboard from "./pages/Dashboard";
const queryClient = new QueryClient();

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("업무");

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/user-info" element={<SignUp />} />
          <Route path="/sign-up" element={<AuthRedirect />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route
            path="/tasks"
            element={
              <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
                <Sidebar setActiveTab={setActiveTab} />
                <div style={{ flex: 1, overflowY: "auto" }}>
                  <TaskKanban activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
              </div>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
