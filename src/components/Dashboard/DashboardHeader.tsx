import { getBackgroundByTime } from "../../utils/getBackgroundByTime";

//useGreeting.ts
export const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "좋은 아침이에요!";
    if (hour < 18) return "활기찬 오후에요!";
    return "오늘도 수고하셨어요.";
  };

  // DashboardHeader.tsx
const DashboardHeader = () => {
    const greeting = getGreeting();
    const now = new Date().toLocaleDateString("ko-KR", { weekday: "long", year: "numeric", month: "2-digit", day: "2-digit" });
    const bgClass = getBackgroundByTime(); // 해당 부분 수정 필요 (그라데이션이 시간 지날수록 색변경되게. 현재는 이미지 세개 준비해두고 변경되도록 하는 느낌)
  
    return (
      <div className={`w-full h-[100px] rounded-xl px-8 py-4 ${bgClass}`}>
        <p className="text-white text-sm">{now}</p>
        <h1 className="text-white text-2xl font-bold">최기수님 {greeting}</h1>
      </div>
    );
  };

  export default DashboardHeader;