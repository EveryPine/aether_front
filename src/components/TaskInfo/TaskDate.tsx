import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const TaskDate: React.FC = () => {
  const { register, watch, setValue } = useFormContext();

  const startYear = watch("startYear");
  const startMonth = watch("startMonth");
  const startDay = watch("startDay");

  const endYear = watch("endYear");
  const endMonth = watch("endMonth");
  const endDay = watch("endDay");

  //시작 날짜 변환
  useEffect(() => {
    if (startYear && startMonth && startDay) {
      const dateStr = `${startYear}-${startMonth.padStart(2, "0")}-${startDay.padStart(2, "0")}`;
      const dateObj = new Date(dateStr);
      if (!isNaN(dateObj.getTime())) {
        setValue("startDate", dateObj.toISOString()); // 날짜 형식 맞춤
      }
    }
  }, [startYear, startMonth, startDay, setValue]);

  //종료 날짜 변환
  useEffect(() => {
    if (endYear && endMonth && endDay) {
      const dateStr = `${endYear}-${endMonth.padStart(2, "0")}-${endDay.padStart(2, "0")}`;
      const dateObj = new Date(dateStr);
      if (!isNaN(dateObj.getTime())) {
        setValue("dueDate", dateObj.toISOString()); // 날짜 형식 맞춤
      }
    }
  }, [endYear, endMonth, endDay, setValue]);

  return (
    <div className="justify-start items-start gap-12 inline-flex">
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
            id="startYear"
            className="w-[44px] h-6 text-center bg-transparent text-[#4f5462] text-base font-semibold"
            placeholder="YYYY"
            maxLength={4}
            onChange={(e) => {
              if (e.target.value.length === 4) {
                document.getElementById("startMonth")?.focus();
              }
            }}
          />
          <span className="w-[10px] h-6 text-[#949bad] text-base font-semibold">-</span>
          <input
            {...register("startMonth")}
            id="startMonth"
            className="w-[29px] h-6 text-center bg-transparent text-[#4f5462] text-base font-semibold"
            placeholder="MM"
            maxLength={2}
            onChange={(e) => {
              if (e.target.value.length === 2) {
                document.getElementById("startDay")?.focus();
              }
            }}
          />
          <span className="w-[10px] h-6 text-[#949bad] text-base font-semibold">-</span>
          <input
            {...register("startDay")}
            id="startDay"
            className="w-[23px] h-6 text-center bg-transparent text-[#4f5462] text-base font-semibold"
            placeholder="DD"
            maxLength={2}
            onChange={(e) => {
              if (e.target.value.length === 2) {
                document.getElementById("endYear")?.focus();
              }
            }}
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
            id="endYear"
            className="w-[44px] h-6 text-center bg-transparent text-[#4f5462] text-base font-semibold"
            placeholder="YYYY"
            maxLength={4}
            onChange={(e) => {
              if (e.target.value.length === 4) {
                document.getElementById("endMonth")?.focus();
              }
            }}
          />
          <span className="w-[10px] h-6 text-[#949bad] text-base font-semibold">-</span>
          <input
            {...register("endMonth")}
            id="endMonth"
            className="w-[29px] h-6 text-center bg-transparent text-[#4f5462] text-base font-semibold"
            placeholder="MM"
            maxLength={2}
            onChange={(e) => {
              if (e.target.value.length === 2) {
                document.getElementById("endDay")?.focus();
              }
            }}
          />
          <span className="w-[10px] h-6 text-[#949bad] text-base font-semibold">-</span>
          <input
            {...register("endDay")}
            id="endDay"
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
