import Card from "../Card"
import DashboardCardItem from "../DashboardItem"
const MyTaskCard = () => (
    <Card title="나의 업무" sortBy="마감일 순">
      <DashboardCardItem title="ABC 업무" status="대기" description="Body Text" />
    </Card>
  );

export default MyTaskCard;