import { UseFormReturn, Controller } from "react-hook-form";
import { useState } from "react";
import Down from "../../assets/Down.svg";
import Up from "../../assets/Up.svg";
import { TaskInfoValues } from "../../hooks/useTask";

export const statusOptions = [
  { label: "대기", value: "To Do", bgColor: "bg-[#ffa75b]" },
  { label: "진행", value: "In Progress", bgColor: "bg-[#5ca8ff]" },
  { label: "완료", value: "Done", bgColor: "bg-[#5ec98a]" },
  { label: "이슈", value: "issue", bgColor: "bg-[#ff615b]" },
  { label: "홀드", value: "hold", bgColor: "bg-[#949bad]" },
];

interface TaskStatusProps {
  methods: UseFormReturn<TaskInfoValues>;
}

const TaskStatus: React.FC<TaskStatusProps> = ({ methods }) => {
  const { control, watch } = methods;
  const [isOpen, setIsOpen] = useState(false);
  const selectedStatus = watch("status", "To Do"); 

  return (
    <div className="justify-start items-start gap-12 flex w-full">
      <div className="w-[59px] h-10 py-2 items-center">
        <label className="text-[#949bad] text-base leading-normal">상태</label>
      </div>
      <div className="w-[120px]">
        {/* 드롭다운 버튼 */}
        {!isOpen && (
          <div
            className="h-10 pl-3 pr-2 py-2 bg-[#f8f9fc] flex items-center justify-between cursor-pointer hover:bg-gray-200 rounded-md"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex items-center gap-2">
              {statusOptions
                .filter((option) => option.value === selectedStatus)
                .map((option) => (
                  <div key={option.value} className={`p-2 h-6 ${option.bgColor} rounded flex items-center justify-center`}>
                    <span className="text-[#fcfcff] text-sm">{option.label}</span>
                  </div>
                ))}
            </div>
            <div className="w-3 h-3 flex justify-center items-center">
              <img src = {Down}/>
            </div>
          </div>
        )}

      {/* status 필드 - 펼쳐진 상태 */}
      {isOpen && (
          <div className="bg-[#f3f5f8] rounded-md border border-[#e5eaf2]">
            <div
              className="h-10 pl-3 pr-2 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-2">
                {statusOptions
                  .filter((option) => option.value === selectedStatus)
                  .map((option) => (
                    <div key={option.value} className={`p-2 h-6 ${option.bgColor} rounded flex items-center justify-center`}>
                      <span className="text-[#fcfcff] text-sm">{option.label}</span>
                    </div>
                  ))}
              </div>
              <div className="w-3 h-3 flex justify-center items-center">
                <img src = {Up}/>
              </div>
            </div>

            {/* 옵션 목록 */}
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="pt-1">
                  {statusOptions
                    .filter((option) => option.value !== selectedStatus) // 선택된 옵션 제외
                    .map((option) => (
                      <div
                        key={option.value}
                        className="pl-3 pr-2 py-2 flex items-center cursor-pointer hover:bg-gray-200"
                        onClick={() => {
                          field.onChange(option.value);
                          setIsOpen(false);
                        }}
                      >
                        <div className={`p-2 h-6 ${option.bgColor} rounded flex items-center`}>
                          <span className="text-[#fcfcff] text-sm">{option.label}</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
          />
        </div>
      )}
      </div>
    </div>
  );
}

export default TaskStatus;