import React from 'react';

interface TaskDividerProps {
  top?: string;
}

const TaskDivider: React.FC<TaskDividerProps> = ({top = "136px"}) => {
  return (
    <div 
      className={`absolute w-[464px] h-[2px] left-[128px] bg-[#e5eaf2] rounded-lg`}
      style={{ top }}
    />
  );
};

export default TaskDivider;