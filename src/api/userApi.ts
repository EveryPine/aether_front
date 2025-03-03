import { axiosInstance } from "./lib/axios"; 
import { User } from "../hooks/useUser";

// 프로젝트 멤버 정보 fetch
export const fetchProjectMembers = async (projectId: string, keyword: string = ""): Promise<User[]> => {
  const { data } = await axiosInstance.get(`/projects/${projectId}/members`, {
    params: keyword ? { keyword } : {},
  });
  return data?.data || [];
};
