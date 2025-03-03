import { useQuery } from "@tanstack/react-query";
import { fetchProjectMembers } from "../api/userApi"; 
export interface User {
  _id: string;
  name: string;
  email: string;
  rank: string;
  role: string;
}

export const useUser = (projectId: string, keyword: string = "") => {
  return useQuery<User[]>({
    queryKey: ["user", projectId, keyword],
    queryFn: () => fetchProjectMembers(projectId, keyword), 
    enabled: !!projectId, 
  });
};
