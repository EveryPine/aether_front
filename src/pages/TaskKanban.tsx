import React, { useState } from "react";
import Breadcrumb from "../components/BreadCrumb";
import Navbar from "../components/Navbar";
import TaskCard from "../components/KanbanBoard/TaskCard";
import TaskMenu from "../components/KanbanBoard/TaskMenu";
import TaskSettingPage from "./TaskSettingPage/TaskSettingPage";

interface TaskKanbanProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TaskKanban: React.FC<TaskKanbanProps> = ({ activeTab, setActiveTab }) => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const handleTaskClick = (taskId: string) => {
    setSelectedTask((prev) => (prev === taskId ? null : taskId));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div>
        <Breadcrumb />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          borderRadius: "8px 0 0 0",
          background: "#F8F9FC",
          boxShadow: "0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset",
          overflowX: "hidden",
          transition: "width 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: selectedTask ? "calc(100% - 640px)" : "100%", // 설정 탭 열릴 때 폭 감소
            transition: "width 0.3s ease",
          }}
        >
          <div style={{ marginLeft: "23px", marginTop: "10px" }}>
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {activeTab === "업무" && (
            <>
              <div>
                <TaskMenu />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "32px",
                  padding: "40px",
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                <TaskCard
                  title="대기"
                  bodyText="박대리 인수인계 리스트업"
                  borderColor="#FFA85C"
                  onClick={() => handleTaskClick("1")}
                  isSelected={selectedTask === "1"}
                />
                <TaskCard
                  title="진행"
                  bodyText="현대건설 외주"
                  borderColor="#5CA8FF"
                  onClick={() => handleTaskClick("2")}
                  isSelected={selectedTask === "2"}
                />
                <TaskCard
                  title="완료"
                  bodyText="업무 브리핑"
                  borderColor="#5EC98B"
                  onClick={() => handleTaskClick("3")}
                  isSelected={selectedTask === "3"}
                />
                <TaskCard
                  title="이슈"
                  bodyText="신규 사원 모집"
                  borderColor="#FF615C"
                  onClick={() => handleTaskClick("4")}
                  isSelected={selectedTask === "4"}
                />
              </div>
            </>
          )}
        </div>

        {/* 업무 설정 탭 (회색 컨테이너 내에서만 표시) */}
        {selectedTask && (
          <div
            style={{
              width: "640px",
              height: "100%",
              transition: "transform 0.3s ease",
              transform: selectedTask ? "translateX(0)" : "translateX(100%)",
              zIndex: 10,
            }}
          >
            <TaskSettingPage />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskKanban;
