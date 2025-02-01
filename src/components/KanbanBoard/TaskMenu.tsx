import React from "react";
import { FiPlus } from "react-icons/fi";
import List from "../../assets/List.svg"
import Trash from "../../assets/Trash.svg"
import Kanban from "../../assets/Kanban.svg"
import Edit from "../../assets/Edit.svg"

const TaskMenu: React.FC = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", padding: "40px" }}>
      {/* 왼쪽 모드 전환 메뉴 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px",
          borderRadius: "12px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "20%",
            cursor: "pointer",
          }}
        >
          <img src={List} alt="todo-mode"></img>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "20%",
            backgroundColor: "#FFE4E0",
            cursor: "pointer",
          }}
        >
          <img src={Kanban} alt="Kanban-mode"></img>
        </div>
      </div>

      {/* 오른쪽 작업 메뉴 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "8px",
          borderRadius: "12px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* 필터 버튼 */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "20%",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FFEBE8")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <img src={Edit} alt="Edit"></img>
        </button>

        {/* 삭제 버튼 */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "20%",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FFEBE8")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <img src={Trash} alt="Trash"></img>
        </button>

        {/* 업무 생성 버튼 */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 12px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#FF432B",
            color: "#FFFFFF",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          <FiPlus size={16} color="#FFFFFF" style={{ marginRight: "8px" }} />
          업무 생성
        </button>
      </div>
    </div>
  );
};

export default TaskMenu;
