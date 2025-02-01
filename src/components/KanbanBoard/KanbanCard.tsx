import React from "react";

interface KanbanCardProps {
  title: string;
  body: string;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ title, body }) => {
  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{body}</p>
    </div>
  );
};

export default KanbanCard;
