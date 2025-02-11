import React, {useState} from 'react'
import TaskTitle from '../components/TaskTitle'
import Sidebar from '../components/TaskSidebar'
import Header from '../components/TaskHeader'
import TaskDivider from '../components/TaskDivider'
import Manager from '../components/TaskManager/Manager'

interface TaskManagerProps {
  mode: 'add' | 'setting';  // 'add'는 업무 생성, 'setting'은 업무 설정
}

const TaskManager: React.FC<TaskManagerProps> = ({ mode }) => {
  const [title, setTitle] = useState(mode === 'add' ? '' : 'ABC 업무');
  return (
    <div className="w-[640px] h-[972px] relative bg-[#F8F9FC] rounded-tl-lg shadow-[inset_0px_0px_8px_0px_rgba(26,26,35,0.12)]  overflow-hidden">
      <Header />
      <div>
        <Sidebar visibleItems = {mode === 'add' ? ['info', 'user'] : ['info', 'chat', 'docu', 'user']}/>
        <main>  
          {/* 업무 이름 */}
          <TaskTitle isEditable= {mode === 'add'} title={title} setTitle={mode === 'add' ? setTitle : undefined}/>
          <h4 className="absolute h-[28px] left-[128px] top-[174px] text-[#4f5462] text-xl font-semibold leading-7">
            담당자
          </h4>
          <TaskDivider top={mode === 'add' ? '152px' : '136px'} />
          <Manager />
        </main>
      </div>
    </div>
  )
}

export default TaskManager
