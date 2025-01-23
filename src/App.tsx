import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard.tsx";

const App: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <Navbar />
        {/* Main Content */}
        <div className="flex-1 overflow-hidden p-4">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
};

export default App;
