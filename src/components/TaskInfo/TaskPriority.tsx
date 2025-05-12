import React from "react";
import { UseFormReturn, Controller, FieldValues, Path } from "react-hook-form";
import { TaskInfoValues } from "../../hooks/useTask";

interface TaskPriorityProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
}

const priorityLabels: { [key: number]: string } = {
  1: "낮음",
  2: "보통",
  3: "높음",
  4: "긴급",
};

const TaskPriority = <T extends FieldValues>({ methods }: TaskPriorityProps<T>) => {
  const { control } = methods;

  return (
    <Controller
      name={"priority" as Path<T>}
      control={control}
      render={({ field }) => (
        <div className="justify-start h-10 items-center gap-4 flex">
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
  );
};

export default TaskPriority;
