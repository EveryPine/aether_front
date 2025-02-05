import React from 'react';
import Header from '../components/TaskHeader'
import Sidebar from '../components/TaskSidebar';
import TaskTitle from '../components/TaskTitle';
import Search from '../components/Search';
import TaskDivider from '../components/TaskDivider';
import CommentList from '../components/TaskComment/CommentList';
import CommentInput from '../components/TaskComment/CommentInput';

const TaskComment: React.FC = () => {
  const handleCommentSearch = (term: string) => {
    console.log(term);
  };

  return (
    <div className="w-[640px] h-[972px] relative bg-[#F8F9FC] rounded-tl-lg shadow-[inset_0px_0px_8px_0px_rgba(26,26,35,0.12)]  overflow-hidden">
      <Header />
      <div>
        <Sidebar />
        <main>  
          {/* 업무 이름 */}
          <TaskTitle />
          <h4 className="absolute h-[28px] left-[128px] top-[174px] text-[#4f5462] text-xl font-semibold leading-7">
                코멘트
          </h4>
          {/* 서치 탭 */}
          <Search 
            className="left-[432px]"
            placeholder="코멘트 검색"
            onSearch={handleCommentSearch}
          />
          <TaskDivider />
          {/* 코멘트 내용 */}
          <CommentList />
          {/* 코멘트 입력 */}
          <CommentInput />
        </main>
      </div>
    </div>
  );
};

export default TaskComment;
