import React from "react";
import Sidebar from "./components/Sidebar";
import Main from "./pages/TaskKanban";

const App: React.FC = () => {
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
        <Sidebar />
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div
        style={{
          flex: 1,
          overflowY: "auto", // 스크롤 가능
        }}
      >
        <Main />
      </div>
    </div>
  );
};

export default App;
