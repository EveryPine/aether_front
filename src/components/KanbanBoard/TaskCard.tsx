import React from "react";

interface TaskCardProps {
  title: string;
  description: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "12px",
        padding: "20px 16px",
        minWidth: "362px",
        maxWidth: "402px",
        flex: "1 0 0",
        background: "#FFFFFF",
        borderRadius: "8px",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)", // 적당한 박스 섀도우 추가
        border: "1px solid #E5E7EB", // 테두리 설정
      }}
    >
      {/* 카드 제목 */}
      <div
        style={{
          fontWeight: "700",
          fontSize: "16px",
          lineHeight: "24px",
          color: "#111827",
        }}
      >
        {title}
      </div>

      {/* 카드 본문 */}
      <div
        style={{
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "20px",
          color: "#6B7280",
        }}
      >
        {description}
      </div>
    </div>
  );
};

export default TaskCard;
