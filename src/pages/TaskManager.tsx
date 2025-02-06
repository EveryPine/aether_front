import React from 'react'
import TaskTitle from '../components/TaskTitle'
import Sidebar from '../components/TaskSidebar'
import Header from '../components/TaskHeader'
import TaskDivider from '../components/TaskDivider'
import Manager from '../components/TaskManager/Manager'

const TaskManager = () => {
  return (
    <div className="w-[640px] h-[972px] relative bg-[#F8F9FC] rounded-tl-lg shadow-[inset_0px_0px_8px_0px_rgba(26,26,35,0.12)]  overflow-hidden">
      <Header />
      <div>
        <Sidebar />
        <main>  
          {/* 업무 이름 */}
          <TaskTitle />
          <h4 className="absolute h-[28px] left-[128px] top-[174px] text-[#4f5462] text-xl font-semibold leading-7">
            담당자
          </h4>
          <TaskDivider />
          <Manager />
        </main>
      </div>
    </div>
  )
}

export default TaskManager
