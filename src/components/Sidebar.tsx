import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-100 h-full p-5">
      <h2 className="text-xl font-bold mb-6">ABC 회사</h2>
      <nav>
        <ul className="space-y-4">
          <li className="text-gray-700 hover:text-blue-500">개요</li>
          <li className="text-gray-700 hover:text-blue-500">업무</li>
          <li className="text-gray-700 hover:text-blue-500">문서함</li>
          <li className="text-gray-700 hover:text-blue-500">팀원 관리</li>
          <li className="text-gray-700 hover:text-blue-500">프로젝트 설정</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
