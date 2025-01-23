import React from "react";
import KanbanCard from "./KanbanCard";

interface KanbanColumnProps {
  title: string;
  color: string;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, color }) => {
  const dummyTasks = [
    { id: 1, title: "ABC 업무", body: "Body Text" },
    { id: 2, title: "Title", body: "Body Text" },
  ];

  return (
    <div className={`flex flex-col flex-shrink-0 w-64 ${color} p-4 rounded-lg`}>
      <h4 className="text-center text-lg font-bold mb-4">{title}</h4>
      <div className="space-y-3">
        {dummyTasks.map((task) => (
          <KanbanCard key={task.id} title={task.title} body={task.body} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
