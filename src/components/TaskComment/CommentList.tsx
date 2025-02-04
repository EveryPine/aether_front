import React from 'react';
import Profile from '../../assets/Profile-small.svg'

const Comment: React.FC = () => {
  return (
    <div className="absolute left-[128px] top-[230px] w-[464px] px-5 py-4 bg-[#f3f5f8] rounded-lg border border-[#e5eaf2] flex-col justify-start items-start gap-1 inline-flex">
    <div className="justify-start items-center gap-3 inline-flex">
        <div className="justify-start items-center gap-2 flex">
        <div className="w-3 h-3 justify-start items-center gap-2.5 flex">
            <img
              src={Profile}
              className="grow shrink basis-0 self-stretch rounded-full" 
            />
        </div>
        <div className="text-[#4f5462] text-xs font-medium leading-none">최기수</div>
        </div> 
        <div className="justify-start items-center gap-2 flex">
        <div className="text-[#949bad] text-xs font-medium leading-none">3시간 전</div>
        </div>
    </div>
    <div className="text-[#4f5462] text-sm font-medium leading-relaxed">ABCD하고 ABCD 하도록 합시다.</div>
    </div>
  );
};

export default Comment;
