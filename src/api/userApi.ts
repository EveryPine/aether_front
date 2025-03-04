import { axiosInstance } from "./lib/axios"; 
import { User } from "../hooks/useUser";

// 프로젝트 멤버 정보 fetch
export const fetchProjectMembers = async (projectId: string, keyword: string = ""): Promise<User[]> => {
  const { data } = await axiosInstance.get(`/projects/${projectId}/members`, {
    params: keyword ? { keyword } : {},
  });
  return data?.data || [];
};

// 생성자에 사용하는 더미 데이터
export const fetchUserInfo = async () => {
  return {
    id: "65a3c9f7b1d4e8a7c9f5d2b3", 
    email: "ABC123@test.com",
    name: "최기수",
    role: "Member", 
    rank: "팀장",
  };
};