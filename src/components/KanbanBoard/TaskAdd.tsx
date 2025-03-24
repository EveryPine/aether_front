//TaskAdd.tsx
import React from "react";
// import Navbar from "../Navbar";

const TaskAdd: React.FC = () => {
  return (
    <div
      style={{
        width: "360px",
        height: "100%",
        padding: "20px",
        borderLeft: "1px solid #E5EAF2",
        display: "flex",
        flexDirection: "column",
        zIndex: 10,
      }}
    >
        {/* 회색 사각형 컨테이너 */}
        <div
            style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            borderRadius: "8px 0 0 0",
            background: "#F8F9FC",
            boxShadow: "0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset",
            overflowX: "hidden", // 회색 컨테이너 가로 스크롤 비활성화
            }}
        >
        {/* Navbar */}
        <div style={{ marginLeft: "23px", marginTop: "10px" }}>
          {/* <Navbar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
          업무생성
        </div>
      </div>
    </div>
  );
};

export default TaskAdd;
