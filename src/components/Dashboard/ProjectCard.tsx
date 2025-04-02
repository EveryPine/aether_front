import Card from "../Card"
import DashboardCardItem from "../DashboardItem"
const ProjectCard = () => (
    <Card title="참여 프로젝트" sortBy="우선순위 순">
      <DashboardCardItem title="ABCD 프로젝트" status="대기" description="Body Text" />
    </Card>
  );

export default ProjectCard;  