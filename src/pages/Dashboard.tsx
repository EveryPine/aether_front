import { getGradientByTime } from "../utils/getGradientByTime";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardContents from "../components/Dashboard/DashboardContents";

const Dashboard = () => {
  const { gradient } = getGradientByTime();

  return (
    <div className="relative w-full flex flex-col items-center">
      {/*gradient 적용 배경 전용 레이어*/}
      <div className="absolute top-0 w-full h-[380px] overflow-hidden z-0">
        {/*왼→오 그라데이션*/}
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient}`} />
        {/*위→아래 흰색 페이드*/}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white" />
      </div>

      {/*콘텐츠 레이어*/}
      <div className="relative z-10 w-full max-w-[1344px] px-8 pt-[60px]">
        <DashboardHeader />
        <DashboardContents />
      </div>
    </div>
  );
};

export default Dashboard;
