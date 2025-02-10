import React from 'react';

interface TaskTitleProps {
  isEditable: boolean;  // true면 업무 생성, false면 업무 설정 
  title: string;
  setTitle?: (newTitle: string) => void;
}

const TaskTitle: React.FC<TaskTitleProps> = ({ isEditable, title, setTitle }) => {
  return (
    <div className="absolute left-[128px] top-[88px]">
      {/* 업무 생성 */}
      {isEditable ? (
        <div className="h-[52px] w-[160px] px-4 py-2 bg-[#f3f5f8] rounded-lg shadow-[inset_0px_0px_4px_0px_rgba(26,26,35,0.12)] flex items-center gap-1">
          <input
            type="text"
            value={title}
            placeholder="Place Holder"
            onChange={(e) => setTitle?.(e.target.value)}
            className="w-full bg-transparent text-[#4f5462] text-[24px] leading-[36px] tracking-[-0.025em] font-semibold"
          />
          </div>
      ) : ( 
      // 업무 설정
      <h3 className="w-full text-[#4f5462] text-[24px] leading-[36px] tracking-[-0.025em] font-semibold">
        {title}
      </h3>
      )}
    </div>
  );
};

export default TaskTitle; 