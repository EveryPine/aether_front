import React from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import { TaskInfoValues } from "../../hooks/useTask";

interface TaskPriorityProps {
  methods: UseFormReturn<TaskInfoValues>;
}

const priorityLabels: { [key: number]: string } = {
  1: "낮음",
  2: "보통",
  3: "높음",
  4: "긴급",
};

const TaskPriority: React.FC<TaskPriorityProps> = ({ methods }) => {
  const { control } = methods;

  return (
    <div className="justify-start items-center gap-12 inline-flex">
      <div className="w-[59px] h-10 py-2 items-center">
        <label className="text-[#949bad] text-base leading-normal">우선순위</label>
      </div>
      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <div className="justify-start items-center gap-4 flex">
            {/* 우선순위 선택 바 */}
            <div className="w-[220px] h-4 relative">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className={`w-[52px] h-4 absolute top-0 ${num === 1 ? "left-0 rounded-tl-xl rounded-bl-xl" : ""}
                    ${num === 2 ? "left-[56px]" : ""} 
                    ${num === 3 ? "left-[112px]" : ""} 
                    ${num === 4 ? "left-[168px] rounded-tr-xl rounded-br-xl" : ""}
                    ${num <= field.value ? "bg-[#ff432b]" : "bg-[#e5eaf2] shadow-[inset_0px_0px_8px_rgba(26,26,35,0.12)]"} 
                    cursor-pointer`}
                  onClick={() => field.onChange(num)}
                />
              ))}
            </div>
            <div className="text-[#4f5462] text-base font-semibold leading-normal">
              {priorityLabels[field.value]}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default TaskPriority;
