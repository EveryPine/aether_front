import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("업무"); // 초기 활성 탭 설정

  const tabs = ["개요", "업무", "문서함", "팀원 관리", "프로젝트 설정"];

  return (
    <div className="h-16 bg-white shadow-md flex items-center px-6">
      {/* 탭 메뉴 */}
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-semibold ${
              activeTab === tab
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-600"
            } hover:text-red-500 hover:border-b-2 hover:border-red-500`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
