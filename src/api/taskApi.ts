import { axiosInstance } from './lib/axios';

// 업무 생성
export const createTask = async (taskData: object, token: string) => {
  try {
    const response = await axiosInstance.post('/tasks', taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("업무 생성 에러: ", error);
  }
};

// 업무 상세정보 조회
export const fetchTaskInfo = async (tid: string, token: string) => {
  console.log("요청 보내는 토큰:", token);
  try {
    const response = await axiosInstance.get(`/tasks/${tid}/info`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log("업무 상세 에러: ", error)
    return {};
  }
};
