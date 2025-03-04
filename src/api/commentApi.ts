import { axiosInstance } from "../api/lib/axios";

interface Comment {
  _id: string;
  taskId: string;
  commenterId: string;
  content: string;
}

// 코멘트 조회
export const fetchComments = async (taskId: string): Promise<Comment[]> => {
  try{
    const response = await axiosInstance.get(`/tasks/${taskId}/comments`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 코멘트 추가
export const postComment = async (taskId: string, commentData: { content: string }) => {
  try{
    const response = await axiosInstance.post(`/tasks/${taskId}/comments`, commentData);
    return response.data;
  } catch (error){
    console.error(error);
  }
};
