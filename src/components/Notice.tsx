import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import icon from "../assets/Megaphone.svg";

interface Notice {
  id: string;
  type: string;
  body: string;
}

const Notice = ({ notices }: { notices: Notice[] }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % notices.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [notices]);

  if (!notices || notices.length === 0) return null;

  const currentNotice = notices[currentIdx];

  return (
    <div className="w-[1244px] h-[136px] rounded-[8px] bg-[#FCFCFF] px-[16px] py-[20px] mx-auto shadow-[0px_0px_28px_0px_rgba(79,84,98,0.12)] my-[32px]">
        <p className="text-gray-700 font-semibold text-[16px] mb-[12px]">공지</p>

        <div className="relative h-[60px] w-[1182px] overflow-hidden rounded border border-[#E5EAF2] bg-[#F5F7FA] px-4 py-[2px] flex items-center">
            <AnimatePresence mode="wait">
                <motion.div
                key={currentNotice.id}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -28, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative flex items-center gap-3"
                >
                <span className="text-white bg-[#FF432B] text-[14px] font-light rounded px-2 py-[2px]">
                    NEW
                </span>

                <span className="flex items-center gap-1 text-[#FF432B] text-[14px] font-light bg-[#FFE5E0] px-2 py-[2px] rounded">
                    <img src={icon} className="w-[14px] h-[14px]" alt="icon" />
                    사내공지
                </span>

                <span className="text-[#4F5462] text-[20px] font-regular">{currentNotice.body}</span>
                </motion.div>
            </AnimatePresence>
        </div>
    </div>
  );
};

export default Notice;
