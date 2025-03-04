import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchComments, postComment } from "../api/commentApi";

const useComment = (taskId: string) => {
  const queryClient = useQueryClient();
  
  // 코멘트 조회
  const { data: comments, isLoading, isError } = useQuery(
    ["comments", taskId],
    () => fetchComments(taskId),
    {
      enabled: !!taskId,
      staleTime: 1000 * 60 * 5, 
    }
  );

  // 코멘트 생성
  const createComment = useMutation(
    (commentData: { content: string }) => postComment(taskId, commentData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", taskId]); // 새 댓글 등록 후 목록 갱신
      },
    }
  );

  return { comments, isLoading, isError, createComment };
};

export default useComment;
