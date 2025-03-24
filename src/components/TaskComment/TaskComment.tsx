import React, {useState , useEffect} from 'react';
import Search from '../Search';
import useComment from "../../hooks/useComment";
import Profile from '../../assets/Profile-small.svg';
import Up from '../../assets/Up-monotone.svg';
import Down from '../../assets/Down-monotone.svg';

interface TaskCommentProps {
  tid: string;
  userId: string;
}

const TaskComment: React.FC<TaskCommentProps> = ({ tid, userId }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchKeyword]);

  const { comments, isLoading, isError, createComment } = useComment(tid, debouncedKeyword);
  const [content, setContent] = useState("");

  // 답글 상태 관리
  const [openReplies, setOpenReplies] = useState<Record<string, boolean>>({});

  // 특정 댓글의 답글 펼치기
  const toggleReplies = (commentId: string) => {
    setOpenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  //코멘트 검색
  const handleCommentSearch = (term: string) => {
    setSearchKeyword(term);
  };

  // 코멘트 입력 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await createComment.mutateAsync(
        { content },
        {
          onSuccess: () => setContent(''), // 성공 시 입력 필드 초기화
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h4 className="absolute h-[28px] left-[128px] top-[174px] text-[#4f5462] text-xl font-semibold leading-7">
        코멘트
      </h4>
      {/* 검색 */}
      <Search 
        className="left-[432px]"
        placeholder="코멘트 검색"
        onSearch={handleCommentSearch}
      />
      
      {/* 전체 코멘트 리스트 또는 검색 결과*/}
      {!isLoading && !isError && comments && (
        <div className="absolute w-[464px] h-auto overflow-y-auto max-h-[500px] left-[128px] top-[230px] gap-5 flex flex-col">
          {comments.map((comment) => (
            <div key={comment._id} className="w-[464px] bg-[#F3F5F8] border border-[#e5eaf2] rounded-lg px-5 py-4 flex flex-col gap-1">
              {/* 댓글 본문 */}
              <div className="flex items-center gap-3">
                <img className="w-8 h-8 rounded-full" src={Profile} alt="프로필" />
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-1">
                    <div className="text-xs font-medium">{comment.commenterId}</div>
                  </div>
                  <div className="text-sm font-medium">{comment.content}</div>
                </div>
              </div>

              {/* 답글 보기 */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="self-stretch px-4 inline-flex justify-start items-end gap-3">
                  <button
                    onClick={() => toggleReplies(comment._id)}
                    className="bg-[#F3F5F8] p-0 text-xs text-[#949BAD] font-medium flex items-center"
                  >
                    답글 {comment.replies.length}개
                    <img src={openReplies[comment._id] ? Up : Down} className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* 답글 리스트 */}
              {openReplies[comment._id] && comment.replies && (
                <div className="self-stretch flex flex-col justify-start items-start gap-4 mt-2">
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="w-[430px] px-4 bg-Colors-GrayScale-G100 flex flex-col">
                      <div className="flex items-center gap-3">
                        <img className="w-8 h-8 rounded-full" src={Profile} alt="프로필" />
                        <div className="flex-1 flex flex-col">
                          <div className="flex items-center gap-1">
                            <div className="text-xs font-medium">{reply.commenterId}</div>
                          </div>
                          <div className="text-sm font-medium">{reply.content}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 코멘트 입력 */}
      <form
        onSubmit={handleSubmit}
        className="absolute left-[96px] top-[696px] w-[544px] h-60 pl-8 pr-12 py-8 bg-[#f3f5f8] text-[#949bad] border-t-2 border-[#e5eaf2] flex-col justify-start items-end gap-6 inline-flex"
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="코멘트를 입력해 주세요."
          className="w-[464px] h-[104px] bg-transparent text-[#4f5462] text-base font-semibold leading-normal resize-none outline-none"
        />
        <button
          type="submit"
          disabled={createComment.isLoading}
          className="px-4 py-1 bg-[#ff432b] rounded-lg text-[#fcfcff] text-sm font-semibold"
        >
          등록
        </button>
      </form>

    </div>
  );
};

export default TaskComment;
