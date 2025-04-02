// src/components/Dashboard/DashboardContents.tsx
import TeamSpaceCard from "./TeamSpaceCard";
import MyTaskCard from "./MyTaskCard";
import ProjectCard from "./ProjectCard";
import MemoCard from "./MemoCard";

const DashboardContents = () => {
  return (
    <div className="flex gap-4 p-6">
      {/* 왼쪽: 열 정렬 */}
      <div className="flex flex-col gap-4">
        <TeamSpaceCard />
        <ProjectCard />
      </div>

      {/* 오른쪽: 행 정렬 */}
      <div className="flex gap-4">
        <MyTaskCard />
        <MemoCard />
      </div>
    </div>
  );
};

export default DashboardContents;
