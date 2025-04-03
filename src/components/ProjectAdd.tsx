import React from "react";

const ProjectAdd: React.FC = () => {
  return (
    <div className="bg-[#F8F9FC] p-10 rounded-lg h-full shadow-inner">
      <div className="border-b border-[#E5EAF2] pb-4 mb-6">
        <h2 className="text-[#FF432B] text-base font-semibold border-b-2 border-[#FF432B] inline-block pb-1">
          프로젝트 생성
        </h2>
      </div>

      {/* 프로젝트 제목 */}
      <div className="mb-6">
        <label className="block text-[#4F5462] text-sm font-semibold mb-2">
          프로젝트 제목
        </label>
        <input
          type="text"
          placeholder="프로젝트 제목을 입력하세요"
          className="w-full p-3 border border-[#E5EAF2] rounded-lg text-[#4F5462] font-semibold"
        />
      </div>

      {/* 프로젝트 설명 */}
      <div className="mb-6">
        <label className="block text-[#4F5462] text-sm font-semibold mb-2">
          프로젝트 소개 및 설명
        </label>
        <textarea
          placeholder="Place Holder"
          rows={4}
          className="w-full p-3 border border-[#E5EAF2] rounded-lg resize-none text-[#4F5462]"
        ></textarea>
        <p className="text-right text-[#949BAD] text-xs mt-1">( 0 / 364 )</p>
      </div>

      {/* 상태, 공개여부, 일정, 우선순위 */}
      <div className="flex flex-wrap gap-6">
        {/* 상태 */}
        <div>
          <p className="text-[#4F5462] text-sm font-semibold mb-2">상태</p>
          <div className="bg-[#FFE4E0] text-[#FF432B] px-3 py-1 rounded-full text-sm inline-block">
            대기
          </div>
        </div>

        {/* 공개여부 */}
        <div>
          <p className="text-[#4F5462] text-sm font-semibold mb-2">공개 여부</p>
          <select className="border border-[#E5EAF2] rounded px-3 py-1 text-sm">
            <option>전체 공개</option>
            <option>팀원 공개</option>
            <option>비공개</option>
          </select>
        </div>

        {/* 일정 */}
        <div>
          <p className="text-[#4F5462] text-sm font-semibold mb-2">일정</p>
          <div className="flex items-center gap-2">
            <input
              type="date"
              className="border border-[#E5EAF2] rounded px-2 py-1 text-sm"
            />
            <span className="text-[#4F5462] text-sm">~</span>
            <input
              type="date"
              className="border border-[#E5EAF2] rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        {/* 우선순위 */}
        <div className="flex flex-col">
          <p className="text-[#4F5462] text-sm font-semibold mb-2">우선순위</p>
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-[#FF432B] rounded-md"></div>
            <div className="w-20 h-2 bg-[#E5EAF2] rounded-md"></div>
            <div className="w-20 h-2 bg-[#E5EAF2] rounded-md"></div>
            <p className="text-sm text-[#4F5462]">낮음</p>
          </div>
        </div>
      </div>

      {/* 생성 버튼 */}
      <div className="mt-10 text-right">
        <button className="bg-[#FF432B] text-white font-semibold px-5 py-2 rounded">
          생성하기
        </button>
      </div>
    </div>
  );
};

export default ProjectAdd;
