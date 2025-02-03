import React from 'react';

const TaskConstructor: React.FC = () => {
  return (
    <div className="h-10 justify-start items-start gap-12 inline-flex">
        <div className="w-[59px] h-10 py-2 justify-center items-center gap-2.5 flex">
            <div className="grow shrink basis-0 text-[#949bad] text-base font-medium leading-normal">생성자</div>
        </div>
        <div className="px-3 py-2 rounded-lg justify-start items-center gap-2 flex">
            <div className="text-[#4f5462] text-base font-semibold leading-normal">최기수</div>
            <div className="text-[#ff432b] text-sm font-semibold leading-normal">팀장</div>
        </div>
    </div>
  );
};

export default TaskConstructor;