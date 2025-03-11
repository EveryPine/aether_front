import { axiosInstance } from "../api/lib/axios";

interface Comment {
  _id: string;
  tid: string;
  commenterId: string;
  content: string;
}

// 코멘트 조회
export const fetchComments = async (tid: string): Promise<Comment[]> => {
  try{
    const response = await axiosInstance.get(`/tasks/${tid}/comments`);
    return response.data?.data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 코멘트 검색
export const searchComments = async (tid: string, keyword: string): Promise<Comment[]> => {
  try {
    const response = await axiosInstance.get(`/tasks/${tid}/comments/search`, {
      params: { keyword }
    });
    return response.data?.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// 코멘트 추가
export const postComment = async (tid: string, commentData: { content: string }) => {
  try{
    const response = await axiosInstance.post(`/tasks/${tid}/comments`, commentData);
    return response.data?.comments ?? [];
  } catch (error){
    console.error(error);
  }
};
