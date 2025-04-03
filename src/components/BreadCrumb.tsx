import React from "react";

interface BreadcrumbProps {
  label: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({label}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 48px",
        fontFamily: "SUIT Variable",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "15.84px",
        letterSpacing: "-0.3px",
        color: "#4F5462", // 텍스트 색상 지정
        backgroundColor: "#fff", // 배경색상 지정
      }}
    >
      {/* Breadcrumb */}
      {/* label 전달 형식으로 변경 */}
      <span>{label}</span>

    </div>
  );
};

export default Breadcrumb;
