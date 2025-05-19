import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/BreadCrumb";
import TaskMenu from "../components/KanbanBoard/TaskMenu";
import TaskCard from "../components/KanbanBoard/TaskCard";
import ProjectAdd from "../components/ProjectAdd";
import useProject from "../hooks/useProject";

const TeamSpace: React.FC = () => {
  const [activeTab, setActiveTab] = useState("프로젝트");
  const [isProjectAddOpen, setIsProjectAddOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isTaskSettingOpen, setIsTaskSettingOpen] = useState(false);

  const teamId = "67fce39dddf4eb5d55ecb3d0";
  
  const { projects } = useProject(teamId, false);

  const projectState = {
    "To Do": projects.filter((project) => project.status === "To Do"),
    "In Progress": projects.filter((project) => project.status === "In Progress"),
    "Done": projects.filter((project) => project.status === "Done"),
    "Issue": projects.filter((project) => project.status === "Issue"),
    "Hold": projects.filter((project) => project.status === "Hold"),
  };

  const handleProjectClick = (projectId: string) => {
    if (selectedProject === projectId) {
      setSelectedProject(null);
      setIsTaskSettingOpen(false);
    } else {
      setSelectedProject(projectId);
      setIsTaskSettingOpen(true);
      setIsProjectAddOpen(false);
    }
  };

  const handleProjectAddClick = () => {
    setIsProjectAddOpen(!isProjectAddOpen);
    setIsTaskSettingOpen(false);
    setSelectedProject(null);
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
                <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
                    {Object.entries(projectState).map(([status, projectList]) => (
                    <div key={status} className="flex flex-col gap-4">
                        {projectList.map((project, index) => (
                        <TaskCard
                            key={project._id}
                            title={project.name}
                            description={project.description ?? ""}
                            status={project.status}
                            onClick={() => handleProjectClick(project._id)}
                            isSelected={selectedProject === project._id}
                            className={index === projectList.length - 1 ? "mb-10" : ""}
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
