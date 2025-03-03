import { axiosInstance } from './lib/axios';
import { TaskInfoValues } from '../hooks/useTask';

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
    return response.data;
  } catch (error) {
    console.log(error)
    return {};
  }
};

export const updateTask = async (tid: string, updatedData: Partial<TaskInfoValues>) => {
  try{
    const response = await axiosInstance.patch(`/tasks/${tid}/info`, updatedData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
