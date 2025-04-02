// src/components/Dashboard/MemoCard.tsx
import { useState } from "react";
import Card from "../Card";

const MemoCard = () => {
  const [memos, setMemos] = useState<string[]>([
    "Lorem ipsum dolor sit amet consectetur.",
    "Diam cursus nisi est massa risus lectus."
  ]);
  const [input, setInput] = useState("");

  const handleAddMemo = () => {
    if (input.trim() === "") return;
    setMemos([...memos, input]);
    setInput("");
  };

  return (
    <Card title="메모">
      {memos.map((memo, index) => (
        <div key={index} className="bg-white border p-2 rounded mb-2 text-sm text-gray-700">{memo}</div>
      ))}
      <div className="mt-2">
        <input
          className="w-full border rounded p-2 text-sm"
          placeholder="메모를 입력해 주세요."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="mt-1 px-3 py-1 bg-red-500 text-white text-sm rounded" onClick={handleAddMemo}>
          추가
        </button>
      </div>
    </Card>
  );
};

export default MemoCard;
