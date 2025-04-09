export const getBackgroundByTime = () => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 11) {
    return "bg-gradient-to-r from-[#007BFF] to-[#FFC9C2]"; // 아침
  }
  if (hour >= 11 && hour < 17) {
    return "bg-gradient-to-r from-[#3DB5FF] to-[#007BFF]"; // 낮
  }
  return "bg-gradient-to-r from-[#FFC9C2] via-[#D4C0D0] to-[#007BFF]"; // 저녁~새벽
};