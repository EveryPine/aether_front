import { axiosInstance } from "./lib/axios"
import axios, {AxiosError} from "axios";

export const documentApi = {

  // 문서 조회
  fetchDocuments: async (tid: string) => {
    try{
      const response = await axiosInstance.get(`/tasks/${tid}/docs`);
      return response.data.data ?? [];
    } catch(error) {
      console.log(error);
    }
  },

  // 문서 검색
  searchDocument: async (tid: string, keyword: string): Promise<Comment[]> => {
    try {
      const response = await axiosInstance.get(`/tasks/${tid}/docs/search`, {
        params: { keyword }
      });
      return response.data?.data ?? [];
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  // 문서 업로드 
  uploadDocument: async (tid: string, file: File) => {
    if(!file){
      console.log("파일 없음");
    }
    const formData = new FormData();
    formData.append("file", file);

    formData.forEach((value, key) => console.log("폼 데이터 확인:", key, value));

    try{
      const response = await axiosInstance.post(`/tasks/${tid}/docs`, formData);
    
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError; 

      if (axiosError.response) {
        console.error("서버 응답 상태 코드:", axiosError.response.status);
        console.error("서버 응답 데이터:", axiosError.response.data); 
      } else {
        console.error("네트워크 오류:", axiosError.message);
      }
    }
  },

  // 문서 다운로드 
  downloadDocument: async (did: string) => {
    try{
      const response = await axiosInstance.get(`/docs/downloads/${did}`, {
        responseType: "blob",
      });
      console.log("문서 다운로드 헤더:", response.headers);

      const blob = new Blob([response.data])
      const fileUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = fileUrl;
      link.style.display = 'none';

      const contentDisposition = response.headers["content-disposition"];
      console.log("Content-Disposition:", contentDisposition);
      let filename = "unknown";

      if (contentDisposition) {
        const match = contentDisposition.match(/filename\*?=['"]?(?:UTF-8'')?([^;\n"']+)/);
        if (match && match[1]) {
          filename = decodeURIComponent(match[1].trim());
        }
      }
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(fileUrl);

    } catch(error){
      console.log(error);
    }
  }
};
