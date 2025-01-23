import React from "react";

interface KanbanCardProps {
  title: string;
  body: string;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ title, body }) => {
  return (
    <div className="bg-white rounded-md p-3 shadow-md">
      <h5 className="text-md font-semibold">{title}</h5>
      <p className="text-sm text-gray-600">{body}</p>
    </div>
  );
};

export default KanbanCard;
