import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import GrayContainer from "./components/GrayContainer";

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* 사이드바 */}
      <Sidebar />
      {/* 메인 화면 */}
      <div className="flex flex-1 flex-col">
        {/* 상단 네비게이션 */}
        <Navbar />
        {/* 회색 화면 컨테이너 */}
        <GrayContainer />
      </div>
    </div>
  );
};

export default App;