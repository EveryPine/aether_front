// src/components/DashboardItem.tsx
import React from "react";

interface DashboardItemProps {
  title: string;
  description: string;
  status?: string;
}

const DashboardItem: React.FC<DashboardItemProps> = ({ title, description, status }) => {
  return (
    <div className="bg-gray-100 rounded p-3 mb-2">
      {status && <span className="text-xs bg-orange-200 px-2 py-0.5 rounded mr-2">{status}</span>}
      <h4 className="text-sm font-bold">{title}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default DashboardItem;
