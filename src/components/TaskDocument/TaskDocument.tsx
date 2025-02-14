import React from 'react';
import Header from '../TaskHeader'
import Sidebar from '../TaskSidebar';
import TaskTitle from '../TaskTitle';
import TaskDivider from '../TaskDivider';
import DocumentList from './DocumentList';
import Search from '../Search';
import DocumentAdd from './DocumentAdd';

const TaskDocument: React.FC = () => {
  const handleDocumentsearch = (term: string) => {
    console.log(term);
  };

  return (
    <div>
      <h4 className="absolute h-[28px] left-[128px] top-[174px] text-[#4f5462] text-xl font-semibold leading-7">
        문서
      </h4>
      <Search
            className="left-[333px]"
            placeholder="문서 검색"
            onSearch={handleDocumentsearch}
      />
      <DocumentAdd />
      <TaskDivider />
      <DocumentList />
    </div>
  );
};

export default TaskDocument;
