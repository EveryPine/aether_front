import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Down from "../../assets/Down.svg";
import Up from "../../assets/Up.svg";

const IsDailyOptions = [
  { label: "일반 업무", value: false},
  { label: "데일리 업무", value: true}
];

const TaskType: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const selectedIsDaily = watch("isDaily");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="justify-start items-start gap-12 inline-flex">
      <div className="w-[60px] h-10 py-2 items-center gap-2.5 inline-flex">
        <label className="grow shrink basis-0 text-[#949bad] text-base leading-normal">유형</label>
      </div>
      <div className="w-[120px]">
        {!isOpen && (
          <div
            className="h-10 pl-3 pr-2 py-2 bg-[#f8f9fc] flex items-center justify-between cursor-pointer hover:bg-gray-200 rounded-md"
            onClick={() => setIsOpen(true)}
          >
            <span className="text-[#4f5462] font-semibold text-base">
              {IsDailyOptions.find((option) => option.value === selectedIsDaily)?.label}
            </span>
            <span className="w-3 h-3 flex justify-center items-center">
              <img src ={Down}/>
            </span>
          </div>
        )}

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
                <img src ={Up}/>
              </span>
            </div>

            <div className="pt-1">
              {IsDailyOptions
                .filter(option => option.value !== selectedIsDaily)
                .map((option) => (
                  <div
                    key={option.label}
                    className="pl-3 pr-2 py-2 flex items-center cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setValue("IsDaily", option.value);
                      setIsOpen(false);
                    }}
                  >
                    <span className="text-[#4f5462] font-semibold text-base">{option.label}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskType;