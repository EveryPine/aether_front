import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { documentApi } from "../api/documentApi";

export interface Document {
    _id: string;
    length: number;
    chunkSize: number;
    uploadDate: string;
    filename: string;
    metadata: {
      taskId: string;
    };
  }

// 문서 조회 및 검색
export const useDocuments = (tid: string, searchKeyword?: string) => {
  return useQuery<Document[]>({
    queryKey: ["documents", tid, searchKeyword],
    queryFn: () =>
      searchKeyword 
      ? documentApi.searchDocument(tid, searchKeyword) 
      : documentApi.fetchDocuments(tid),
    enabled: !!tid, 
    staleTime: 1000 * 60 * 1, 
    refetchOnWindowFocus: false,
  });
};

// 문서 업로드 
export const useUploadDocument = (tid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (files: File) => documentApi.uploadDocument(tid, files),
    onSuccess: () => {
      queryClient.invalidateQueries(["documents", tid]); // 문서 리스트 새로고침
    },
  });
};

// 문서 다운로드 
export const useDownloadDocument = () => {
  return useMutation({
    mutationFn: (did: string) => documentApi.downloadDocument(did),
  });
};
