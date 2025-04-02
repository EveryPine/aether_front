// src/utils/getBackgroundByTime.ts
export const getBackgroundByTime = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "bg-gradient-to-r from-blue-200 to-blue-500"; // 아침
    if (hour < 17) return "bg-gradient-to-r from-blue-400 to-blue-700"; // 낮
    return "bg-gradient-to-r from-purple-600 to-red-400"; // 저녁
  };
  