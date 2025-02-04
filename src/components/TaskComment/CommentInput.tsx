import React from 'react';

const CommentInput: React.FC = () => {
  return (
    <form className="absolute left-[96px] top-[732px] w-[544px] h-60 pl-8 pr-12 py-8 bg-[#f3f5f8] text-[#949bad] border-t-2 border-[#e5eaf2] flex-col justify-start items-end gap-6 inline-flex">
        <textarea
            placeholder="코멘트를 입력해 주세요."
            className="w-[464px] h-[104px] bg-transparent text-[#4f5462] text-base font-semibold leading-normal resize-none outline-none"
        />
        <button 
            type="submit" 
            className="px-4 py-1 bg-[#ff432b] rounded-lg text-[#fcfcff] text-sm font-semibold">
            등록
        </button>
    </form>
  );
};

export default CommentInput;
