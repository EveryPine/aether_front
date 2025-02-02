import React, { useState } from "react";
import Breadcrumb from "../components/BreadCrumb";
import Navbar from "../components/Navbar";
import TaskCard from "../components/KanbanBoard/TaskCard";
import TaskMenu from "../components/KanbanBoard/TaskMenu";

const TaskKanban: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("업무"); // 활성 탭 상태 관리

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
          overflowX: "hidden", // 회색 컨테이너 가로 스크롤 비활성화
        }}
      >
        {/* Navbar */}
        <div style={{ marginLeft: "23px", marginTop: "10px" }}>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* TaskMenu와 TaskCard는 "업무" 탭에서만 표시 */}
        {activeTab === "업무" && (
          <>
            <div>
              <TaskMenu />
            </div>

            {/* 업무 카드 레이아웃 */}
            <div
              style={{
                display: "flex",
                gap: "32px",
                padding: "20px",
                overflowX: "auto", // 업무 카드만 가로 스크롤 가능
                whiteSpace: "nowrap", // 줄바꿈 방지로 가로 스크롤 활성화
              }}
            >
              <TaskCard
                title="대기"
                bodyText="박대리 인수인계 리스트업"
                borderColor="#FFA85C"
              />
              <TaskCard
                title="진행"
                bodyText="현대건설 외주"
                borderColor="#5CA8FF"
              />
              <TaskCard
                title="완료"
                bodyText="업무 브리핑"
                borderColor="#5EC98B"
              />
              <TaskCard
                title="이슈"
                bodyText="신규 사원 모집"
                borderColor="#FF615C"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskKanban;
