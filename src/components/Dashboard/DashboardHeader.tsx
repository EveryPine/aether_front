import { getGradientByTime } from "../../utils/getGradientByTime";

const DashboardHeader = () => {
  const now = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  });
  const { gradient, greeting } = getGradientByTime();

  return (
    <div className={`bg-gradient-to-r ${gradient} transition-all duration-1000`}>
      {/* 회색 반투명 박스 */}
      <div
      className="relative w-[1244px] h-[160px] px-[64px] py-[40px] mx-auto z-10 flex flex-col items-center gap-4 rounded-xl bg-gray-400/50 backdrop-blur-md shadow-[0px_0px_24px_rgba(79,84,98,0.32)]">
        <p className="text-sm text-white">{now}</p>
        <h1 className="text-[32px] font-bold leading-[48px] tracking-[-0.8px] text-[#FCFCFF]/80 font-['SUITE Variable']">
          배수연님 {greeting}
        </h1>
      </div>
    </div>
  );
};

export default DashboardHeader;
