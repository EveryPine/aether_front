import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="h-16 bg-white shadow-md flex items-center px-6 border-b">
      <h3 className="text-lg font-semibold">업무</h3>
      <div className="ml-auto">
        <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
          업무 생성
        </button>
      </div>
    </div>
  );
};

export default Navbar;
