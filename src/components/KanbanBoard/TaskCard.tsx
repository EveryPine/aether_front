import React, { useState } from "react";

interface TaskCardProps {
  title: string;
  description: string;
  status: string;
  onClick: () => void;
  isSelected: boolean;
}

const getBorderColor = (status: string) => {
  switch (status) {
    case "To Do":
      return "#FFA85C";
    case "In Progress":
      return "#5CA8FF";
    case "Done":
      return "#5EC98B";
    case "Issue":
      return "#FF615C";
    case "Hold":
      return "#949BAD";
    default:
      return "#E5EAF2";
  }
};

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  onClick,
  isSelected,
}) => {
  const [sortOption, setSortOption] = useState("마감일순");
  const borderColor = getBorderColor(status);

  return (
    <div
      className="flex flex-col min-w-[362px] max-w-[402px] p-5 rounded-md shadow-md gap-3 bg-[#FCFCFF]"
      style={{
        borderTop: `8px solid ${borderColor}`,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-[#4F5462] m-0">{title}</h4>
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="text-xs text-[#949BAD] bg-transparent cursor-pointer border-none focus:outline-none"
        >
          <option value="마감일순">마감일순</option>
          <option value="최신생성일순">최신생성일순</option>
        </select>
      </div>

      {/* Body */}
      <div
        onClick={onClick}
        className="flex flex-col gap-2 p-4 rounded cursor-pointer bg-[#F3F5F8]"
        style={{
          border: `1px solid ${isSelected ? borderColor : "#E5EAF2"}`,
        }}
      >
        <p className="text-[20px] font-normal text-[#4F5462] m-0">{title}</p>
        <p className="text-xs text-[#4F5462] m-0 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default TaskCard;
