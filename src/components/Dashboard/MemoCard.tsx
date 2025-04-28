import { useState } from "react";

const MemoCard = () => {
  const [memos, setMemos] = useState([
    { text: "Lorem ipsum dolor sit amet consectetur...", date: "01월 30일" },
    { text: "Diam cursus nisi est massa risus lectus.", date: "01월 30일" }
  ]);
  const [newMemo, setNewMemo] = useState("");

  const handleAddMemo = () => {
    if (newMemo.trim() !== "") {
      const today = new Date();
      const date = today.toLocaleDateString("ko-KR", {
        month: "2-digit",
        day: "2-digit"
      }).replace(".", "월").replace(".", "일").replace(" ", "");

      setMemos([...memos, { text: newMemo, date }]);
      setNewMemo("");
    }
  };

  return (
    <div className="flex flex-col justify-between items-start h-[722px] min-w-[362px] max-w-[402px] p-[20px_16px] rounded-lg shadow bg-white">
      <h2 className="text-lg font-semibold mb-4">메모</h2>

      <div className="flex flex-col gap-3 w-full overflow-auto">
        {memos.map((memo, idx) => (
          <div key={idx} className="bg-[#F3F5F8] rounded p-4 text-sm relative">
            <p>{memo.text}</p>
            <p className="text-xs text-right mt-2 text-gray-500">{memo.date}</p>
          </div>
        ))}
      </div>

      <div className="w-full mt-auto">
        <textarea
          placeholder="메모를 입력해 주세요."
          className="w-full h-24 p-2 text-sm border rounded mb-2"
          value={newMemo}
          onChange={(e) => setNewMemo(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            onClick={handleAddMemo}
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
