import React, {useState, useEffect,DragEvent} from 'react';
import Search from '../Search';
import { Document, useDocuments, useUploadDocument, useDownloadDocument } from "../../hooks/useDocument";
import Profile from '../../assets/Profile-small.svg';
import Download from '../../assets/Download.svg';
import DownloadActive from '../../assets/DownloadActive.svg';
import Cloud from '../../assets/Cloud.svg';
import CloudActive from '../../assets/Cloud-Active.svg';
import DefaultDocument from '../../assets/Doc-default.svg';
import Docx from '../../assets/Doc-docx.svg';
import Hwpx from '../../assets/Doc-hwpx.svg';
import Pdf from '../../assets/Doc-pdf.svg';
import Pptx from '../../assets/Doc-pptx.svg';
import Xlsx from '../../assets/Doc-xlsx.svg';
import {fetchUserInfo} from '../../api/userApi';
import Trash from '../../assets/Trash2.svg';
import TrashActive from '../../assets/Trash2-active.svg';
import Alert from '../Alert';

const TaskDocument: React.FC<{ tid: string }> = ({ tid }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false); // 문서 업로드 시 return
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // 선택한 파일 상태
  const [hoveredTrashIndex, setHoveredTrashIndex] = useState<number | null>(null);
  const [alertInfo, setAlertInfo] = useState<{ title: string; message: string } | null>(null);
  const [userName, setUserName] = useState(""); // 업로더 이름

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchKeyword]);

  const { data: documents = [] } = useDocuments(tid, debouncedKeyword); // 문서 조회
  const uploadMutation = useUploadDocument(tid); // 문서 업로드
  const downloadMutation = useDownloadDocument(); // 문서 다운로드

  // 파일 확장자 파싱
  const getFileExtension = (filename: string): string => {
    const lastDotIndex = filename.lastIndexOf('.');
    return lastDotIndex !== -1 ? filename.slice(lastDotIndex + 1).toLowerCase() : '';
  };

  // 확장자 값으로 아이콘 매핑
  const getIconByExtension = (ext: string): string => {
    switch (ext) {
      case 'docx':
        return Docx;
      case 'hwpx':
        return Hwpx;
      case 'pdf':
        return Pdf;
      case 'pptx':
        return Pptx;
      case 'xlsx':
        return Xlsx;
      default:
        return DefaultDocument;
    }
  };

  // const handleCommentSearch = (term: string) => {
  //   setSearchKeyword(term);
  // };

  // 파일 선택 시 상태에 저장
  const handleFileUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const fileArray  = Array.from(files);
      
      // 기존 파일 + 새로 올린 파일 합친 개수 확인
      const totalFiles = [...selectedFiles, ...fileArray];
      if (totalFiles.length > 5) {
        setAlertInfo({
          title: "이런! 파일 개수가 너무 많아요.",
          message: "최대 5개의 파일만 업로드 할 수 있어요.",
        });
        return;
      }

      const isTooLarge = totalFiles.some(file => file.size > 20 * 1024 * 1024);
      if (isTooLarge) {
        setAlertInfo({
          title: "이런! 파일이 너무 커요.",
          message: "최대 20MB의 파일만 업로드 할 수 있어요.",
        });
        return;
      }
      
      // 검사 후 파일 추가
      setSelectedFiles(totalFiles);
    }
  };

  // 파일 배열에서 파일 삭제
  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // 파일 업로드 API 호출
  const handleUpload = () => {
    selectedFiles.forEach((file) => {
      uploadMutation.mutate(file, {
        onSuccess: () => {
          setSelectedFiles([]); // 다 끝나고 초기화
          setIsUploading(false);
        },
      });
    });
  };

  //  파일 드래그 앤 드롭
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleFileUpload(event.dataTransfer.files);
  };

  // 드래그된 파일이 위에 올라왔을 때 기본 동작 방지
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // 업로드하는 사용자 이름 가져옴
  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await fetchUserInfo();
      setUserName(userInfo.name);
    };
    getUserInfo();
  }, []);

  return (
    <div>
      <h4 className="absolute h-[28px] left-[128px] top-[174px] text-[#4f5462] text-xl font-semibold leading-7">
        문서
      </h4>
      {isUploading && (
        <div className="absolute w-[310px] left-[128px] top-[210px] justify-center text-[#949bad] text-xs font-medium leading-none">
          pdf, docx, pptx, xlsx, hwp 개당 20MB, 최대 5개 업로드 가능
        </div>
      )}

       {/* 업로드 화면 */}
      {isUploading ? (
        <div className="absolute w-[464px] h-auto left-[128px] top-[230px] flex flex-col py-5 gap-5">
          {/* 파일 업로드 */}
          <div
            className={`py-[60px] bg-[#f3f5f8] rounded-lg outline outline-2 outline-offset-[-2px] 
            ${hovered ? "outline-[#FF432B] shadow-[0px_0px_28px_0px_rgba(79,84,98,0.12)]" : "outline-[#e5eaf2]"} 
            inline-flex flex-col justify-start items-center gap-4 transition-colors`}
            onMouseEnter={() => setHovered("hovered")}
            onMouseLeave={() => setHovered(null)}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col justify-start items-center gap-2">
              <div className="w-9 h-9 relative overflow-hidden">
                <img src={hovered ? CloudActive : Cloud} alt="upload icon" />
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
            <label
              htmlFor="fileUpload"
              className="px-4 py-1 rounded-lg inline-flex justify-center items-center gap-1 bg-[#ff432b] transition-transform duration-200 cursor-pointer"
            >
              <div className="justify-start text-[#fcfcff] text-sm font-semibold leading-normal">파일 선택</div>
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </label>
          </div>
          {/* 업로드한 파일 프리뷰 */}
          {selectedFiles.map((file, index) => (
          <div
            key={index}
            className="self-stretch px-5 py-4 bg-[#f3f5f8] rounded-lg border border-[#e5eaf2] flex flex-col gap-1"
          >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <img className="w-3 h-3 rounded-full" src={Profile} alt="profile" />
                  <div className="text-[#4f5462] text-xs font-medium">{userName}</div>
                </div>
                <div className="text-[#949bad] text-xs font-medium">
                  {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace(/\.$/, '')}
                </div>
              </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-[#4f5462] text-sm font-semibold flex items-center">
                  <span className="flex items-center gap-2">
                    <img className="w-4" src={getIconByExtension(getFileExtension(file.name))} alt="document icon" />
                    {file.name}
                  </span>
                  </div>
                <div className="flex items-center gap-3 ">
                  <div className="text-[#949bad] text-xs font-medium">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                  <img
                    // ${hoveredTrashIndex === index ? 'bg-[#ffe4e0] rounded-lg' : ''}`
                    className="cursor-pointer"
                    src={hoveredTrashIndex === index ? TrashActive : Trash}
                    onMouseEnter={() => setHoveredTrashIndex(index)}
                    onMouseLeave={() => setHoveredTrashIndex(null)}
                    onClick={() => handleRemoveFile(index)}
                  />
                </div>
              </div>
          </div>
          ))}

          {/* 취소, 업로드 버튼 */}
          <div className="ml-[320px] inline-flex justify-start items-start gap-2.5">
            <button 
              className="px-4 py-1 bg-[#e5eaf2] rounded flex justify-center items-center gap-1"
              onClick={() => {
                setIsUploading(false)
                setSelectedFiles([]);
              }}
            >
              <div className="justify-start text-[#949bad] text-sm font-semibold leading-normal">취소</div>
            </button>
            <button 
              className="px-4 py-1 bg-[#ff432b] rounded flex justify-center items-center gap-1"
              onClick={handleUpload}
            >
              <div className="justify-start text-[#fcfcff] text-sm font-semibold leading-normal">업로드</div>
            </button>
          </div>
        </div>
      ) : (
        // 기본 화면
        <>
        {/* 문서 검색 */}
        <Search className="left-[333px]" placeholder="문서 검색" onSearch={setSearchKeyword} />

        {/* 문서 업로드 버튼 (업로드 화면으로 전환) */}
        <button
          className="absolute left-[505px] top-[174px] w-[89px] h-8 px-3 py-1 border-none bg-[#ff432b] rounded-lg text-[#fcfcff] text-sm font-semibold leading-normal"
          onClick={() => setIsUploading(true)}
        >
          문서 업로드
        </button>

        {/* 문서 리스트 */}
        <div className="absolute w-[464px] h-auto left-[128px] top-[230px] flex flex-col gap-5">
          {documents.map((doc: Document) => (
            <div
              key={doc._id}
              className="self-stretch px-5 py-4 bg-[#f3f5f8] rounded-lg border border-[#e5eaf2] flex flex-col gap-1"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <img className="w-3 h-3 rounded-full" src={Profile} alt="profile" />
                  <div className="text-[#4f5462] text-xs font-medium">{doc.metadata.taskId}</div>
                </div>
                <div className="text-[#949bad] text-xs font-medium">
                  {new Date(doc.uploadDate).toLocaleDateString().replace(/\. /g, '-').replace(/\.$/, '')}
                </div>
              </div>
              <div className="flex justify-between items-end">
              <div className="flex items-center gap-2 text-[#4f5462] text-sm font-semibold flex items-center">
              <span className="flex items-center gap-2" key={doc._id}>
                <img className="w-4" src={getIconByExtension(getFileExtension(doc.filename))} alt="document icon" />
                {doc.filename}
              </span>
              </div>
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
      </>
      )}

      {alertInfo && (
        <Alert
          title={alertInfo.title}
          message={alertInfo.message}
          onClose={() => setAlertInfo(null)}
        />
      )}
    </div>
  );
};

export default TaskDocument;
