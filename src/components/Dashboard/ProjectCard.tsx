import Card from "../Card"
import DashboardCardItem from "../DashboardItem"
const ProjectCard = () => (
    // <div className="flex flex-col items-start gap-[12px] p-[20px_16px] min-w-[362px] max-w-[402px] h-[522px] bg-white rounded-lg shadow-md">
      <Card title="참여 프로젝트" sortBy="우선순위 순">
        <DashboardCardItem title="ABCD 프로젝트" status="대기" description="Body Text" />
      </Card>
  );

export default ProjectCard;  