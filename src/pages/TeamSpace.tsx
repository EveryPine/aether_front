import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/BreadCrumb";
import Navbar from "../components/Navbar";
import TaskCard from "../components/KanbanBoard/TaskCard";
import TaskMenu from "../components/KanbanBoard/TaskMenu";
import TaskSetting from "../components/TaskSetting";
import ProjectAdd from ".././components/ProjectAdd"
import { useTask } from "../hooks/useTask";
import axiosInstance from "../api/lib/axios";

const TeamSpace: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [isTaskSettingOpen, setIsTaskSettingOpen] = useState(false);
  const [isTaskAddOpen, setIsTaskAddOpen] = useState(false);
  const [isProjectAddOpen, setIsProjectAddOpen] = useState(false);

  const handleProjectAddClick = () => {
    setIsProjectAddOpen(!isProjectAddOpen);
    setIsTaskSettingOpen(false);
    setIsTaskAddOpen(false); // 혹시 다른 모달 열려있을 경우 닫기
  };

  const [tasks, setTasks] = useState<{ [key: string]: any[] }>({
    "To Do": [],
    "In Progress": [],
    "Done": [],
    "Issue": [],
  });

  const projectId = "679aedec4f051a6eaac0204c"; // 하드코딩
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
      setIsTaskAddOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div>
        <Breadcrumb label="ABC 회사 > ABCD 팀" />
      </div>

      <div className="flex w-full h-full rounded-tl-lg bg-[#F8F9FC] shadow-[inset_0_0_8px_rgba(26,26,35,0.12)] overflow-x-hidden transition-all">
        <div
          className="flex flex-col min-w-[320px]"
          style={{
            width: isTaskSettingOpen || isTaskAddOpen ? "calc(100% - 340px)" : "100%",
            transition: "width 0.3s ease",
          }}
        >
          <div className="ml-[23px] mt-[10px]">
            <Navbar activeTab="업무" setActiveTab={() => {}} />
          </div>

          <div>
          <TaskMenu
            isTaskAddOpen={isProjectAddOpen}
            setIsTaskAddOpen={handleProjectAddClick}
            addLabel="프로젝트 생성"
            />
          </div>

          <div className="flex gap-8 p-10 overflow-x-auto whitespace-nowrap">
            {Object.entries(tasks).map(([status, taskList]) => (
              <div key={status} className="flex flex-col gap-4">
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
        </div>

        {(isTaskSettingOpen || isProjectAddOpen) && (
            <div className="min-w-[320px] h-full w-[640px] transition-transform duration-300 z-10">
                {isProjectAddOpen ? <ProjectAdd /> : <TaskSetting selectedTaskId={selectedTask} />}
            </div>
        )}
      </div>
    </div>
  );
};

export default TeamSpace;
