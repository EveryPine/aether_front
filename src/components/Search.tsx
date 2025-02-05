import React, {useState} from 'react';
import TaskSearch from "../assets/TaskSearch.svg"
import SearchActive from "../assets/TaskSearchActive.svg"

interface SearchProps{
  className: string;
  placeholder: string;
  onSearch: (term: string) => void
}

const Search: React.FC<SearchProps> = ({ className, placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); 
  };

  return (
    <div className={`absolute w-40 h-8 ${className} top-[174px] pl-2 pr-3 py-1 bg-[#f3f5f8] rounded-lg shadow-[inset_0px_0px_4px_0px_rgba(26,26,35,0.12)] justify-start items-center gap-2 inline-flex`}>
      <img src={searchTerm.length > 0 ? SearchActive : TaskSearch} className="w-3 h-3" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearch}
          className={`w-[120px] bg-transparent text-sm font-medium leading-normal outline-none placeholder-[#949bad]
            ${searchTerm.length > 0 ? "text-[#4f5462]" : "text-[#949bad]"}`}
        />
    </div>
  );
};

export default Search;