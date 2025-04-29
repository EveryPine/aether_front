import React, {useState , useEffect} from 'react';
import Search from '../Search';
import useComment from "../../hooks/useComment";
import Profile from '../../assets/Profile-small.svg';
import Up from '../../assets/Up-monotone.svg';
import Down from '../../assets/Down-monotone.svg';
import Brenchsvg from '../../assets/Brench.svg'

interface TaskCommentProps {
  tid: string;
  userId: string;
}

interface Comment {
  _id: string;
  tid: string;
  parentId?: string;
  commenterId: {
    _id: string;
    name: string;
  };
  content: string;
  replies?: Comment[];
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
  const [replyTo, setReplyTo] = useState<Comment | null>(null);

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
        { content, parentId: replyTo?._id },
        {
          onSuccess: () => {
            setContent(''); // 성공 시 입력 필드 초기화
            setReplyTo(null); // 성공 시 답글 대상 초기화
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setReplyTo(null); // 업무가 변경될 때 선택한 댓글 초기화
  }, [tid]);

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
      {!isLoading && !isError && (
        <div className="absolute w-[464px] h-auto overflow-y-auto max-h-[500px] left-[128px] top-[230px] gap-5 flex flex-col overflow-visible">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="w-[464px] bg-[#F3F5F8] border border-[#e5eaf2] rounded-lg px-5 py-4 flex flex-col gap-1">
                {/* 댓글 본문 */}
                <div className="flex items-center gap-3">
                  <img className="w-8 h-8 rounded-full" src={Profile} alt="프로필" />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-1">
                      <div className="w-full text-xs font-medium">{comment.commenterId?.name}</div>
                    </div>
                    <div className="text-sm font-medium">{comment.content}</div>
                  </div>
                </div>
              
                {/* 답글 */}
                <div className="flex items-center w-full py-0 justify-between">
                  <div className="flex items-center gap-3">
                    {/* 답글 리스트 (답글이 있을 시만 렌더링) */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="self-stretch ps-4 flex items-center gap-3">
                        <div className="w-4 flex-shrink-0 flex justify-start items-start pt-[2px]">
                          {/* <img src={Brenchsvg} className="w-4" /> */}
                        </div>

                        <div>
                          {/* 답글 개수 표시 버튼 */}
                          <button
                            onClick={() => toggleReplies(comment._id)}
                            className="bg-[#F3F5F8] py-0 px-0 text-xs text-[#949BAD] font-medium flex items-center"
                          >
                            답글 {comment.replies.length} 개
                            <img src={openReplies[comment._id] ? Up : Down} className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 답글 작성 버튼 */}
                  {!comment.parentId && (
                    <button 
                      onClick={() => setReplyTo(comment)}
                      className="ps-2 py-0 rounded bg-[#f3f5f8] text-[#949bad] text-xs font-medium flex-shrink-0"
                    >
                      답글 작성
                    </button>
                  )}
                </div>

                {/* 답글 리스트 */}
                {openReplies[comment._id] && comment.replies && (
                  <div className="flex flex-col justify-start items-start gap-4 mt-2 ps-4">
                    {comment.replies.map((reply) => (
                      <div key={reply._id} className="w-[430px] flex flex-col">
                        <div className="flex items-center gap-3">
                          <img className="w-8 h-8 rounded-full" src={Profile} alt="프로필" />
                          <div className="flex-1 flex flex-col">
                            <div className="flex items-center gap-1">
                              <div className="w-full text-xs font-medium">{reply.commenterId.name}</div>
                            </div>
                            <div className="text-sm font-medium">{reply.content}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))
          ) : (
            <div className="text-sm text-gray-400 px-4 py-2">등록된 코멘트가 없습니다.</div>
          )}

          {/* 코멘트 입력 */}
        <form
          onSubmit={handleSubmit}
          className="w-[544px] h-60 pl-8 pr-12 py-8 bg-[#f3f5f8] text-[#949bad] border-t-2 border-[#e5eaf2] flex-col justify-start items-end gap-6 inline-flex"
        >
          {/* 답글 입력시 선택한 댓글 표시 */}
          {replyTo && (
              <div className="px-5 py-4 bg-[#e5eaf2] rounded-lg self-stretch inline-flex justify-start items-center gap-3">
                <img className="w-8 h-8 rounded-full" src={Profile} alt="프로필" />
                <div className="text-[#4f5462] flex-1 flex flex-col">
                  <div className="flex items-center gap-1">
                    <div className="w-full text-xs font-medium">{replyTo.commenterId?.name}</div>
                  </div>
                  <div className="text-sm font-medium">{replyTo.content}</div>
                </div>
            </div>
          )}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="코멘트를 입력해 주세요."
            className="w-[464px] h-[104px] bg-transparent text-[#4f5462] text-base font-semibold leading-normal resize-none outline-none"
          />
          <div className="flex items-center gap-3">
            {replyTo && (
              <button
              onClick={() => setReplyTo(null)}
              type ="button"
              className="px-4 py-1 bg-[#e5eaf2] rounded-lg text-[#949bad] text-sm font-semibold"
              >
                취소
              </button>
            )}
            <button
              type="submit"
              disabled={createComment.isLoading}
              className="px-4 py-1 bg-[#ff432b] rounded-lg text-[#fcfcff] text-sm font-semibold"
            >
              등록
            </button>
          </div>
        </form>
        </div>
      )}

    </div>
  );
};

export default TaskComment;
