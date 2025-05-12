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
  userInfo?: {
    name: string;
    rank: string;
  };
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
        {/* 업무 설명 */}
        <TaskDescription methods={methods}/>

        {/* 업무 종류 */}
        <TaskType methods={methods}/>

        {/* 업무 상태 */}
        <div className="justify-start items-start gap-12 flex w-full">
          <div className="w-[59px] h-10 py-2 items-center">
            <label className="text-[#949bad] text-base leading-normal">상태</label>
          </div>
          <TaskStatus<TaskInfoValues> methods={methods} />
        </div>

        {/* 업무 공개여부 */}
        <TaskVisibility methods={methods}/>

        {/* 업무 일정 */}
        <div className="justify-start items-start gap-12 inline-flex">
          <div className="w-[59px] h-10 py-2 flex items-center">
            <div className="text-[#949bad] text-base font-medium leading-normal">일정</div>
          </div>
          <TaskDate<TaskInfoValues> methods={methods}/>
        </div>

        {/* 업무 우선순위 */}
        <div className="justify-start items-center gap-12 inline-flex">
          <div className="w-[59px] h-10 py-2 items-center">
            <label className="text-[#949bad] text-base leading-normal">우선순위</label>
          </div>
          <TaskPriority<TaskInfoValues> methods={methods}/>
        </div>
        
        {/* 업무 생성자 */}
        <TaskCreator creatorName={userInfo?.name || taskInfoValues.creator} rank={userInfo?.rank || "intern"}/>
      </div>
    </div>
  );
};

export default TaskInfo;
