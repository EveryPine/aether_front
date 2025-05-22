import {useState} from 'react';
import AlertIcon from '../assets/Alert-red.svg';
import Close from '../assets/Close.svg';
import CloseActive from '../assets/Close-Active.svg';

type AlertProps = {
  title: string;
  message: string;
  onClose: () => void;
};

export default function Alert({ title, message, onClose }: AlertProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-[480px] bg-[#fcfcff] rounded-xl overflow-hidden flex flex-col">
        <div className="w-full px-6 pt-6 flex gap-5 items-start">
          <div className="w-[52px] h-[52px] p-3 bg-[#ffe3e0] rounded-full flex justify-center items-center">
            <img src={AlertIcon} />
          </div>
          <div className="flex-1 flex flex-col justify-start">
            <div className="text-[#4f5462] text-xl font-semibold leading-7">{title}</div>
            <div className="text-[#949bad] text-sm font-semibold leading-normal">{message}</div>
          </div>
          <button
            onClick={onClose}
            onMouseEnter={() => setHovered('close')}
            onMouseLeave={() => setHovered(null)}
            className="p-1 rounded-lg flex justify-center items-center"
          >
            <img className="w-5 h-5" src={hovered? CloseActive : Close} />
          </button>
        </div>

        <div className="w-full pt-8 pl-[88px] pr-6 pb-6 flex justify-end items-center">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-[#ff432b] rounded shadow flex justify-center items-center text-[#fcfcff] text-base font-semibold leading-normal"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
