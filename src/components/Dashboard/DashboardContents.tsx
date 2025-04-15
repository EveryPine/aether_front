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
  title: string;
}

const DashboardContents = () => {
  const navigate = useNavigate();
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchMyTasks = async () => {
      try {
        const response = await axiosInstance.get("/api/tasks/679aedec4f051a6eaac0204c", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setMyTasks(response.data?.data["To Do"] || []);
      } catch (error) {
        console.error("나의 업무 가져오기 실패", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/api/projects/67fce39dddf4eb5d55ecb3d0", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setProjects(response.data?.data || []);
      } catch (error) {
        console.error("프로젝트 가져오기 실패", error);
      }
    };

    fetchMyTasks();
    fetchProjects();
  }, []);

  return (
    <div className="w-full max-w-[1344px] mt-12 px-4 mx-auto flex gap-8">
      {/* 왼쪽 열 (팀 스페이스 + 참여 프로젝트) */}
      <div className="flex flex-col gap-8">
        <div className="h-[168px] min-w-[362px] max-w-[402px] bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">팀 스페이스</h2>
          <div
            className="cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2"
            onClick={() => navigate("/teamspace")}
          >
            <p className="text-sm text-gray-800 font-medium">Ho감자 팀</p>
          </div>
        </div>

        <div className="h-[522px] min-w-[362px] max-w-[402px] bg-white rounded-xl shadow-md p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">참여 프로젝트</h2>
          {projects.length === 0 ? (
            <p className="text-sm text-gray-400">진행 중인 프로젝트가 없습니다.</p>
          ) : (
            projects.map((project) => (
              <div
                key={project._id}
                className="cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2"
                onClick={() => navigate(`/tasks`)}
              >
                <p className="text-sm text-gray-800 font-medium">{project.title}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 가운데 열 (나의 업무) */}
      <div className="h-[722px] min-w-[362px] max-w-[402px] bg-white rounded-xl shadow-md p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">나의 업무</h2>
        {myTasks.length === 0 ? (
          <p className="text-sm text-gray-400">담당한 업무가 없습니다.</p>
        ) : (
          myTasks
            .sort((a, b) => b._id.localeCompare(a._id))
            .map((task) => (
              <div
                key={task._id}
                className="border-l-4 pl-4 mb-4 last:mb-0 cursor-pointer hover:bg-gray-100 rounded-md"
                onClick={() => navigate(`/tasks`)}
              >
                <p className="text-sm font-medium text-gray-800">{task.title}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{task.description}</p>
                <span className="text-xs text-blue-500">{task.status}</span>
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
