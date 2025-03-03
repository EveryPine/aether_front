import React, { useState, useMemo  } from 'react';
import Profile from '../../assets/Profile-small.svg';
import { useFormContext } from 'react-hook-form';
import { TaskInfoValues } from '../../hooks/useTask';
import { useUser, User } from '../../hooks/useUser';

const TaskManager: React.FC<{ setIsAddingManager: (isAdding: boolean) => void }> = ({ setIsAddingManager }) => {
  const { setValue, watch } = useFormContext<TaskInfoValues>(); 
  const assignedTo = watch("assignedTo") || []; // 담당자 목록
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const projectId = watch("project"); 
  const { data: members = [] } = useUser(projectId, search);

  // 검색어와 일치하는 사용자 필터링
  const filteredUsers = useMemo(() => {
    if (search.length === 0 || selectedUser) return [];
    return members.filter(user => user.name.includes(search));
  }, [search, members, selectedUser]);

  // 회원 id를 유저 정보로 변환
  const assignedUsers: User[] = useMemo(() => {
    return members.filter(user => assignedTo.includes(user._id));
  }, [members, assignedTo]);
  
  const handleSelectUser = (user: User) => {
    setSelectedUser(user); // 선택한 유저 저장
    setSearch(user.name); // input 태그에 선택한 유저 이름 입력
  };

  const handleAddUser = () => {
    if (selectedUser && !assignedTo.includes(selectedUser._id)) {
      setValue("assignedTo", [...assignedTo, selectedUser._id]); 
    }
    setSearch("");
    setSelectedUser(null);
    setIsAdding(false);
    setIsAddingManager(false);
  };

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
            {assignedUsers.length > 0 ? (
              assignedUsers.map((user:User) => (
                <div 
                  key={user._id} 
                  className="flex items-center gap-5 p-4 bg-[#f3f5f8] rounded-lg border border-[#e5eaf2] mb-2"
                >
                  <img className="w-12 h-12 rounded-full" src={Profile} />
                  <div className="flex flex-col">
                    <span className="text-[#4f5462] text-base font-semibold">{user.name}</span>
                    <span className="text-[#ff432b] text-sm font-medium">{user.email}</span>
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
          <div className="absolute left-[128px] top-[232px] w-[464px] h-8 px-3 py-1 bg-[#f3f5f8] rounded-lg flex items-center">
            {selectedUser ? (
              <div className="h-6 px-2 bg-[#ffe3e0] rounded shadow-[0px_0px_28px_0px_rgba(79,84,98,0.12)] flex items-center">
                <div className="text-[#ff432b] text-base font-semibold">{selectedUser.name}</div>
              </div>
            ) : (
              <input 
                className="w-full bg-transparent text-[#4f5462] text-base font-semibold outline-none"
                type="text"
                placeholder="담당자를 입력해 주세요."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}
          </div>

          {/* 검색된 사용자 목록 */}
          {filteredUsers.length > 0 && search.length > 0 && (
            <div className="absolute left-[128px] top-[288px] w-[464px] rounded-lg shadow-[inset_0px_0px_4px_0px_rgba(26,26,35,0.12)] bg-[#f3f5f8] px-5 py-4 overflow-hidden">
              {filteredUsers.map((user:User) => (
                <div 
                  key={user._id} 
                  className="flex items-center gap-5 cursor-pointer hover:bg-[#e5eaf2] p-2 rounded"
                  onClick={() => handleSelectUser(user)}
                >
                  <img className="w-12 h-12 rounded-full" src={Profile} />
                  <div className="flex flex-col justify-between h-12">
                    <div className="text-[#4f5462] text-base font-semibold leading-normal">{user.name}</div>
                    <div className="text-[#ff432b] text-sm font-medium leading-normal">{user.email}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
  
          <div className="absolute left-[460px] top-[705px] h-8 flex items-center gap-3">
            <button 
              className="px-4 py-1 bg-[#e5eaf2] rounded text-[#949bad] text-base font-semibold leading-normal"
              onClick={() => {
                setIsAdding(false);
                setIsAddingManager(false);
                setSearch("");
              }}>
              취소
            </button>
            <button 
              className="px-4 py-1 bg-[#ff432b] rounded text-[#fcfcff] text-base font-semibold leading-normal"
              onClick={handleAddUser}
              disabled={!selectedUser} // 선택된 유저가 없으면 비활성화
            >
              추가
            </button>
          </div>    
        </>
      )}
    </div>
  );
};

export default TaskManager;
