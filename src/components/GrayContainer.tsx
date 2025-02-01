import React from "react";
import KanbanBoard from "./KanbanBoard/KanbanBoard";
import ControlButtonGroup from "./KanbanBoard/ControlButtonGroup";

const GrayContainer: React.FC = () => {
    return (
      <div
        className="flex flex-col bg-white shadow-lg p-6 rounded-lg m-6 flex-1"
        style={{
          boxShadow: "0px 4px 10px rgba(26, 26, 35, 0.32)",
        }}
      >
        {/* 컨트롤 버튼 */}
        <div className="mb-6 flex justify-between">
          <ControlButtonGroup />
        </div>
        {/* 칸반 보드 */}
        <div className="flex-1">
          <KanbanBoard />
        </div>
      </div>
    );
  };
  
  export default GrayContainer;