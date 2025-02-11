import React from 'react';
import TaskStatus from './TaskStatus';
import TaskPriority from './TaskPriority';
import TaskVisibility from './TaskVisibility';
import { useForm } from "react-hook-form";
import TaskDate from './TaskDate';
import TaskManager from './TaskManager';

// 타입 정의
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

const TaskInfo: React.FC = () => {
  const { control, setValue, watch, register } = useForm<FormValues>({
    defaultValues: {
      status: "pending",
      visibility: "public",
      priority: 1,
      startYear: "",
      startMonth: "",
      startDay: "",
      endYear: "",
      endMonth: "",
      endDay: "",
    },
  });

  return (
    <div>
      <h4 className="absolute h-[28px] left-[128px] top-[174px] text-[#4f5462] text-xl font-semibold leading-7">
        업무 정보
      </h4>

      <form className="absolute w-[457px] h-[248px] left-[128px] top-[226px] flex-col justify-start items-start gap-3 inline-flex">
        <TaskStatus control={control} setValue={setValue} watch={watch} />
        <TaskVisibility control={control} setValue={setValue} watch={watch} />
        <TaskDate register={register} watch={watch} />
        <TaskPriority control={control} setValue={setValue} watch={watch} register={register} />
        <TaskManager />
      </form>
    </div>
  );
};

export default TaskInfo;
