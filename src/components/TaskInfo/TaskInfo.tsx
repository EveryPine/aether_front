import React from 'react';
import TaskStatus from './TaskStatus';
import TaskPriority from './TaskPriority';
import TaskVisibility from './TaskVisibility';
import TaskDate from './TaskDate';
import TaskCreator from './TaskCreator';
import TaskType from './TaskType';
import TaskDescription from './TaskDescription';
import { UseFormReturn } from "react-hook-form";
import { TaskInfoValues } from "../../hooks/useTask";

interface TaskInfoProps {
  userInfo: {
    name: string;
    rank: string;
  };
}

interface TaskInfoProps {
  taskInfoValues: TaskInfoValues;
  methods: UseFormReturn<TaskInfoValues>;
}

const TaskInfo: React.FC<TaskInfoProps> = ({ taskInfoValues, methods, userInfo }) => {
  return (
    <div>
      <h4 className="absolute h-[28px] left-[128px] top-[174px] text-[#4f5462] text-xl font-semibold leading-7">
        업무 정보
      </h4>
      <div className="absolute w-[457px] left-[128px] top-[226px] flex-col justify-start items-start gap-3 inline-flex">
        <TaskDescription methods={methods}/>
        <TaskType methods={methods}/>
        <TaskStatus methods={methods}/>
        <TaskVisibility methods={methods}/>
        <TaskDate methods={methods}/>
        <TaskPriority methods={methods}/>
        <TaskCreator creatorName={userInfo?.name} rank={userInfo?.rank}/>
      </div>
    </div>
  );
};

export default TaskInfo;
