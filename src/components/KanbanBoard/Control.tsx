import React from "react";

const Control: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="space-x-2">
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">정렬</button>
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">필터</button>
      </div>
      <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md">업무 생성</button>
    </div>
  );
};

export default Control;
