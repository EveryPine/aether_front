import React, { useState } from "react";
import Breadcrumb from "../components/BreadCrumb";
import Navbar from "../components/Navbar";
import TaskCard from "../components/KanbanBoard/TaskCard";
import TaskMenu from "../components/KanbanBoard/TaskMenu";
import TaskSetting from "./TaskSetting";
import TaskInfo from "../components/TaskInfo/TaskInfo";
import TaskAdd from "./TaskAdd";
import TaskTitle from "../components/TaskTitle";
import TaskDivider from "../components/TaskDivider";
import {useTask} from "../hooks/useTask"
import { FormProvider } from "react-hook-form";

interface TaskKanbanProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TaskKanban: React.FC<TaskKanbanProps> = ({ activeTab, setActiveTab }) => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [isTaskSettingOpen, setIsTaskSettingOpen] = useState(false);
  const [isTaskAddOpen, setIsTaskAddOpen] = useState(false);
  
  const methods = useTask(null, true);

  // 업무 카드 클릭 시 TaskSetting 열기
  const handleTaskClick = (taskId: string) => {
    if (selectedTask === taskId) {
      setSelectedTask(null);
      setIsTaskSettingOpen(false); // 클릭된 업무 카드 다시 클릭 시 닫기
    } else {
      setSelectedTask(taskId);
      setIsTaskSettingOpen(true); // 새로운 업무 카드 클릭 시 열기
      setIsTaskAddOpen(false); // 업무 카드 클릭 시 업무 생성 닫기
    }
  };

  // 업무 생성 클릭 시 TaskAdd 열기
  const handleTaskAddClick = () => {
    if (isTaskAddOpen) {
      setIsTaskAddOpen(false); // 업무 생성 버튼 다시 클릭 시 닫기 
    } else {
      setIsTaskAddOpen(true); 
      setIsTaskSettingOpen(false); // 업무 생성 클릭 시 업무 설정 닫기
      setSelectedTask(null);
    }
    
  }

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
        {/* TaskSetting가 열리면 컨테이너 너비 줄이기 */}
        <div
          className="flex flex-col min-w-[320px]"
          style={{
            width: isTaskSettingOpen || isTaskAddOpen 
              ? "calc(100% - 640px)" 
              : "100%",
            transition: "width 0.3s ease",
          }}
        >
          <div style={{ marginLeft: "23px", marginTop: "10px" }}>
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          {/* "프로젝트 설정" 탭이 활성화되면 TaskInfo 렌더링 */}
          {activeTab === "프로젝트 설정" ? (
            <div>
              <FormProvider {...methods}>
                <TaskTitle isEditable={false} title="ABCDE 프로젝트"/>
                <TaskDivider />
                <TaskInfo />
              </FormProvider>
            </div>
          ) : (
        activeTab === "업무" && (
            <>
              <div>
                {/* TaskMenu에서 setIsTaskSettingOpen을 전달 */}
                <TaskMenu isTaskAddOpen={isTaskAddOpen} setIsTaskAddOpen={handleTaskAddClick} />
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
           )
          )}
        </div>

        {/* 업무 설정 탭 (회색 컨테이너 내에서만 표시) */}
        {(isTaskSettingOpen || isTaskAddOpen) && (
          <div
            className="min-w-[320px] h-full"
            style={{
              width: "640px",
              transition: "transform 0.3s ease",
              transform: isTaskSettingOpen || isTaskAddOpen ? "translateX(0)" : "translateX(100%)",
              zIndex: 10,
            }}
          >
            {isTaskSettingOpen ? <TaskSetting /> : <TaskAdd />}
          </div>
        )}

      </div>
    </div>
  );
};

export default TaskKanban;
