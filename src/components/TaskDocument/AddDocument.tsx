import React, {useState, useEffect} from 'react';
import Search from '../Search';
import { Document, useDocuments, useUploadDocument, useDownloadDocument } from "../../hooks/useDocument";
import Profile from '../../assets/Profile-small.svg'
import Download from '../../assets/Download.svg'
import DownloadActive from '../../assets/DownloadActive.svg'
import Cloud from '../../assets/Cloud.svg'
import CloudAcive from '../../assets/Cloud-Active.svg'

const AddDocument: React.FC<{ tid: string }> = ({ tid }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchKeyword]);

  const { data: documents = [] } = useDocuments(tid, debouncedKeyword); // 문서 조회
  const uploadMutation = useUploadDocument(tid); // 문서 업로드
  const downloadMutation = useDownloadDocument(); // 문서 다운로드
  const [hovered, setHovered] = useState<string | null>(null);

  const handleCommentSearch = (term: string) => {
    setSearchKeyword(term);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      uploadMutation.mutate(event.target.files[0]);
    }
  };

  return (
    <div>
      <h4 className="absolute h-[28px] left-[128px] top-[174px] text-[#4f5462] text-xl font-semibold leading-7">
        문서업로드
        <div className="justify-center w-[250px] text-[#949BAD] text-xs font-medium leading-none">pdf, docx, pptx, xlsx, hwp / 최대 5개 업로드 가능</div>
      </h4>

      
      <div className="absolute w-[464px] h-auto left-[128px] top-[230px] flex flex-col gap-5">
        {/* 문서 업로드 */}
        <div
          className={`py-[60px] bg-[#f3f5f8] rounded-lg outline outline-2 outline-offset-[-2px] 
          ${hovered ? "outline-[#FF432B] shadow-[0px_0px_28px_0px_rgba(79,84,98,0.12)]" : "outline-[#e5eaf2]"} 
          inline-flex flex-col justify-start items-center gap-4 transition-colors`}
          onMouseEnter={() => setHovered("hovered")}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex flex-col justify-start items-center gap-2">
            <div className="w-9 h-9 relative overflow-hidden">
              <img src={hovered ? CloudAcive : Cloud} alt="upload icon" />
            </div>
            <div className={`self-stretch justify-center text-base font-semibold leading-normal 
              ${hovered ? "text-[#FF432B]" : "text-[#4f5462]"} transition-colors`}>
              업로드할 문서 끌어다 놓기
            </div>
          </div>
          <div className={`justify-center text-xs font-medium leading-none 
            ${hovered ? "text-[#FF432B]" : "text-[#949bad]"} transition-colors`}>
            또는
          </div>
          <button
            className={`px-4 py-1 rounded-lg inline-flex justify-center items-center gap-1 
            bg-[#ff432b] transition-transform duration-200`}
          >
            <div className="justify-start text-[#fcfcff] text-sm font-semibold leading-normal">파일 선택</div>
          </button>
        </div>

        {/* 문서 리스트 */}
        {documents.map((doc : Document ) => (
          <div
            key={doc._id}
            className="self-stretch h-[76px] px-5 py-4 bg-[#f3f5f8] rounded-lg border border-[#e5eaf2] flex flex-col gap-1"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img className="w-3 h-3 rounded-full" src={Profile} alt="profile" />
                <div className="text-[#4f5462] text-xs font-medium">{doc.metadata.taskId}</div>
              </div>
              <div className="text-[#949bad] text-xs font-medium">
                {new Date(doc.uploadDate).toLocaleDateString()}
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-[#4f5462] text-sm font-semibold">{doc.filename}</div>
              <div className="flex items-center gap-1">
                <div className="text-[#949bad] text-xs font-medium">
                  {(doc.length / 1024 / 1024).toFixed(2)} MB
                </div>
                <div
                  className="w-6 h-6 p-1 rounded-lg flex items-center justify-center cursor-pointer"
                  onMouseEnter={() => setHovered(doc._id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => downloadMutation.mutate(doc._id)}
                >
                  <img src={hovered === doc._id ? DownloadActive : Download} alt="download" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddDocument;
