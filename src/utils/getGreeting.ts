export const getGreeting = () => {
    const hour = new Date().getHours();
  
    if (hour >= 4 && hour < 11) return "좋은 아침이에요!";
    if (hour >= 11 && hour < 17) return "활기찬 오후에요!";
    return "오늘도 수고하셨어요.";
  };
  