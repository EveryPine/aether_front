import React from 'react';
import { useFormContext } from "react-hook-form";

interface TaskTitleProps {
  isEditable: boolean;  // true면 업무 생성, false면 업무 설정 
  title: string;
  setTitle?: (newTitle: string) => void;
}

const TaskTitle: React.FC<TaskTitleProps> = ({ isEditable, title, setTitle }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="absolute left-[128px] top-[88px]">
      {/* 업무 생성 */}
      {isEditable ? (
        <div className= "w-40 px-4 py-2 bg-[#f3f5f8] rounded-lg shadow-[inset_0px_0px_4px_0px_rgba(26,26,35,0.12)] flex items-center gap-1">
          <input
            {...register("title")}
            type="text"
            defaultValue={title}
            placeholder="Place Holder"
            onChange={(e) => setTitle?.(e.target.value)}
            className="w-full bg-transparent text-[#4f5462] text-2xl leading-9 tracking-[-0.025em] font-semibold"
          />
          </div>
      ) : ( 
      // 업무 설정
      <h3 className="w-full text-[#4f5462] text-2xl leading-9 tracking-[-0.025em] font-semibold">
        {title}
      </h3>
      )}
      {errors.title && ( 
        <p>{errors.title.message as string}</p>
      )}
    </div>
  );
};

export default TaskTitle; 