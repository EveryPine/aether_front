import { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import Down from "../../assets/Down.svg";
import Up from "../../assets/Up.svg";
import { ProjectIinfoValues } from "../../hooks/useProject";

const ScopeOption = [
  { label: "전체공개", value: "Public" },
  { label: "팀원만 보기", value: "Team" }
];

interface ProjectScopeProps {
  methods: UseFormReturn<ProjectIinfoValues>;
}

const TaskVisibility: React.FC<ProjectScopeProps> = ({ methods }) => {
  const { control } = methods;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[120px]">
        <Controller
            name="scope"
            control={control}
            render={({ field }) => {
            const selectedVisibility = field.value ?? "Team";

            return (
                <>
                {/* 선택된 옵션 */}
                {!isOpen && (
                    <div
                    className="h-10 pl-3 pr-2 py-2 bg-[#f8f9fc] flex items-center justify-between cursor-pointer hover:bg-gray-200 rounded-md"
                    onClick={() => setIsOpen(true)}
                    >
                    <span className="text-[#4f5462] font-semibold text-base">
                        {ScopeOption.find((option) => option.value === selectedVisibility)?.label}
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
                        {ScopeOption.find((option) => option.value === selectedVisibility)?.label}
                        </span>
                        <span className="w-3 h-3">
                        <img src={Up} />
                        </span>
                    </div>

                    {/* 옵션 목록 */}
                    <div className="pt-1">
                        {ScopeOption.filter((option) => option.value !== selectedVisibility).map((option) => (
                        <div
                            key={option.value}
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
  );
};

export default TaskVisibility;
