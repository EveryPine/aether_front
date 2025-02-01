import React from "react";
import Breadcrumb from "../components/BreadCrumb";
import Navbar from "../components/Navbar";
import TaskCard from "../components/KanbanBoard/TaskCard";
import TaskMenu from "../components/KanbanBoard/TaskMenu";
const TaskKanban: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Breadcrumb */}
      <div>
        <Breadcrumb />
      </div>

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
        }}
      >
        {/* Navbar */}
        <div style={{ marginLeft: "23px", marginTop: "10px" }}>
          <Navbar />
        </div>

        <div>
            <TaskMenu/>
        </div>

        {/* 업무 카드 레이아웃 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            padding: "20px",
          }}
        >
          <TaskCard title="ABC 업무" description="Body Text" />
          <TaskCard title="Title" description="Body Text" />
          <TaskCard title="Title" description="Body Text" />
          <TaskCard title="Title" description="Body Text" />
        </div>
      </div>
    </div>
  );
};

export default TaskKanban;
