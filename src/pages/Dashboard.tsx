// src/pages/Dashboard.tsx
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardContents from "../components/Dashboard/DashboardContents";

const Dashboard = () => {
  return (
    <div className="h-full w-full">
      <DashboardHeader />
      <DashboardContents />
    </div>
  );
};

export default Dashboard;
