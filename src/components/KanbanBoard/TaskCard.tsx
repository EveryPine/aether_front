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
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: "362px",
        maxWidth: "402px",
        padding: "20px 16px",
        borderRadius: "8px",
        borderTop: `8px solid ${borderColor}`,
        background: "#FCFCFF",
        boxShadow: "0px 0px 8px rgba(26, 26, 35, 0.12)",
        gap: "12px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#4F5462" }}>
            {title}
          </h4>
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{
            fontSize: "12px",
            border: "none",
            color: "#949BAD",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
        >
          <option value="마감일순">마감일순</option>
          <option value="최신생성일순">최신생성일순</option>
        </select>
      </div>

      {/* Body */}
      <div
        onClick={onClick}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          gap: "8px",
          alignSelf: "stretch",
          borderRadius: "4px",
          border: `1px solid ${isSelected ? borderColor : "#E5EAF2"}`,
          background: "#F3F5F8",
          cursor: "pointer",
        }}
      >
        <p style={{ margin: 0, fontSize: "20px", fontWeight: "normal", color: "#4F5462" }}>
          {title}
        </p>
        <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#4F5462" }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
