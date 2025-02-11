import React from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

// TaskInfo에서 정의한 FormValues 타입
type FormValues = {
  status: string;
  visibility: string;
  priority: number;
  startYear: string;
  startMonth: string;
  startDay: string;
  endYear: string;
  endMonth: string;
  endDay: string;
};

// Props 타입 정의
interface TaskDateProps {
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
}

const TaskDate: React.FC<TaskDateProps> = ({ register, watch }) => {
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
