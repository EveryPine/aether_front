import React, { useState } from "react";
import Info from "../assets/Info.svg";
import InfoActive from "../assets/InfoActive.svg";
import Chat from "../assets/Chat.svg";
import ChatActive from "../assets//ChatActive.svg";
import Docu from "../assets/Docu.svg";
import DocuActive from "../assets/DocuActive.svg";
import User from "../assets/User.svg";
import UserActive from "../assets/UserActive.svg";

interface MenuItem {
  id: string;
  defaultIcon: string;
  activeIcon: string;
}

interface TaskSidebarProps {
  visibleItems?: string[];
}

const TaskSidebar: React.FC<TaskSidebarProps> = ({ visibleItems = ["info", "chat", "docu", "user"] }) => {
  const [active, setActive] = useState<string | null>("info");

  const menuItems: MenuItem[]  = [
    { id: "info", defaultIcon: Info, activeIcon: InfoActive },
    { id: "chat", defaultIcon: Chat, activeIcon: ChatActive },
    { id: "docu", defaultIcon: Docu, activeIcon: DocuActive },
    { id: "user", defaultIcon: User, activeIcon: UserActive },
  ];

  return (
    <a className="absolute h-[924px] w-[96px] top-[48px] px-7 py-6 bg-[#f8f9fc] border-r-2 border-[#e5eaf2] flex flex-col items-center gap-5">
      {menuItems
        .filter((item) => visibleItems.includes(item.id)) // visibleItems에 해당하는 아이템만 렌더링
        .map((item) => (
        <button
          key={item.id}
          className={`p-2 rounded-lg flex items-center justify-center transition-all outline-none ${
            active === item.id ? "bg-[#ffe4e0]" : "bg-transparent"
          }`}
          onClick={() => setActive(item.id)}
        >
          <img
            src={active === item.id ? item.activeIcon : item.defaultIcon}
            alt={`${item.id} icon`}
            className="w-6 h-6"
          />
        </button>
      ))}
    </a>
  );
};

export default TaskSidebar;
