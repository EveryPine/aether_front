import React from 'react';
import Header from '../components/TaskHeader'
import Sidebar from '../components/TaskSidebar';
import TaskTitle from '../components/TaskTitle';
import TaskDivider from '../components/TaskDivider';
import TaskInfo from '../components/TaskSetting/TaskInfo';

const TaskSetting: React.FC = () => {
  return (
    <div className="w-[640px] h-[972px] relative bg-[#F8F9FC] rounded-tl-lg shadow-[inset_0px_0px_8px_0px_rgba(26,26,35,0.12)]  overflow-hidden">
      <Header />
      <div>
        <Sidebar />
        <main>
          {/* 업무 이름 */}
            <TaskTitle isEditable={false} title="ABC 업무"/>
            <TaskDivider />
          {/* 업무 정보 */}
            <TaskInfo/>
        </main>
      </div>
    </div>
  );
};

export default TaskSetting;