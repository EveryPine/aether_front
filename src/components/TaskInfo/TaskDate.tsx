import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const TaskDate: React.FC = () => {
  const { register, watch, setValue } = useFormContext();

  const startYear = watch("startYaer");
  const startMonth = watch("startMonth");
  const startDay = watch("startDay");

  const endYear = watch("endYear");
  const endMonth = watch("endMonth");
  const endDay = watch("endDay");

  useEffect(() => {
    if (startYear && startMonth && startDay) {
      setValue("startDate", `${startYear}-${startMonth.padStart(2, "0")}-${startDay.padStart(2, "0")}`);
    }
  }, [startYear, startMonth, startDay, setValue]);

  useEffect(() => {
    if (endYear && endMonth && endDay) {
      setValue("dueDate", `${endYear}-${endMonth.padStart(2, "0")}-${endDay.padStart(2, "0")}`);
    }
  }, [endYear, endMonth, endDay, setValue]);

  return (
    <div className="h-10 justify-start items-start gap-12 inline-flex">
      <div className="w-[59px] h-10 py-2 flex items-center">
        <div className="text-[#949bad] text-base font-medium leading-normal">
          일정
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* 시작 날짜 */}
        <div className="w-[156px] h-10 px-3 py-2 bg-[#f3f5f8] rounded-lg shadow-[inset_0px_0px_4px_rgba(26,26,35,0.12)] flex justify-center items-center gap-1">
          <input
            {...register("startYear")}
            className="w-[44px] h-6 text-center bg-transparent text-[#4f5462] text-base font-semibold"
            placeholder="YYYY"
            maxLength={4}
          />
          <span className="w-[10px] h-6 text-[#949bad] text-base font-semibold">-</span>
          <input
            {...register("startMonth")}
            className="w-[29px] h-6 text-center bg-transparent text-[#4f5462] text-base font-semibold"
            placeholder="MM"
            maxLength={2}
          />
          <span className="w-[10px] h-6 text-[#949bad] text-base font-semibold">-</span>
          <input
            {...register("startDay")}
            className="w-[23px] h-6 text-center bg-transparent text-[#4f5462] text-base font-semibold"
            placeholder="DD"
            maxLength={2}
          />
        </div>

        {/* 구분자 */}
        <div className="py-2 justify-center items-center gap-2.5 flex">
          <div className="text-[#ff432b] text-base font-medium leading-normal">
            ~
          </div>
        </div>

        {/* 종료 날짜 */}
        <div className="w-[156px] h-10 px-3 py-2 bg-[#f3f5f8] rounded-lg shadow-[inset_0px_0px_4px_rgba(26,26,35,0.12)] flex justify-center items-center gap-1">
          <input
            {...register("endYear")}
            className="w-[44px] h-6 text-center bg-transparent text-[#4f5462] text-base font-semibold"
            placeholder="YYYY"
            maxLength={4}
          />
          <span className="w-[10px] h-6 text-[#949bad] text-base font-semibold">-</span>
          <input
            {...register("endMonth")}
            className="w-[29px] h-6 text-center bg-transparent text-[#4f5462] text-base font-semibold"
            placeholder="MM"
            maxLength={2}
          />
          <span className="w-[10px] h-6 text-[#949bad] text-base font-semibold">-</span>
          <input
            {...register("endDay")}
            className="w-[23px] h-6 text-center bg-transparent text-[#4f5462] text-base font-semibold"
            placeholder="DD"
            maxLength={2}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDate;
