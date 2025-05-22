import { Dispatch, SetStateAction, useState } from "react";

interface Notice {
  id: string;
  type: string;
  body: string;
  date?: string;
}

interface Memo {
  text: string;
  date: string;
}

interface MemoCardProps {
  setNotices: Dispatch<SetStateAction<Notice[]>>;
  notices: Notice[];
}

const MemoCard = ({ setNotices, notices }: MemoCardProps) => {
  const [isNotice, setIsNotice] = useState(false);

  const [memos, setMemos] = useState<Memo[]>([
    { text: "Lorem ipsum dolor sit amet consectetur...", date: "01월 30일" },
    { text: "Diam cursus nisi est massa risus lectus.", date: "01월 30일" },
  ]);

  const [inputText, setInputText] = useState("");

  const handleAddItem = () => {
    if (inputText.trim() === "") return;

    const today = new Date();
    const date = today
      .toLocaleDateString("ko-KR", {
        month: "2-digit",
        day: "2-digit",
      })
      .replace(".", "월")
      .replace(".", "일")
      .replace(" ", "");

    if (isNotice) {
      const newNotice: Notice = {
        id: Date.now().toString(),
        type: "사내공지",
        body: inputText,
        date,
      };
      setNotices((prev) => [...prev, newNotice]);
    } else {
      const newMemo: Memo = { text: inputText, date };
      setMemos((prev) => [...prev, newMemo]);
    }

    setInputText("");
  };

  return (
    <div className="flex flex-col justify-between items-start h-[722px] min-w-[394px] max-w-[402px] p-[20px_16px] rounded-lg shadow bg-white">
      {/* 스위치 & 헤더 */}
      <div className="flex items-center gap-2 mb-4">
        <label className="relative inline-flex items-center w-[42px] h-[24px] cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isNotice}
            onChange={() => setIsNotice(!isNotice)}
          />
          <div
            className={`w-full h-full rounded-full transition-colors duration-300 ${
              isNotice ? "bg-[#FFE5E0]" : "bg-[#E5EAF2]"
            }`}
          />
          <div
            className={`absolute top-1 left-1 w-[16px] h-[16px] rounded-full transition-all duration-300 ${
              isNotice ? "bg-[#FF432B] translate-x-[18px]" : "bg-[#949BAD] translate-x-0"
            }`}
          />
        </label>

        <h2
          className={`text-[20px] font-semibold transition-colors duration-300 ${
            isNotice ? "text-[#FF432B]" : "text-gray-800"
          }`}
        >
          {isNotice ? "공지" : "메모"}
        </h2>
      </div>

      {/* 메모 or 공지 리스트 */}
      <div className="flex flex-col gap-3 w-full overflow-auto">
        {isNotice
          ? notices.map((item, idx) => (
              <div key={idx} className="bg-[#F3F5F8] rounded p-4 text-sm relative">
                <p>{item.body}</p>
                <p className="text-xs text-right mt-2 text-gray-500">
                  {item.date ?? ""}
                </p>
              </div>
            ))
          : memos.map((item, idx) => (
              <div key={idx} className="bg-[#F3F5F8] rounded p-4 text-sm relative">
                <p>{item.text}</p>
                <p className="text-xs text-right mt-2 text-gray-500">{item.date}</p>
              </div>
            ))}
      </div>

      {/* 입력창 + 추가 버튼 */}
      <div className="w-full mt-auto">
        <div className="bg-[#F3F5F8] rounded p-3 relative h-32">
          <textarea
            placeholder={isNotice ? "공지를 작성해 주세요." : "메모를 입력해 주세요."}
            className="w-full h-full resize-none bg-transparent text-sm text-gray-700 focus:outline-none"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            onClick={handleAddItem}
            className="absolute bottom-3 right-3 bg-[#FF432B] text-white px-3 py-1 rounded text-sm"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoCard;
