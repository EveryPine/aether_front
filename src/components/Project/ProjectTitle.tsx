import React from 'react';
import { useFormContext } from "react-hook-form";

interface ProjecTitleProps {
  title: string;
  setTitle?: (newTitle: string) => void;
}

const ProejectTitle: React.FC<ProjecTitleProps> = ({ title, setTitle }) => {
  return (
    <div className= "w-[180px] px-4 py-2 bg-[#f3f5f8] rounded-lg shadow-[inset_0px_0px_4px_0px_rgba(26,26,35,0.12)] flex items-center gap-1">
        <input
            type="text"
            defaultValue={title}
            placeholder="Place Holder"
            onChange={(e) => setTitle?.(e.target.value)}
            className="w-full bg-transparent text-[#4f5462] text-2xl leading-9 tracking-[-0.025em] font-semibold"
        />
    </div>
  );
};

export default ProejectTitle; 