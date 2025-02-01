//Sidebar.tsx
import React from "react";
import Profile from "../assets/Profile.svg";
import Alarm from "../assets/Alarm.svg";
import Search from "../assets/Vector.svg";
import Dash from "../assets/Dash.svg";
import Setting from "../assets/Setting.svg";
import AetherLogo from "../assets/Aether-logo.svg";
const Sidebar: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "72px",
        height: "100vh", // 뷰포트 기준 높이
        alignSelf: "stretch",
        padding: "28px 24px 48px 24px",
      }}
    >
      {/* 상단 프로필 및 아이콘 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* 프로필 아이콘 */}
        <div
          style={{
            marginBottom: "28px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src={Profile} // 프로필 이미지 경로
            alt="Profile"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* 아이콘들 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <img src={Alarm} alt="Alarm" style={{ width: "24px", height: "24px" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <img src={Search} alt="Search" style={{ width: "24px", height: "24px" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <img src={Dash} alt="Dash" style={{ width: "24px", height: "24px" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <img src={Setting} alt="Setting" style={{ width: "24px", height: "24px" }} />
          </div>
        </div>
      </div>

      {/* 하단 로고 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          flexGrow: 1,
          alignItems: "flex-end", 
          paddingBottom: "70px", 
        }}
      >
        <img src={AetherLogo} alt="Logo" style={{ width: "24px", height: "24px" }} />
      </div>
    </div>

  );
};
export default Sidebar;