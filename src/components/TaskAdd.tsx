import React, { useState } from 'react';
import Header from './TaskHeader';
import Sidebar from './TaskSidebar';
import TaskInfo from './TaskInfo/TaskInfo';
import TaskTitle from './TaskTitle';
import TaskDivider from './TaskDivider';
import TaskManager from './TaskManager/TaskManager';
import { FormProvider } from "react-hook-form";
import useTask from "../hooks/useTask";
import axiosInstance from "../api/lib/axios";

const TaskAdd: React.FC<{ fetchTasks: () => void }> = ({ fetchTasks }) => {
  const methods = useTask(null, true);
  const { userInfo, handleSubmit, watch, setValue } = methods;

  const [activeTab, setActiveTab] = useState('info');
  const [title, setTitle] = useState("");
  const [isAddingManager, setIsAddingManager] = useState(false); // 담당자 추가

  const handleCreateTask = async (data: any) => {
    console.log("📌 전송 데이터:", data);
  
    // ✅ 필수 필드 검증 (누락된 값이 있으면 요청 차단)
    // 업무 생성 api 연동 
    if (!data.title || !data.description || !data.status || !data.project || !data.createdBy) {
      console.error("❌ 필수 필드 누락! 업무를 생성할 수 없습니다.");
      return;
    }
  
    // ✅ 날짜 변환 (ISO 8601 형식 유지)
    const formattedStartDate = data.startDate ? new Date(data.startDate).toISOString() : null;
    const formattedDueDate = data.dueDate ? new Date(data.dueDate).toISOString() : null;
  
    try {
      const response = await axiosInstance.post("/api/tasks", {
        title: data.title,
        description: data.description,
        status: data.status || "To Do",
        priority: data.priority ?? 3, // 기본값 3
        project: data.project ?? "679aedec4f051a6eaac0204c", //기본 project id 값
        assignedTo: Array.isArray(data.assignedTo) ? data.assignedTo : [], // ✅ 리스트 검증
        createdBy: data.createdBy,
        isDaily: data.isDaily ?? false, // ✅ 기본값 false
        startDate: formattedStartDate,
        dueDate: formattedDueDate,
      });
  
      console.log("✅ 업무 생성 성공:", response.data);
      if (response.data.success) {
        fetchTasks(); // ✅ 업무 생성 후 실시간 반영
      }
    } catch (error: any) {
      console.error("❌ 업무 생성 실패:", error.response?.data || error);
    }
  };  

  const taskInfoValues = {
    title: watch("title"),
    description: watch("description"),
    isDaily: watch("isDaily"),
    status: watch("status"),
    projectScope: watch("projectScope"),
    priority: watch("priority"),
    startDate: watch("startDate"),
    dueDate: watch("dueDate"),
    createdBy: watch("createdBy"),
    project: watch("project"),
    assignedTo: watch("assignedTo"),
  };

  return (
    <FormProvider {...methods}>  
      <div className="flex h-full bg-white pl-2">
        <div className="w-full h-full relative bg-[#F8F9FC] rounded-tl-lg overflow-auto shadow-[inset_0px_0px_8px_rgba(26,26,35,0.12)]">
          <Header title="업무 생성" />
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} visibleTabs={['info', 'user']} />
          <div className="overflow-auto">
            <TaskTitle isEditable={true} title={title} setTitle={setTitle} />
            <TaskDivider top='152px' />
            {/* 업무 정보 폼 */}
            <form onSubmit={handleSubmit(handleCreateTask)}>  
              <div>
                {activeTab === "info" ? (
                  <TaskInfo 
                  methods={methods} 
                  taskInfoValues={taskInfoValues} 
                  userInfo={{ name: userInfo?.name ?? "알 수 없음", rank: userInfo?.rank ?? "미정" }} 
                />                
                ) : (
                  <TaskManager setIsAddingManager={setIsAddingManager} />
                )}
              </div>
              {!isAddingManager && (
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
