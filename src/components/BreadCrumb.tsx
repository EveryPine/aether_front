import React from "react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbProps {
  paths: { label: string; path?: string }[]; // path가 있을 때만 클릭 가능
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths = [] }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "16px 48px",
        fontFamily: "SUIT Variable",
        fontSize: "12px",
        fontWeight: 500,
        lineHeight: "15.84px",
        letterSpacing: "-0.3px",
        color: "#4F5462",
        backgroundColor: "#fff"
      }}
    >
      {paths.map((item, index) => (
        <span key={index} style={{ display: "flex", alignItems: "center" }}>
          {item.path ? (
            <span
              onClick={() => navigate(item.path!)}
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "#4F5462",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.textDecoration = "none";
              }}
            >
              {item.label}
            </span>
          ) : (
            <span>{item.label}</span>
          )}
          {index < paths.length - 1 && <span style={{ margin: "0 8px" }}>{">"}</span>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
