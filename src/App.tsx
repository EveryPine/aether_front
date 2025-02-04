//App.tsx
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./pages/TaskKanban";
import './App.css'
import TaskSetting from './pages/TaskSetting'
import TaskComment from './pages/TaskComment'

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("업무"); // 전역 상태
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden", // 메인 컨텐츠 스크롤만 활성화
      }}
    >
      {/* 사이드바 */}
      <div
        style={{
          position: "sticky", // 사이드바 고정
          top: 0,
          left: 0,
          height: "100vh",
          flexShrink: 0,
        }}
      >
        <Sidebar setActiveTab={setActiveTab}/>
      </div>
      
      {/* 업무 세팅 탭 */}
      {/* <TaskSettingPage /> */}

      {/* 메인 컨텐츠 영역 */}
      <div
        style={{
          flex: 1,
          overflowY: "auto", // 스크롤 가능
        }}
      >
        <Main activeTab={activeTab} setActiveTab={setActiveTab}/>
      </div>
    </div>
  );
};

export default App;