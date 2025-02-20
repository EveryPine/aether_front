import React from 'react';
import TaskStatus from './TaskStatus';
import TaskPriority from './TaskPriority';
import TaskVisibility from './TaskVisibility';
import TaskDate from './TaskDate';
import TaskManager from './TaskManager';

const TaskInfo: React.FC = () => {

  return (
    <div>
      <h4 className="absolute h-[28px] left-[128px] top-[174px] text-[#4f5462] text-xl font-semibold leading-7">
        업무 정보
      </h4>

      <form className="absolute w-[457px] h-[248px] left-[128px] top-[226px] flex-col justify-start items-start gap-3 inline-flex">
        <TaskStatus />
        <TaskVisibility />
        <TaskDate />
        <TaskPriority />
        <TaskManager />
      </form>
    </div>
  );
};

export default TaskInfo;
