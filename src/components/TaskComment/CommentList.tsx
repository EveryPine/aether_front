import React, {useState} from 'react';
import Profile from '../../assets/Profile-small.svg'

const CommentList: React.FC = () => {
  const [commets, setComments] = useState([
    {
      id: 1,
      name: "최기수",
      timeAgo: "3시간 전",
      content: "ABCD하고 ABCD 하도록 합시다.",
    },
    {
      id: 2,
      name: "최기수",
      timeAgo: "3시간 전",
      content: "ABCD하고 ABCD 하도록 합시다.",
    },
  ])

  return(
    <div className="absolute w-[464px] h-auto overflow-y-auto max-h-[500px] left-[128px] top-[230px] flex flex-col gap-5">
      {commets.map((comment) => (
        <div key={comment.id} className="self-stretch px-5 py-4 bg-[#f3f5f8] rounded-lg border border-[#e5eaf2] flex-col justify-start items-start gap-1 inline-flex">
        <div className="justify-start items-center gap-3 inline-flex">
          <div className="justify-start items-center gap-2 flex">
            <div className="w-3 h-3 justify-start items-center gap-2.5 flex">
              <img
                src={Profile}
                className="grow shrink basis-0 self-stretch rounded-full" 
              />
            </div>
            <div className="text-[#4f5462] text-xs font-medium leading-none">{comment.name}</div>
          </div> 
          <div className="justify-start items-center gap-2 flex">
            <div className="text-[#949bad] text-xs font-medium leading-none">{comment.timeAgo}</div>
          </div>
        </div>
        <div className="text-[#4f5462] text-sm font-medium leading-relaxed">{comment.content}</div>
      </div>
      ))}
    </div>
  );
};

export default CommentList;
