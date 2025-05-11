import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/BreadCrumb";
import TaskMenu from "../components/KanbanBoard/TaskMenu";
import TaskCard from "../components/KanbanBoard/TaskCard";
import TaskSetting from "../components/TaskSetting";
import ProjectAdd from "../components/ProjectAdd";
import { useTask } from "../hooks/useTask";
import axiosInstance from "../api/lib/axios";

const TeamSpace: React.FC = () => {
  const [activeTab, setActiveTab] = useState("프로젝트");
  const [isProjectAddOpen, setIsProjectAddOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [isTaskSettingOpen, setIsTaskSettingOpen] = useState(false);

  const [tasks, setTasks] = useState<{ [key: string]: any[] }>({
    "To Do": [],
    "In Progress": [],
    "Done": [],
    "Issue": [],
  });

  const projectId = "679aedec4f051a6eaac0204c";
  const methods = useTask(null, true);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get(`/api/tasks/${projectId}`);
      if (response.data.success) {
        setTasks({
          "To Do": response.data.data["To Do"] || [],
          "In Progress": response.data.data["In Progress"] || [],
          "Done": response.data.data["Done"] || [],
          "Issue": response.data.data["Issue"] || [],
        });
      }
    } catch (error) {
      console.error("팀 업무 조회 실패", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskClick = (taskId: string) => {
    if (selectedTask === taskId) {
      setSelectedTask(null);
      setIsTaskSettingOpen(false);
    } else {
      setSelectedTask(taskId);
      setIsTaskSettingOpen(true);
      setIsProjectAddOpen(false);
    }
  };

  const handleProjectAddClick = () => {
    setIsProjectAddOpen(!isProjectAddOpen);
    setIsTaskSettingOpen(false);
    setSelectedTask(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div>
        <Breadcrumb
            paths={[
                { label: "ABC 회사" },
                { label: "ABCD 팀" },
            ]}
        />
      </div>
        <div
            style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            borderRadius: "8px 0 0 0",
            background: "#F8F9FC",
            boxShadow: "0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset",
            overflowX: "hidden",
            transition: "width 0.3s ease",
            }}
        >
            <div className="ml-[40px] mt-[10px]">
            {/* ✅ NavBar의 탭은 '프로젝트' 하나만 존재 */}
            <Navbar tabs={isProjectAddOpen ? ["프로젝트 생성"] : ["프로젝트"]} activeTab={isProjectAddOpen ? "프로젝트 생성" : "프로젝트"} setActiveTab={() => {}} />
            </div>
            <div>
                <TaskMenu
                    isTaskAddOpen={isProjectAddOpen}
                    setIsTaskAddOpen={handleProjectAddClick}
                    addLabel="프로젝트 생성"
                />
            </div>
            <div className="flex flex-col w-full px-10 py-8">
                {/* ✅ 프로젝트 생성 버튼 눌렀을 때 화면 전환 */}
                {isProjectAddOpen ? (
                <ProjectAdd />
                ) : (
                <div className="flex gap-8 overflow-x-auto whitespace-nowrap">
                    {Object.entries(tasks).map(([status, taskList]) => (
                    <div key={status} className="flex flex-col gap-4">
                        {taskList.map((task, index) => (
                        <TaskCard
                            key={task._id}
                            title={task.title}
                            description={task.description}
                            status={task.status}
                            onClick={() => handleTaskClick(task._id)}
                            isSelected={selectedTask === task._id}
                            className={index === taskList.length - 1 ? "mb-10" : ""}
                        />
                        ))}
                    </div>
                    ))}
                </div>
                )}
            </div>
            </div>
        </div>
  );
};

export default TeamSpace;
