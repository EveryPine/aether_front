import React, { useState } from 'react';
import { useFormContext } from "react-hook-form";

const TaskDescription: React.FC = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const maxLength = 386;
  const description = watch("description", "");

  return (
    <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
        <div className="text-[#949bad] text-base font-medium leading-normal">
            업무 설명
        </div>
        <div className="self-stretch h-[120px] px-4 py-3 bg-[#f3f5f8] rounded-lg shadow-[inset_0px_0px_4px_0px_rgba(26,26,35,0.12)] flex-col justify-start items-end gap-2.5 flex">
            <textarea
            {...register("description", {
              required: "업무 설명을 입력하세요.",
              maxLength: {
                value: maxLength,
                message: `최대 ${maxLength}자까지 입력할 수 있습니다.`,
              },
            })}
            placeholder="업무 설명을 입력하세요."
            className="w-full h-full bg-transparent outline-none resize-none text-[#4f5462] text-base font-semibold leading-normal"
            />
            {errors.description && (
              <p>{errors.description.message as string}</p>
            )}
        <div className="justify-start items-start gap-0.5 inline-flex">
            <div className="text-right text-[#949bad] text-xs font-medium leading-none">
            ({description.length}/{maxLength})
            </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDescription;
