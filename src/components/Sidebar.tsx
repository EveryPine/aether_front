import React, { useState } from "react";
import Profile from "../assets/Profile.svg";
import Alarm from "../assets/Alarm.svg";
import Search from "../assets/Vector.svg";
import Dash from "../assets/Dash.svg";
import Setting from "../assets/Setting.svg";
import AetherLogo from "../assets/Aether-logo.svg";

interface SidebarProps {
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab }) => {
  const [isExpanded, setIsExpanded] = useState(false); // 🔄 펼침 상태

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isExpanded ? "flex-start" : "center",
        width: isExpanded ? "200px" : "72px",
        height: "100vh",
        padding: "28px 24px 48px 24px",
        transition: "width 0.3s ease",
        backgroundColor: "#ffffff",
        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* 상단 프로필 및 아이콘 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isExpanded ? "flex-start" : "center",
          width: "100%",
        }}
      >
        {/* 프로필 */}
        <div
          style={{
            marginBottom: "28px",
            display: "flex",
            justifyContent: isExpanded ? "flex-start" : "center",
            width: "100%",
            alignItems: "center",
            height: "48px", // 🔥 전체 높이 고정
          }}
        >
          {/* 프로필 이미지 */}
          <img
            src={Profile}
            alt="Profile"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />

          {/* 이름 + 직급 (펼쳐졌을 때만 보임) */}
          {isExpanded && (
            <div style={{ marginLeft: "12px", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
              <span style={{ fontWeight: 600, fontSize: "16px", color: "#3D3D3D" }}>배수연</span>
              <span style={{ fontSize: "12px", color: "#FF432B", fontWeight: 500 }}>사원</span>
            </div>
          )}
        </div>

        {/* 아이콘 리스트 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            width: "100%",
          }}
        >
          {[
            { icon: Alarm, label: "알림센터" },
            { icon: Search, label: "통합검색" },
            { icon: Dash, label: "대시보드" },
            { icon: Setting, label: "환경설정", onClick: () => setActiveTab("프로젝트 설정") },
          ].map(({ icon, label, onClick }, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={onClick}
            >
              <img
                src={icon}
                alt={label}
                style={{ width: "24px", height: "24px" }}
              />
              {isExpanded && (
                <span style={{ marginLeft: "12px", color: "#949BAD", fontSize: "14px" }}>{label}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 하단 로고 */}
      <div
        style={{
          display: "flex",
          justifyContent: isExpanded ? "flex-start" : "center",
          alignItems: "center",
          width: "100%",
          flexGrow: 1,
          paddingBottom: "70px",
          cursor: "pointer",
        }}
        onClick={toggleSidebar} // 🔁 로고 클릭 시 확장 토글
      >
        <img src={AetherLogo} alt="Logo" style={{ width: "24px", height: "24px" }} />
      </div>
    </div>
  );
};

export default Sidebar;
