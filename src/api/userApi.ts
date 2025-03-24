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

//로그인 api 연동 시 사용할 사용자 정보 읽어오기 
// import { axiosInstance } from "./lib/axios"; 
// import { User } from "../hooks/useUser";

// // 유저 정보 가져오기
// export const fetchUserInfo = async (): Promise<User> => {
//   const id = localStorage.getItem("userId") || "";
//   const email = localStorage.getItem("email") || "";
//   const name = localStorage.getItem("username") || "";
//   const role = "Member"; // 기본값 또는 백엔드에서 받아올 수 있으면 교체
//   const rank = "Intern"; // 기본값 또는 백엔드에서 받아올 수 있으면 교체

//   return { id, email, name, role, rank };
// };
