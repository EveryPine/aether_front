import React, { useState } from "react";
import KanbanCard from "./KanbanCard";

interface KanbanColumnProps {
  title: string;
  color: string;
}

interface Task {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  dueDate: string;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, color }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "ABC 업무", body: "Body Text", createdAt: "2023-01-15", dueDate: "2023-02-10" },
    { id: 2, title: "DEF 업무", body: "Body Text", createdAt: "2023-01-10", dueDate: "2023-02-05" },
  ]);

  const [sortBy, setSortBy] = useState<string>("dueDate");

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === "dueDate") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (sortBy === "createdAt") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  return (
    <div className="w-80 bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center p-2" style={{ backgroundColor: color }}>
        <h2 className="text-lg font-semibold">{title}</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm text-gray-500 border rounded px-2 py-1 focus:outline-none"
        >
          <option value="dueDate">마감일 순</option>
          <option value="createdAt">최신 생성일 순</option>
        </select>
      </div>
      <div className="mt-4 space-y-4">
        {sortedTasks.map((task) => (
          <KanbanCard key={task.id} title={task.title} body={task.body} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
