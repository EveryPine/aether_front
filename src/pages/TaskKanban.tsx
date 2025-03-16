import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/BreadCrumb";
import Navbar from "../components/Navbar";
import TaskCard from "../components/KanbanBoard/TaskCard";
import TaskMenu from "../components/KanbanBoard/TaskMenu";
import TaskSetting from "../components/TaskSetting";
import TaskInfo from "../components/TaskInfo/TaskInfo";
import TaskAdd from "../components/TaskAdd";
import TaskTitle from "../components/TaskTitle";
import TaskDivider from "../components/TaskDivider";
import { useTask } from "../hooks/useTask";
import { FormProvider } from "react-hook-form";
import {axiosInstance} from "../api/lib/axios";

interface TaskKanbanProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TaskKanban: React.FC<TaskKanbanProps> = ({ activeTab, setActiveTab }) => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [isTaskSettingOpen, setIsTaskSettingOpen] = useState(false);
  const [isTaskAddOpen, setIsTaskAddOpen] = useState(false);
  const [tasks, setTasks] = useState<{ [key: string]: any[] }>({
    "To Do": [],
    "In Progress": [],
    "Done": [],
    "Issue": [],
  });

  const projectId = "679aedec4f051a6eaac0204c"; // 현재 프로젝트 ID (하드코딩)

  const methods = useTask(null, true);

  // 업무 데이터 가져오기
  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get(`/api/tasks/${projectId}`);
      if (response.data.success) {
        setTasks({
          "To Do": response.data.data["To Do"] || [],
          "In Progress": response.data.data["In Progress"] || [],
          "Done": response.data.data["Done"] || [],
          "Issue": response.data.data["Issue"] || [],
          "Hold": response.data.data["Hold"] || [], 
        });
      }
    } catch (error) {
      console.error("업무 조회 실패", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
    setIsTaskAddOpen(!isTaskAddOpen);
    setIsTaskSettingOpen(false);
    setSelectedTask(null);
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
        {/* TaskSetting가 열리면 컨테이너 너비 줄이기 */}
        <div
          className="flex flex-col min-w-[320px]"
          style={{
            width: isTaskSettingOpen || isTaskAddOpen ? "calc(100% - 640px)" : "100%",
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
                <TaskTitle isEditable={false} title="ABCDE 프로젝트" />
                <TaskDivider />
                <TaskInfo/>
              </FormProvider>
            </div>
          ) : (
            activeTab === "업무" && (
              <>
                <div>
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
                  {Object.entries(tasks).map(([status, taskList]) => (
                    <div key={status} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {taskList.map((task) => (
                        <TaskCard
                          key={task._id}
                          title={task.title}
                          description={task.description}
                          status={task.status}
                          onClick={() => handleTaskClick(task._id)}
                          isSelected={selectedTask === task._id}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </>
            )
          )}
        </div>

        {/* 업무 설정 / 업무 생성 탭 */}
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
            {isTaskSettingOpen ? <TaskSetting selectedTaskId={selectedTask} /> : <TaskAdd fetchTasks={fetchTasks}/>}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskKanban;
