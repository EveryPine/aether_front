import { axiosInstance } from "./lib/axios"

export const documentApi = {

  // 문서 조회
  fetchDocuments: async (tid: string) => {
    try{
      const response = await axiosInstance.get(`/api/tasks/${tid}/docs`);
      return response.data.data ?? [];
    } catch(error) {
      console.log(error);
    }
  },

  // 문서 검색
  searchDocument: async (tid: string, keyword: string): Promise<Comment[]> => {
    try {
      const response = await axiosInstance.get(`/api/tasks/${tid}/docs/search`, {
        params: { keyword }
      });
      return response.data?.data ?? [];
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  // 문서 업로드 
  uploadDocument: async (tid: string, files: File) => {
    if(!files){
      console.log("파일 없음");
    }
    const formData = new FormData();
    formData.append("files", files); 

    try{
      const response = await axiosInstance.post(`/api/tasks/${tid}/docs`, formData);
    
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  // 문서 다운로드 
  downloadDocument: async (did: string) => {
    try{
      const response = await axiosInstance.get(`/api/docs/downloads/${did}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data])
      const fileUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = fileUrl;
      link.style.display = 'none';

      const contentDisposition = response.headers["content-disposition"];
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
