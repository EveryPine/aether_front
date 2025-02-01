import React from "react";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard: React.FC = () => {
  const columns = [
    { title: "대기", color: "#FFA726" },
    { title: "진행", color: "#42A5F5" },
    { title: "완료", color: "#66BB6A" },
    { title: "이슈", color: "#EF5350" },
  ];

  return (
    <div className="flex space-x-6 overflow-x-auto">
      {columns.map((col) => (
        <KanbanColumn key={col.title} title={col.title} color={col.color} />
      ))}
    </div>
  );
};

export default KanbanBoard;
