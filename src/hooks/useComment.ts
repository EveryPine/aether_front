import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchComments, postComment, searchComments } from "../api/commentApi";

const useComment = (tid: string, searchKeyword?: string) => {
  const queryClient = useQueryClient();
  
  // 코멘트 조회
  const { data: comments = [], isLoading, isError } = useQuery(
    ["comments", tid, searchKeyword], 
    () => searchKeyword ? searchComments(tid, searchKeyword) : fetchComments(tid),
    {
      enabled: !!tid,
      staleTime: 1000 * 60 * 1, 
      refetchOnWindowFocus: false,
    }
  );

  // 코멘트 생성
  const createComment = useMutation(
    (commentData: { content: string }) => postComment(tid, commentData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", tid]); // 새 댓글 등록 후 목록 갱신
      },
    }
  );

  return { comments, isLoading, isError, createComment };
};

export default useComment;
