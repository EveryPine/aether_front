export const getGradientByTime = () => {
    const hour = new Date().getHours();
  
    if (hour >= 4 && hour < 11) {
      return {
        gradient: "from-[#007BFF] to-[#FFC9C2]", // 아침
        greeting: "좋은 아침이에요!",
      };
    }
    if (hour >= 11 && hour < 17) {
      return {
        gradient: "from-[#3DB5FF] to-[#007BFF]", // 오후
        greeting: "활기찬 오후에요!",
      };
    }
    return {
      gradient: "from-[#FFC9C2] to-[#007BFF]", // 저녁
      greeting: "오늘도 수고하셨어요.",
    };
  };
  