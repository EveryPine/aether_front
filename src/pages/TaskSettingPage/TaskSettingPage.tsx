import React from 'react';
import Header from '../../component/TaskHeader'
import Sidebar from '../../component/TaskSidebar';
import MainContent from '../../component/TaskMainContent';

const TaskSettingPage: React.FC = () => {
  return (
    <div className="w-[640px] h-[972px] relative bg-[#F8F9FC] rounded-tl-lg shadow-[inset_0px_0px_8px_0px_rgba(26,26,35,0.12)]  overflow-hidden">
      <Header />
      <div>
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

export default TaskSettingPage;
