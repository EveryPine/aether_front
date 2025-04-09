export const getGradientByTime = () => {
    const hour = new Date().getHours();
  
    if (hour >= 4 && hour < 11) {
      return {
        gradient: "from-[#00aaff] to-[#80d0ff]", // 아침
        greeting: "좋은 아침이에요!",
      };
    }
    if (hour >= 11 && hour < 17) {
      return {
        gradient: "from-[#aee2ff] to-[#007bff]", // 오후
        greeting: "활기찬 오후에요!",
      };
    }
    return {
      gradient: "from-[#ff9a9e] to-[#fad0c4]", // 저녁
      greeting: "오늘도 수고하셨어요.",
    };
  };
  