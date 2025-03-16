import { axiosInstance } from "./lib/axios"; 
import { User } from "../hooks/useUser";

// 프로젝트 멤버 정보 fetch
export const fetchProjectMembers = async (projectId: string, keyword: string = ""): Promise<User[]> => {
  const { data } = await axiosInstance.get(`/api/projects/${projectId}/members`, {
    params: keyword ? { keyword } : {},
  });
  return data?.data || [];
};

// 생성자에 사용하는 더미 데이터
export const fetchUserInfo = async () => {
    // 생성자에 사용하는 더미 데이터
    return {
      id: "67c1ba6f9aac326b49424b1d", 
      email: "diana021015@gmail.com",
      name: "배수연",
      role: "Member", 
      rank: "Intern",
    };
  };
