// src/components/Dashboard/TeamSpaceCard.tsx
import Card from "../Card";
import DashboardItem from "../DashboardItem.tsx";

const TeamSpaceCard = () => {
  return (
    // <div className="flex flex-col items-start gap-[12px] p-[20px_16px] min-w-[362px] max-w-[402px] h-[168px] bg-white rounded-lg shadow-md">
      <Card title="팀 스페이스">
        <DashboardItem title="ABCD 팀" description="Body Text" />
      </Card>
  );
};

export default TeamSpaceCard;
