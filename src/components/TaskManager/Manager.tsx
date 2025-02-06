import React, {useState} from 'react'
import Profile from '../../assets/Profile-small.svg'

const Manager = () => {
  const [manager, setManager] = useState({
    name: "최기수",
    position: "팀장",
  })

  return (
    <div className="absolute left-[128px] top-[226px] w-[464px] h-20 px-5 py-4 bg-[#f3f5f8] rounded-lg border border-[#e5eaf2] justify-start items-center gap-5 inline-flex">
      <div className="w-12 h-12 justify-start items-center gap-2.5 flex">
          <img className="w-12 h-12 rounded-full" src={Profile} />
      </div>
      <div className="h-12 flex-col justify-between items-start inline-flex">
        <div className="text-[#4f5462] text-base font-semibold leading-normal">{manager.name}</div>
        <div className="self-stretch text-[#ff432b] text-sm font-medium leading-normal">{manager.position}</div>
      </div>
    </div>
  )
}

export default Manager
