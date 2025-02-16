import React, {useState} from 'react';
import Header from '../components/TaskHeader';
import Sidebar from '../components/TaskSidebar';
import TaskInfo from '../components/TaskInfo/TaskInfo';
import TaskTitle from '../components/TaskTitle';
import TaskDivider from '../components/TaskDivider';
import TaskComment from '../components/TaskComment/TaskComment';
import TaskDocument from '../components/TaskDocument/TaskDocument';
import TaskManager from '../components/TaskManager/TaskManager';


const TaskSetting: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info')

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return <TaskInfo />;
      case 'docu':
        return <TaskDocument />;
      case 'chat':
        return <TaskComment />;
      case 'user':
        return <TaskManager />;
      default:
        return <TaskInfo />;
    }
  };

  return (
    <div className="flex items-stretch h-full bg-white pl-2">
      <div className="w-full h-full relative bg-[#F8F9FC] rounded-tl-lg overflow-auto shadow-[inset_0px_0px_8px_rgba(26,26,35,0.12)]">
        <Header title="업무 설정"/>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <TaskTitle isEditable={false} title="ABC 업무"/>
        <TaskDivider />
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default TaskSetting;