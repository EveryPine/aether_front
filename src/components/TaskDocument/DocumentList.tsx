import React, {useState} from 'react';
import Profile from '../../assets/Profile-small.svg'
import Download from '../../assets/Download.svg'
import DownloadActive from '../../assets/DownloadActive.svg'

const DocumentList: React.FC = () => {
    const [documents, setDocuments] = useState([
        {
            id: 1,
            author: "최기수",
            date: "2025-02-03",
            title: "2025년 2월 1주차 위클리 회의록",
            size: "2.4 MB",
        },
        {
            id: 2,
            author: "최기수",
            date: "2025-02-03",
            title: "2025년 2월 1주차 위클리 회의록",
            size: "2.4 MB",
        }
    ]);

    const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="absolute w-[464px] h-auto left-[128px] top-[230px] flex flex-col gap-5">
      {documents.map((doc) => (
        <div key={doc.id} className="self-stretch h-[76px] px-5 py-4 bg-[#f3f5f8] rounded-lg border border-[#e5eaf2] flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img className="w-3 h-3 rounded-full" src={Profile} alt="profile" />
              <div className="text-[#4f5462] text-xs font-medium">{doc.author}</div>
            </div>
            <div className="text-[#949bad] text-xs font-medium">{doc.date}</div>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-[#4f5462] text-sm font-semibold">{doc.title}</div>
            <div className="flex items-center gap-1">
              <div className="text-[#949bad] text-xs font-medium">{doc.size}</div>
              <div
                className="w-6 h-6 p-1 rounded-lg flex items-center justify-center cursor-pointer"
                onMouseEnter={() => setHovered(doc.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <img
                  src={hovered === doc.id ? DownloadActive : Download}
                  alt="download"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;