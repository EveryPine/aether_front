import React, {useState} from 'react';
import Search from '../Search';
import useComment from "../../hooks/useComment";
import Profile from '../../assets/Profile-small.svg'

interface TaskCommentProps {
  taskId: string;
  userId: string;
}

const TaskComment: React.FC<TaskCommentProps> = ({ taskId, userId }) => {
  const { comments, isLoading, isError, createComment } = useComment(taskId);
  const [content, setContent] = useState("");

  //코멘트 검색
  const handleCommentSearch = (term: string) => {
    console.log(term);
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
      console.error(error);
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
      
      {/* 코멘트 리스트 */}
      {!isLoading && !isError && comments && (
        <div className="absolute w-[464px] h-auto overflow-y-auto max-h-[500px] left-[128px] top-[230px] flex flex-col gap-5">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="self-stretch px-5 py-4 bg-[#f3f5f8] rounded-lg border border-[#e5eaf2] flex-col justify-start items-start gap-1 inline-flex"
            >
              <div className="justify-start items-center gap-3 inline-flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className="w-3 h-3 justify-start items-center gap-2.5 flex">
                    <img src={Profile} className="grow shrink basis-0 self-stretch rounded-full" />
                  </div>
                  <div className="text-[#4f5462] text-xs font-medium leading-none">
                    {comment.commenterId}
                  </div>
                </div>
              </div>
              <div className="text-[#4f5462] text-sm font-medium leading-relaxed">{comment.content}</div>
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
