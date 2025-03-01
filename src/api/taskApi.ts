import { axiosInstance } from './lib/axios';

// 업무 생성
export const createTask = async (taskData: object) => {
  try {
    const response = await axiosInstance.post('/tasks', taskData, {
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 업무 상세정보 조회
export const fetchTaskInfo = async (tid: string) => {
  try {
    const response = await axiosInstance.get(`/tasks/${tid}/info`,{
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error)
    return {};
  }
};
