import React from 'react';
import Header from '../../components/TaskHeader';
import Sidebar from '../../components/TaskSidebar';
import MainContent from '../../components/TaskMainContent';

const TaskSettingPage: React.FC = () => {
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
        <div>
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default TaskSettingPage;