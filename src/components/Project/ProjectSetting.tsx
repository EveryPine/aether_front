import React from 'react';
import { UseFormReturn } from "react-hook-form";
import ProjectDescription from "./ProjectDescription"

const ProjectSetting: React.FC = () => {
  return (
    <div className="absolute top-[248px] min-w-[1248px] px-2.5">
        <div className="flex flex-col justify-start items-start gap-2 px-10">
            <div className="text-[#949bad] text-base font-medium leading-normal">
                프로젝트 소개 및 설명
            </div>
            <ProjectDescription />
        </div>
    </div>
  );
};

export default ProjectSetting;
