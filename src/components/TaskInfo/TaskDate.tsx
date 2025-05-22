import React from "react";
import { Controller , UseFormReturn } from "react-hook-form";
import { TaskInfoValues } from "../../hooks/useTask";

interface TaskDateProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
}

const TaskDate = <T extends FieldValues>({ methods }: TaskDateProps<T>) => {
  const { control } = methods;

  // 날짜 변환 함수 (ISO -> 년월일)
  const formatDate = (date: string | undefined ) => {
    if (!date) return "";
    return date.split("T")[0];
  };

  return (
    <div className="flex items-center gap-3">
      {/* 시작 날짜 */}
      <div className="w-[156px] h-10 px-3 py-2 bg-[#f3f5f8] rounded-lg shadow-[inset_0px_0px_4px_rgba(26,26,35,0.12)] flex justify-center items-center gap-1">
        <Controller
          name={"startDate" as Path<T>}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="date"
              value={formatDate(field.value)}
              onChange={(e) => field.onChange(e.target.value)}
              className="w-full bg-transparent text-[#4f5462] text-base font-semibold text-center outline-none"
            />
          )}
        />
      </div>

      {/* 구분자 */}
      <div className="py-2 justify-center items-center gap-2.5 flex">
        <div className="text-[#ff432b] text-base font-medium leading-normal">~</div>
      </div>

      {/* 종료 날짜 */}
      <div className="w-[156px] h-10 px-3 py-2 bg-[#f3f5f8] rounded-lg shadow-[inset_0px_0px_4px_rgba(26,26,35,0.12)] flex justify-center items-center">
        <Controller
          name={"dueDate" as Path<T>}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="date"
              value={formatDate(field.value)}
              onChange={(e) => field.onChange(e.target.value)}
              className="w-full bg-transparent text-[#4f5462] text-base font-semibold text-center outline-none"
            />
          )}
        />
      </div>
    </div>
  );
};

export default TaskDate;