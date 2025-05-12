import React, { useState } from "react";
import ProejectTitle from "./Project/ProjectTitle";
import ProjectDescription from "./Project/ProjectDescription";
import TaskStatus from "./TaskInfo/TaskStatus";
import useProject from "../hooks/useProject";
import { FormProvider } from "react-hook-form";
import { ProjectIinfoValues } from "../hooks/useProject";
import ProjectScope from "./Project/ProjectScope";
import TaskDate from "./TaskInfo/TaskDate";
import TaskPriority from "./TaskInfo/TaskPriority";

const ProjectSetting: React.FC = () => {
  const methods = useProject();
  const [title, setTitle] = useState("");

  return (
    <div className="w-full px-10 py-8">
      <FormProvider {...methods}>
        <form className="space-y-6">
          {/* 프로젝트 제목 */}
          <div>
            <label className="w-block mb-2 text-sm font-medium text-[#4F5462]">프로젝트 제목</label>
            <ProejectTitle title={title} setTitle={setTitle}/>
          </div>

          {/* 프로젝트 설명 */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#4F5462]">프로젝트 소개 및 설명</label>
            <ProjectDescription/>  
          </div>

          {/* 상태, 공개여부, 일정 */}
          <div className="self-stretch inline-flex flex-col justify-start items-start gap-3">
            {/* 상태 */}
            <div className="flex items-start self-stretch justify-start gap-12">
              <label className="w-[59px] text-[#949bad] text-base font-medium leading-normal" style={{ marginTop: "7.6px" }} >
                상태
              </label>
              <TaskStatus<ProjectIinfoValues> methods={methods} />
            </div>

            {/* 공개여부 */}
            <div className="flex self-stretch justify-start items-start gap-12">
              <label className="w-[59px] text-[#949bad] text-base font-medium leading-normal" style={{ marginTop: "7.6px" }} >
                공개 여부
              </label>
              <ProjectScope methods={methods}/> 
            </div>

            {/* 일정 */}
            <div className="flex items-start self-stretch justify-start gap-12">
              <label className="w-[59px] text-[#949bad] text-base font-medium leading-normal" style={{ marginTop: "7.6px" }} >
                일정
              </label>
              <TaskDate<ProjectIinfoValues> methods={methods}/>
            </div>

            {/* 우선순위 */}
            <div className="flex items-start self-stretch justify-start gap-12">
              <label className="w-[59px] text-[#949bad] text-base font-medium leading-normal" style={{ marginTop: "7.6px" }} >
                우선순위
              </label>
              <TaskPriority<ProjectIinfoValues> methods={methods}/>
            </div>
          </div>      

          {/* 저장 버튼 */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 text-sm font-semibold text-white bg-[#FF432B] rounded-md"
            >
              저장하기
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProjectSetting;
