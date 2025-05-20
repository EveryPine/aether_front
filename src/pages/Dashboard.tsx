import {useState} from "React";
import { getGradientByTime } from "../utils/getGradientByTime";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardContents from "../components/Dashboard/DashboardContents";
import Notice from "../components/Notice";

const dummyNotices = [
  { id: "1", type: "사내공지", body: "5월 팀 회의는 23일입니다." },
  { id: "2", type: "사내공지", body: "대시보드 UI 전면 개편 예정" },
  { id: "3", type: "팀공지", body: "6월 워크샵 장소 확정됨" },
];

const Dashboard = () => {
  const { gradient } = getGradientByTime();
  const [notices, setNotices] = useState(dummyNotices);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/*gradient 적용 배경 전용 레이어*/}
      <div className="absolute top-0 w-full h-[380px] overflow-x-hidden z-0">
        {/*왼→오 그라데이션*/}
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient}`} />
        {/*위→아래 흰색 페이드*/}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white" />
      </div>

      {/*콘텐츠 레이어*/}
      <div className="relative z-10 w-full max-w-[1344px] px-8 pt-[60px]">
        <DashboardHeader />
        <Notice notices={notices}/>
        <DashboardContents setNotices={setNotices} notices={notices} />
      </div>
    </div>
  );
};

export default Dashboard;