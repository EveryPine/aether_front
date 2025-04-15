// src/components/Card.tsx
import React from "react";

interface CardProps {
  title: string;
  sortBy?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, sortBy, children }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-md font-semibold">{title}</h2>
        {sortBy && <span className="text-sm text-gray-400">{sortBy}</span>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
