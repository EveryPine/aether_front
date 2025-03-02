import React, { useState } from 'react';
import Profile from '../../assets/Profile-small.svg';
import { useFormContext } from 'react-hook-form';
import { TaskInfoValues } from '../../hooks/useTask';

const TaskManager: React.FC<{ setIsAddingManager: (isAdding: boolean) => void }> = ({ setIsAddingManager }) => {
  const { watch } = useFormContext<TaskInfoValues>(); 
  const assignedTo = watch("assignedTo") || []; // 담당자 목록
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <div>
      {!isAdding ? (
        // 기본 화면
        <>
          <h4 className="absolute left-[128px] top-[174px] text-[#4f5462] text-xl font-semibold leading-7">
            담당자
          </h4>
          <button 
            className="absolute left-[506px] top-[174px] h-8 px-3 py-1 bg-[#ff432b] rounded justify-center items-center gap-1 inline-flex"
            onClick={() => {
              setIsAdding(true);
              setIsAddingManager(true);
            }}>
            <div className="text-[#fcfcff] text-sm font-semibold leading-normal">담당자 추가</div>
          </button>
          <div className="absolute left-[128px] top-[226px] w-[464px]">
            {assignedTo.length > 0 ? (
              assignedTo.map((id) => (
                <div 
                  key={id} 
                  className="flex items-center gap-5 p-4 bg-[#f3f5f8] rounded-lg border border-[#e5eaf2] mb-2"
                >
                  <img className="w-12 h-12 rounded-full" src={Profile} />
                  <div className="flex flex-col">
                    <span className="text-[#4f5462] text-base font-semibold">{id}</span>
                    <span className="text-[#ff432b] text-sm font-medium">{id}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[#949bad] text-sm">담당자가 없습니다.</p>
            )}
          </div>
        </>
      ) : (
        // 담당자 추가 시
        <>
          <div className="absolute left-[128px] top-[188px] h-7 justify-between items-center inline-flex">
            <div className="text-[#4f5462] text-xl font-semibold leading-7">담당자 추가</div>
          </div>
          <input 
            className="absolute left-[128px] top-[232px] w-[464px] h-8 px-3 py-1 bg-[#f3f5f8] text-[#4f5462] text-base font-semibold leading-normal rounded-lg outline-none shadow-[inset_0px_0px_4px_0px_rgba(26,26,35,0.12)]"
            type="text"
            placeholder="담당자를 입력해 주세요."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* 검색된 사용자 목록, 유저 api 개발 후 수정 */}
          {/* {filteredUsers.length > 0 && (
            <div className="absolute left-[128px] top-[288px] w-[464px] rounded-lg shadow-[inset_0px_0px_4px_0px_rgba(26,26,35,0.12)] bg-[#f3f5f8] px-5 py-4 overflow-hidden">
              {filteredUsers.map((id) => (
                <div 
                  key={id} 
                  className="flex items-center gap-5 cursor-pointer hover:bg-[#e5eaf2] p-2 rounded"
                  onClick={() =>}
                >
                  <img className="w-12 h-12 rounded-full" src={Profile} />
                  <div className="flex flex-col justify-between h-12">
                    <div className="text-[#4f5462] text-base font-semibold leading-normal">{id}</div>
                  </div>
                </div>
              ))}
            </div>
          )} */}

          <div className="absolute left-[460px] top-[705px] h-8 flex items-center gap-3">
            <button 
              className="px-4 py-1 bg-[#e5eaf2] rounded text-[#949bad] text-base font-semibold leading-normal"
              onClick={() => {
                setIsAdding(false);
                setIsAddingManager(false);
              }}>
              취소
            </button>
            <button 
              className="px-4 py-1 bg-[#ff432b] rounded text-[#fcfcff] text-base font-semibold leading-normal"
              onClick={() => {
                setIsAdding(false);
                setIsAddingManager(false);
              }}>
              추가
            </button>
          </div>    
        </>
      )}
    </div>
  );
};

export default TaskManager;
