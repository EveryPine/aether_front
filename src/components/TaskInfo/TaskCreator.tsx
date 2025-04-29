import React from 'react';

interface TaskCreatorProps {
  creatorName: string;
  rank: string;
}

const TaskCreator: React.FC<TaskCreatorProps> = ({ creatorName, rank }) => {
  return (
    <div className="justify-start items-start gap-12 flex">
        <div className="w-14 h-10 py-2 justify-center items-center gap-2.5 flex">
            <div className="grow shrink basis-0 text-[#949bad] text-base font-medium leading-normal">생성자</div>
        </div>
        <div className="px-3 py-2 rounded-lg justify-start items-center gap-2 flex">
            <div className="text-[#4f5462] text-base font-semibold leading-normal">{creatorName}</div>
            <div className="w-10 text-[#ff432b] text-sm font-semibold leading-normal">{rank}</div>
        </div>
    </div>
  );
};

export default TaskCreator;