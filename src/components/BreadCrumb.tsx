import React from "react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbProps {
  label: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ label }) => {
  const navigate = useNavigate();

  const crumbs = label.split(" > ");
  const lastCrumb = crumbs[crumbs.length - 1];

  return (
    <div className="flex items-center justify-between px-12 py-4 text-[12px] text-[#4F5462] bg-white font-medium">
      <div className="flex gap-1">
        {crumbs.map((crumb, index) => (
          <span key={index} className="flex items-center gap-1">
            <span
              onClick={() => {
                if (crumb === lastCrumb) navigate("/teamspace");
              }}
              className={`${
                crumb === lastCrumb
                  ? "hover:underline cursor-pointer hover:text-[#FF432B]"
                  : ""
              } transition-all duration-150`}
            >
              {crumb}
            </span>
            {index < crumbs.length - 1 && <span className="text-[#949BAD]">{">"}</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
