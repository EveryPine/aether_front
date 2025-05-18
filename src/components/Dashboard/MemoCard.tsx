import { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface Notice {
  id: string;
  type: string;
  body: string;
}

interface MemoCardProps {
  setNotices: Dispatch<SetStateAction<Notice[]>>;
}

const MemoCard = ({ setNotices }: MemoCardProps) => {
  const [isNotice, setIsNotice] = useState(false);

  const [memos, setMemos] = useState([
    { text: "Lorem ipsum dolor sit amet consectetur...", date: "01월 30일" },
    { text: "Diam cursus nisi est massa risus lectus.", date: "01월 30일" }
  ]);
  const [inputText, setInputText] = useState("");

  const handleAddItem = () => {
    if (inputText.trim() === "") return;

    const today = new Date();
    const date = today.toLocaleDateString("ko-KR", {
      month: "2-digit",
      day: "2-digit"
    }).replace(".", "월").replace(".", "일").replace(" ", "");

    const newItem = { text: inputText, date };

    if (isNotice) {
      const newNotice = {
        id: Date.now().toString(),
        type: "사내공지",
        body: inputText,
      };
      setNotices((prev: Notice[]) => [...prev, newNotice]);
    } else {
      setMemos(prev => [...prev, newItem]);
    }

    setInputText("");
  };

  return (
    <div className="flex flex-col justify-between items-start h-[722px] min-w-[362px] max-w-[402px] p-[20px_16px] rounded-lg shadow bg-white">
      <div className="flex items-center gap-2 mb-4">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={isNotice}
            onChange={() => setIsNotice(!isNotice)}
          />
          <div className={`w-11 h-6 bg-gray-300 rounded-full p-1 duration-300 ${isNotice ? 'bg-[#FF432B]' : ''}`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${isNotice ? 'translate-x-5' : ''}`}></div>
          </div>
        </label>
        <h2 className={`text-lg font-semibold ${isNotice ? 'text-[#FF432B]' : 'text-gray-800'}`}>
          {isNotice ? "공지" : "메모"}
        </h2>
      </div>

      <div className="flex flex-col gap-3 w-full overflow-auto">
        {(isNotice ? [] : memos).map((item, idx) => (
          <div key={idx} className="bg-[#F3F5F8] rounded p-4 text-sm relative">
            <p>{item.text}</p>
            <p className="text-xs text-right mt-2 text-gray-500">{item.date}</p>
          </div>
        ))}
      </div>

      <div className="w-full mt-auto">
        <textarea
          placeholder={isNotice ? "공지를 작성해 주세요." : "메모를 입력해 주세요."}
          className="w-full h-24 p-2 text-sm border rounded mb-2"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            onClick={handleAddItem}
            className="bg-[#FF432B] text-white px-3 py-1 rounded text-sm"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoCard;
