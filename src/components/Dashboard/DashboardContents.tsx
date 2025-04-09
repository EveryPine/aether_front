// src/components/Dashboard/DashboardContents.tsx
import TeamSpaceCard from "./TeamSpaceCard";
import MyTaskCard from "./MyTaskCard";
import ProjectCard from "./ProjectCard";
import MemoCard from "./MemoCard";

const DashboardContents = () => {
  return (
    <div className="w-[1244px] mx-auto flex gap-[32px] pt-[40px] pb-[10]">
      <div className="flex flex-col gap-[32px] min-w-[362px] max-w-[402px]">
        <TeamSpaceCard />
        <ProjectCard />
      </div>

      <div className="flex flex-col gap-[32px] min-w-[362px] max-w-[402px] h-[722px] flex-1">
        <MyTaskCard />
      </div>

      <div className="flex flex-col justify-between min-w-[362px] max-w-[402px] h-[722px] flex-1">
        <MemoCard />
      </div>
    </div>
  );
};

export default DashboardContents;
