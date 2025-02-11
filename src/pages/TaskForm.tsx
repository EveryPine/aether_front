import React, {useState} from 'react';
import Header from '../components/TaskHeader'
import Sidebar from '../components/TaskSidebar';
import TaskTitle from '../components/TaskTitle';
import TaskDivider from '../components/TaskDivider';
import TaskInfo from '../components/TaskForm/TaskInfo';

interface TaskFormProps {
  mode: 'add' | 'setting';  // 'add'는 업무 생성, 'setting'은 업무 설정
}

const TaskForm: React.FC<TaskFormProps> = ({ mode }) => {
  const [title, setTitle] = useState(mode === 'add' ? '' : 'ABC 업무');
  return (
    <div className="w-[640px] h-[972px] relative bg-[#F8F9FC] rounded-tl-lg shadow-[inset_0px_0px_8px_0px_rgba(26,26,35,0.12)]  overflow-hidden">
      <Header />
      <div>
        <Sidebar visibleItems = {mode === 'add' ? ['info', 'user'] : ['info', 'chat', 'docu', 'user']}/>
        <main>
          {/* 업무 이름 */}
            <TaskTitle isEditable= {mode === 'add'} title={title} setTitle={mode === 'add' ? setTitle : undefined} />
            <TaskDivider top={mode === 'add' ? '152px' : '136px'} />
          {/* 업무 정보 */}
            <TaskInfo/>
        </main>
      </div>
    </div>
  );
};

export default TaskForm;