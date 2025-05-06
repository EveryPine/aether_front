import React, { useState } from "react";
import ProejectTitle from "./Project/ProjectTitle";
import ProjectDescription from "./Project/ProjectDescription";

const ProjectSetting: React.FC = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("대기");
  const [visibility, setVisibility] = useState("전체 공개");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState(1);

  const statusOptions = ["대기", "진행", "완료", "이슈", "보류"];
  const visibilityOptions = ["전체 공개", "팀원만 보기"];
  const priorityLevels = [1, 2, 3, 4];

  return (
    <div className="w-full px-10 py-8">
      <form className="space-y-6">
        {/* 프로젝트 제목 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-[#4F5462]">프로젝트 제목</label>
          <ProejectTitle title={title} setTitle={setTitle}/>
        </div>

        {/* 프로젝트 설명 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-[#4F5462]">프로젝트 소개 및 설명</label>
          <ProjectDescription />  
        </div>

        {/* 상태, 공개여부, 일정 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
          {/* 상태 */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#4F5462]">상태</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-md border-[#D9DBE1] bg-white"
            >
              {statusOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* 공개여부 */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#4F5462]">공개 여부</label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-full px-4 py-2 border rounded-md border-[#D9DBE1] bg-white"
            >
              {visibilityOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* 일정 */}
          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <label className="mb-1 text-sm font-medium text-[#4F5462]">일정</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-2 py-1 border rounded-md border-[#D9DBE1]"
                />
                <span className="text-gray-500">~</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-2 py-1 border rounded-md border-[#D9DBE1]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 우선순위 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-[#4F5462]">우선순위</label>
          <div className="flex items-center gap-2">
            {priorityLevels.map((level) => (
              <div
                key={level}
                onClick={() => setPriority(level)}
                className={`h-3 w-10 rounded cursor-pointer ${
                  level <= priority ? "bg-[#FF432B]" : "bg-[#E5EAF2]"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-[#4F5462]">낮음</span>
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
    </div>
  );
};

export default ProjectSetting;
