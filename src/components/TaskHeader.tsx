import React from 'react'

const TaskHeader: React.FC = () => {
  return (
    <header className="w-full h-[48px] px-7 rounded-tl-3xl border-b-2 border-[#e5eaf2] flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="h-[48px] justify-start items-center gap-8 inline-flex">
        <div className="py-3 h-[48px] border-b-2 border-[#ff432b] justify-center items-center gap-2.5 flex">
          <div className="text-[#ff432b] text-sm font-semibold font-['SUIT Variable'] leading-normal">업무 설정</div>
        </div>
      </div>
    </header>
  );
}

export default TaskHeader;