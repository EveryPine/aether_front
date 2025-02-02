import { useState } from "react";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import Down from "../assets/Down.svg";
import Up from "../assets/Up.svg";

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

interface TaskVisibilityProps {
  control: Control<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
}

const VisibilityOptions = [
  { label: "전체 공개", value: "public"},
  { label: "담당자 공개", value: "private"}
];

export default function TaskVisibility({ setValue, watch }: TaskVisibilityProps) {
  const selectedVisibility = watch("visibility");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="justify-start items-start gap-12 inline-flex">
      <div className="w-[60px] h-10 py-2 items-center gap-2.5 inline-flex">
        <label className="grow shrink basis-0 text-[#949bad] text-base leading-normal">공개 여부</label>
      </div>
      <div className="w-[120px]">
        {!isOpen && (
          <div
            className="h-10 h pl-3 pr-2 py-2 bg-[#f8f9fc] flex items-center justify-between cursor-pointer hover:bg-gray-200 rounded-md"
            onClick={() => setIsOpen(true)}
          >
            <span className="text-[#4f5462] font-semibold text-base">
              {VisibilityOptions.find((option) => option.value === selectedVisibility)?.label}
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
                {VisibilityOptions.find((option) => option.value === selectedVisibility)?.label}
              </span>
              <span className="w-3 h-3">
                <img src ={Up}/>
              </span>
            </div>

            <div className="pt-1">
              {VisibilityOptions
                .filter(option => option.value !== selectedVisibility)
                .map((option) => (
                  <div
                    key={option.value}
                    className="pl-3 pr-2 py-2 flex items-center cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setValue("visibility", option.value);
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
