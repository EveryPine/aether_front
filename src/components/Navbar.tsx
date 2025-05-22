import React from "react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs?: string[]; 
}

const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  tabs = ["개요", "업무", "문서함", "팀원 관리", "프로젝트 설정"], // 기본값
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#F8F9FC",
      }}
    >
      {tabs.map((tab) => (
        <div
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            position: "relative",
            padding: "10px 25px",
            cursor: "pointer",
            color: activeTab === tab ? "#FF432B" : "#949BAD",
            fontWeight: activeTab === tab ? "bold" : "normal",
            fontSize: "14px",
            transition: "color 0.3s"
          }}
        >
          {tab}
          {activeTab === tab && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "1.3px",
                backgroundColor: "#FF432B",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Navbar;
