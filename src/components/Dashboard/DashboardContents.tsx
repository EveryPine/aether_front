import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MemoCard from "./MemoCard";
import axiosInstance from "../../api/lib/axios";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface Project {
  _id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  dueDate: string;
}

const DashboardContents = () => {
  const navigate = useNavigate();
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchMyTasks = async () => {
      try {
        const response = await axiosInstance.get("/api/tasks/679aedec4f051a6eaac0204c");

        const data = response.data?.data;
        const allTasks = [
          ...(data["To Do"] || []),
          ...(data["In Progress"] || []),
          ...(data["Done"] || []),
          ...(data["Issue"] || []),
          ...(data["Hold"] || []),
        ];

        setMyTasks(allTasks);
      } catch (error) {
        console.error("나의 업무 가져오기 실패", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/api/projects/67fce39dddf4eb5d55ecb3d0");
        setProjects(response.data?.data || []);
      } catch (error) {
        console.error("프로젝트 가져오기 실패", error);
      }
    };

    fetchMyTasks();
    fetchProjects();
  }, []);

  const getStatusBadge = (status: string) => {
    const badgeColor = {
      "To Do": "bg-orange-100 text-orange-600",
      "In Progress": "bg-blue-100 text-blue-600",
      "Done": "bg-green-100 text-green-600",
      "Issue": "bg-red-100 text-red-600",
      "Hold": "bg-gray-200 text-gray-600",
    };
    return (
      <span className={`text-xs font-medium px-2 py-1 rounded-md ${badgeColor[status as keyof typeof badgeColor] || "bg-gray-100 text-gray-600"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="w-full max-w-[1344px] mt-12 px-4 mx-auto flex gap-8">
      {/* 왼쪽 열 (팀 스페이스 + 참여 프로젝트) */}
      <div className="flex flex-col gap-8">
        <div className="h-[168px] min-w-[362px] max-w-[402px] bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">팀 스페이스</h2>
          <div
            className="bg-[#F5F7FA] hover:bg-gray-100 rounded-lg px-6 py-4 cursor-pointer"
            onClick={() => navigate("/teamspace")}
          >
            <p className="text-base font-semibold text-gray-800">Ho감자 팀</p>
            <p className="text-sm text-gray-400">Body Text</p>
          </div>
        </div>

        <div className="h-[522px] min-w-[362px] max-w-[402px] bg-white rounded-xl shadow-md p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">참여 프로젝트</h2>
            <span className="text-sm text-gray-400">우선순위 순 ▾</span>
          </div>
          {projects.length === 0 ? (
            <p className="text-sm text-gray-400">진행 중인 프로젝트가 없습니다.</p>
          ) : (
            projects.map((project) => (
              <div
                key={project._id}
                className="bg-[#F5F7FA] hover:bg-gray-100 rounded-lg px-6 py-4 mb-4 cursor-pointer"
                onClick={() => navigate(`/tasks`)}
              >
                <div className="flex items-center gap-2 mb-1">
                  {getStatusBadge(project.status)}
                  <p className="text-base font-semibold text-gray-800">{project.name}</p>
                </div>
                <p className="text-sm text-gray-400">Body Text</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 가운데 열 (나의 업무) */}
      <div className="h-[722px] min-w-[362px] max-w-[402px] bg-white rounded-xl shadow-md p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">나의 업무</h2>
          <span className="text-sm text-gray-400">마감일 순 ▾</span>
        </div>
        {myTasks.length === 0 ? (
          <p className="text-sm text-gray-400">담당한 업무가 없습니다.</p>
        ) : (
          myTasks
            .sort((a, b) => b._id.localeCompare(a._id))
            .map((task) => (
              <div
                key={task._id}
                className="bg-[#F5F7FA] hover:bg-gray-100 rounded-lg px-6 py-4 mb-4 cursor-pointer"
                onClick={() => navigate(`/tasks`)}
              >
                <div className="flex items-center gap-2 mb-1">
                  {getStatusBadge(task.status)}
                  <p className="text-base font-semibold text-gray-800">{task.title}</p>
                </div>
                <p className="text-sm text-gray-400">Body Text</p>
              </div>
            ))
        )}
      </div>

      {/* 오른쪽 열 (메모) */}
      <div>
        <MemoCard />
      </div>
    </div>
  );
};

export default DashboardContents;
