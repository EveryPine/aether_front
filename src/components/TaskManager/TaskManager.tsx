import React from 'react'
import Manager from './Manager'

const TaskManager: React.FC = () => {
  return (
    <div>
      <h4 className="absolute left-[128px] top-[174px] text-[#4f5462] text-xl font-semibold leading-7">
        담당자
      </h4>
      <Manager />
    </div>
  )
}

export default TaskManager
