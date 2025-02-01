import React from "react";

const Breadcrumb: React.FC = () => {
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
      <span>
        <span style={{ marginRight: "8px" }}>ABC 회사</span>
        <span style={{ margin: "0 8px" }}>&gt;</span>
        <span style={{ marginLeft: "3px", marginRight: "8px" }}>ABCD 팀</span>
        <span style={{ margin: "0 8px" }}>&gt;</span>
        <span style={{marginLeft: "3px"}}>ABCDE 프로젝트</span>
      </span>

    </div>
  );
};

export default Breadcrumb;
