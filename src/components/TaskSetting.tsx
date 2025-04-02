import React, {useState, useEffect} from 'react';
import Header from '../components/TaskHeader';
import Sidebar from '../components/TaskSidebar';
import TaskInfo from '../components/TaskInfo/TaskInfo';
import TaskTitle from '../components/TaskTitle';
import TaskDivider from '../components/TaskDivider';
import TaskComment from '../components/TaskComment/TaskComment';
import TaskDocument from '../components/TaskDocument/TaskDocument';
import TaskManager from '../components/TaskManager/TaskManager';
import { FormProvider } from "react-hook-form"
import useTask from "../hooks/useTask"
import AddDocument from '../components/TaskDocument/AddDocument'

const TaskSetting: React.FC<{ selectedTaskId: string | null }> = ({ selectedTaskId }) => {
  const methods = useTask(selectedTaskId, false);
  const { userInfo, handleUpdateTask, formState: { isLoading }, watch } = methods;

  const [activeTab, setActiveTab] = useState('info')
  const [isAddingManager, setIsAddingManager] = useState(false); // 담당자 추가

  const taskInfoValues = {
    title: watch("title", ""),
    description: watch("description", ""),
    isDaily: watch("isDaily", false),
    status: watch("status", "To Do"),
    projectScope: watch("projectScope", "Public"),
    priority: watch("priority", 0),
    startDate: watch("startDate", ""),
    dueDate: watch("dueDate", ""),
    createdBy: watch("createdBy", ""),
    project: watch("project", ""),
    assignedTo: watch("assignedTo", []),
  };
  
  const renderContent = () => {
    if (!userInfo || isLoading) return <div>loading</div>;
    if (methods.formState.isLoading) return <div>Loading</div>;
    switch (activeTab) {
      case 'info':
        return <TaskInfo taskInfoValues={taskInfoValues} methods={methods} userInfo={userInfo}  />;
      case 'docu':
        return <TaskDocument tid={selectedTaskId!}/>;
      case 'chat':
        return <TaskComment tid={selectedTaskId!} userId='67b9cb0eb915f8644f7326f2' />;
    case 'user':
        return <TaskManager setIsAddingManager={setIsAddingManager}/>;
      default:
        return <TaskInfo taskInfoValues={taskInfoValues} methods={methods} userInfo={userInfo}  />;
    }
  };
  
  // 새로운 업무를 선택하면 activeTab을 'info'로 초기화
  useEffect(() => {
    setActiveTab('info');
  }, [selectedTaskId]);

  return (
    <FormProvider {...methods}>  
      <div className="flex items-stretch h-full bg-white pl-2">
        <div className="w-full h-full relative bg-[#F8F9FC] rounded-tl-lg overflow-auto shadow-[inset_0px_0px_8px_rgba(26,26,35,0.12)]">
          <Header title="업무 설정"/>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <TaskTitle isEditable={false} title={taskInfoValues.title}/>
          <TaskDivider />
          {/* 업무 설정, 업무 관리자 탭인 경우 하나의 폼으로 처리 */}
          {['info', 'user'].includes(activeTab) ? (
            <form onSubmit={handleUpdateTask}>
              <div>{renderContent()}</div>
              {!isAddingManager && ( // 담당자 추가 시 생성하기 버튼 비활성화
                <button
                  type="submit"
                  className="absolute top-[705px] left-[506px] w-[86px] h-8 px-4 py-1 bg-[#ff432b] rounded justify-center items-center gap-1 inline-flex"
                >
                  <div className="w-14 text-[#fcfcff] text-sm font-semibold leading-normal">수정하기</div>
                </button>
              )}
            </form>
          ) : (
            <div>{renderContent()}</div> // 코멘트, 문서 탭은 별도로 처리
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default TaskSetting;