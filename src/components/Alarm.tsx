import React from 'react';
import Header from './TaskHeader';

interface Notification {
  project: string;
  task: string;
  date: string;
  message: string;
  category: string;
}

const dummyNotifications: Notification[] = [
  { project: 'ABCD 프로젝트', task: 'ABC 업무', date: '2025-02-03', message: '업무의 담당자가 되었습니다.', category: '오늘' },
  { project: 'ABCD 프로젝트', task: 'ABC 업무', date: '2025-02-03', message: '업무의 담당자가 되었습니다.', category: '오늘' },
  { project: 'ABCD 프로젝트', task: 'ABC 업무', date: '2025-02-03', message: '업무의 담당자가 되었습니다.', category: '오늘' },
  { project: 'ABCD 프로젝트', task: 'ABC 업무', date: '2025-02-03', message: '업무의 담당자가 되었습니다.', category: '어제' },
  { project: 'ABCD 프로젝트', task: 'ABC 업무', date: '2025-02-03', message: '업무의 담당자가 되었습니다.', category: '2일전' },
  { project: 'ABCD 프로젝트', task: 'ABC 업무', date: '2025-02-03', message: '업무의 담당자가 되었습니다.', category: '2일전' },
  { project: 'ABCD 프로젝트', task: 'ABC 업무', date: '2025-02-03', message: '업무의 담당자가 되었습니다.', category: '3일전' },
];

const Alarm: React.FC = () => {
  const grouped = dummyNotifications.reduce<Record<string, Notification[]>>((acc, cur) => {
    if (!acc[cur.category]) acc[cur.category] = [];
    acc[cur.category].push(cur);
    return acc;
  }, {});

  return (
    <div className="flex h-full bg-white pl-2 pt-[3rem]">
      <div
        className="w-full h-full relative bg-[#F8F9FC] rounded-tl-lg overflow-auto shadow-[inset_0px_0px_8px_rgba(26,26,35,0.12)]">
        <Header title="업무 생성" />

        <div className="p-[48px]">
          {Object.entries(grouped).map(([category, items], i) => (
            <div key={category} className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#4F5462] font-semibold text-base">{category}</h3>
                {i === 0 && (
                  <button className="text-sm text-[#949BAD] hover:underline">전체 읽음</button>
                )}
              </div>
              <div className="flex flex-col gap-3">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl px-6 py-4 shadow-sm border border-[#E5EAF2] text-sm"
                  >
                    <div className="flex justify-between mb-1">
                      <div className="text-[#FF432B] font-semibold">
                        {item.project} &nbsp;&gt;&nbsp;
                        <span className="text-[#4F5462] font-medium">{item.task}</span>
                      </div>
                      <div className="text-[#949BAD]">{item.date}</div>
                    </div>
                    <div className="text-[#4F5462]">{item.message}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alarm;