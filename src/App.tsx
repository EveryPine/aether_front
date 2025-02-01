import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import GrayContainer from "./components/GrayContainer";

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* 사이드바 */}
      <Sidebar />
    </div>
  );
};

export default App;