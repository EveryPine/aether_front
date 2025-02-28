import React, {useState} from 'react';
import Header from '../components/TaskHeader';
import Sidebar from '../components/TaskSidebar';
import TaskInfo from '../components/TaskInfo/TaskInfo';
import TaskTitle from '../components/TaskTitle';
import TaskDivider from '../components/TaskDivider';
import TaskManager from '../components/TaskManager/TaskManager';
import { FormProvider } from "react-hook-form"
import useTask from "../hooks/useTask"

const TaskAdd: React.FC = () => {
  const methods = useTask(null, true);
  const { userInfo, handleCreateTask } = methods;

  const [activeTab, setActiveTab] = useState('info')
  const [title, setTitle] = useState("");
  const [isAddingManager, setIsAddingManager] = useState(false); // 담당자 추가

  const renderContent = () => {
    if (!userInfo) return <div>loading</div>;
    switch (activeTab) {
      case 'info':
        return <TaskInfo userInfo={userInfo} />;
      case 'user':
        return <TaskManager setIsAddingManager={setIsAddingManager}/>;
      default:
        return <TaskInfo userInfo={userInfo}/>;
    }
  };

  return (
    <FormProvider {...methods}>  
      <div className="flex h-full bg-white pl-2">
        <div className="w-full h-full relative bg-[#F8F9FC] rounded-tl-lg overflow-auto shadow-[inset_0px_0px_8px_rgba(26,26,35,0.12)]">
          <Header title="업무 생성" />
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} visibleTabs={['info', 'user']}/>
          <div className="overflow-auto">
            <TaskTitle isEditable={true} title={title} setTitle={setTitle}/>
            <TaskDivider top='152px'/>
            {/* 업무 정보 폼 */}
            <form onSubmit={handleCreateTask}>
              <div>{renderContent()}</div>
              {!isAddingManager && ( // 담당자 추가 시 생성하기 버튼 비활성화
                <button
                  type="submit" 
                  className="absolute top-[705px] left-[506px] h-8 px-4 py-1 bg-[#ff432b] rounded justify-center items-center gap-1 inline-flex"
                >
                  <div className="w-14 text-[#fcfcff] text-base font-semibold leading-normal">생성하기</div>
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      
    </FormProvider>
  );
};

export default TaskAdd;