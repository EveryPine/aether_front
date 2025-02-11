import React from "react";
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
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "72px", height: "100vh", padding: "28px 24px 48px 24px" }}>
      {/* 상단 프로필 및 아이콘 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <div style={{ marginBottom: "28px", display: "flex", justifyContent: "center", width: "100%" }}>
          <img src={Profile} alt="Profile" style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", cursor: "pointer" }} />
        </div>

        {/* 아이콘들 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", gap: "40px" }}>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <img src={Alarm} alt="Alarm" style={{ width: "24px", height: "24px", cursor: "pointer" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <img src={Search} alt="Search" style={{ width: "24px", height: "24px", cursor: "pointer" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <img src={Dash} alt="Dash" style={{ width: "24px", height: "24px", cursor: "pointer" }} />
          </div>
          {/* 프로젝트 설정 탭 활성화 */}
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
            onClick={() => setActiveTab("프로젝트 설정")}
          >
            <img src={Setting} alt="Setting" style={{ width: "24px", height: "24px", cursor: "pointer" }} />
          </div>
        </div>
      </div>

      {/* 하단 로고 */}
      <div style={{ display: "flex", justifyContent: "center", width: "100%", flexGrow: 1, alignItems: "flex-end", paddingBottom: "70px" }}>
        <img src={AetherLogo} alt="Logo" style={{ width: "24px", height: "24px" }} />
      </div>
    </div>
  );
};

export default Sidebar;