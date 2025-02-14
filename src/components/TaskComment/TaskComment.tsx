import React from 'react';
import Header from '../TaskHeader'
import Sidebar from '../TaskSidebar';
import TaskTitle from '../TaskTitle';
import Search from '../Search';
import TaskDivider from '../TaskDivider';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

const TaskComment: React.FC = () => {
  const handleCommentSearch = (term: string) => {
    console.log(term);
  };
  
  return (
    <div>
      <h4 className="absolute h-[28px] left-[128px] top-[174px] text-[#4f5462] text-xl font-semibold leading-7">
        코멘트
      </h4>
      <Search 
        className="left-[432px]"
        placeholder="코멘트 검색"
        onSearch={handleCommentSearch}
      />
      {/* 코멘트 내용 */}
      <CommentList />
      {/* 코멘트 입력 */}
      <CommentInput />
    </div>
  );
};

export default TaskComment;
