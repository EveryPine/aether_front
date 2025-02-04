import React, {useState} from 'react';
import TaskSearch from "../../assets/TaskSearch.svg"
import SearchActive from "../../assets/TaskSearchActive.svg"

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="absolute w-40 h-8 left-[432px] top-[174px] pl-2 pr-3 py-1 bg-[#f3f5f8] rounded-lg shadow-[inset_0px_0px_4px_0px_rgba(26,26,35,0.12)] justify-start items-center gap-2 inline-flex">
        <img src={searchTerm.length > 0 ? SearchActive : TaskSearch} className="w-3 h-3" />
            <input
                type="text"
                placeholder="코멘트 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                className={`w-[120px] bg-transparent text-sm font-medium leading-normal outline-none placeholder-[#949bad] 
                  ${searchTerm.length > 0 ? "text-[#4f5462]" : "text-[#949bad]"}`}
        />
    </div>
  );
};

export default Search;