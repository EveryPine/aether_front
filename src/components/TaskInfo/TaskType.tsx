import { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import Down from "../../assets/Down.svg";
import Up from "../../assets/Up.svg";
import { TaskInfoValues } from "../../hooks/useTask";

const IsDailyOptions = [
  { label: "일반 업무", value: false },
  { label: "데일리 업무", value: true },
];

interface TaskTypeProps {
  methods: UseFormReturn<TaskInfoValues>;
}

const TaskType: React.FC<TaskTypeProps> = ({ methods }) => {
  const { control } = methods;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="justify-start items-start gap-12 inline-flex">
      <div className="w-[60px] h-10 py-2 items-center gap-2.5 inline-flex">
        <label className="grow shrink basis-0 text-[#949bad] text-base leading-normal">유형</label>
      </div>
      <div className="w-[120px]">
        <Controller
          name="isDaily"
          control={control}
          render={({ field }) => {
            const selectedIsDaily = field.value ?? false;

            return (
              <>
                {/* 선택된 옵션 */}
                {!isOpen && (
                  <div
                    className="h-10 pl-3 pr-2 py-2 bg-[#f8f9fc] flex items-center justify-between cursor-pointer hover:bg-gray-200 rounded-md"
                    onClick={() => setIsOpen(true)}
                  >
                    <span className="text-[#4f5462] font-semibold text-base">
                      {IsDailyOptions.find((option) => option.value === selectedIsDaily)?.label}
                    </span>
                    <span className="w-3 h-3 flex justify-center items-center">
                      <img src={Down} />
                    </span>
                  </div>
                )}

                {/* 드롭다운 리스트 */}
                {isOpen && (
                  <div className="bg-[#f3f5f8] rounded-md border border-[#e5eaf2]">
                    <div
                      className="h-10 pl-3 pr-2 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-[#4f5462] font-semibold text-base">
                        {IsDailyOptions.find((option) => option.value === selectedIsDaily)?.label}
                      </span>
                      <span className="w-3 h-3">
                        <img src={Up} />
                      </span>
                    </div>

                    {/* 옵션 목록 */}
                    <div className="pt-1">
                      {IsDailyOptions.filter((option) => option.value !== selectedIsDaily).map((option) => (
                        <div
                          key={option.label}
                          className="pl-3 pr-2 py-2 flex items-center cursor-pointer hover:bg-gray-200"
                          onClick={() => {
                            field.onChange(option.value);
                            setIsOpen(false);
                          }}
                        >
                          <span className="text-[#4f5462] font-semibold text-base">{option.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            );
          }}
        />
      </div>
    </div>
  );
};

export default TaskType;
