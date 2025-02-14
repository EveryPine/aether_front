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
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        height: "972px", // 기존 높이 유지
        backgroundColor: "white", // 흰색 배경 추가 (외부 공간)
        paddingLeft: "8px", // 왼쪽 여백 8px 추가
      }}
    >
     <div
        className="w-[640px] h-full relative bg-[#F8F9FC] rounded-tl-lg overflow-hidden"
        style={{
          boxShadow: "inset 0px 0px 8px rgba(26, 26, 35, 0.12)", // 내부 그림자 효과 적용
        }}
      >
        <Header />
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TaskTitle />
        <TaskDivider />
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default TaskSetting;