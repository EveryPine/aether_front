import React from "react";

const ControlButtonGroup: React.FC = () => {
  return (
    <div className="flex space-x-2">
      <button className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-red-500"></button>
      <button className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-red-500"></button>
      <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
        + 업무 생성
      </button>
    </div>
  );
};

export default ControlButtonGroup;
