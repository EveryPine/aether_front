import React from "react";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard: React.FC = () => {
  const columns = [
    { id: "waiting", title: "대기", color: "bg-orange-200" },
    { id: "in-progress", title: "진행", color: "bg-blue-200" },
    { id: "completed", title: "완료", color: "bg-green-200" },
    { id: "issues", title: "이슈", color: "bg-red-200" },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto">
      {columns.map((column) => (
        <KanbanColumn key={column.id} title={column.title} color={column.color} />
      ))}
    </div>
  );
};

export default KanbanBoard;
