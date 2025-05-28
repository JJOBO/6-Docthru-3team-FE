import React from "react";
import { formatDate } from "@/lib/utils/formatDate";

export default function ListRow({ data, columnSetting, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-full flex min-w-[670px] min-h-12 bg-white border-b border-gray-300 hover:bg-[#f5f5f5] hover:cursor-pointer"
    >
      {columnSetting.map(({ key, className, flex, render }) => (
        <div
          key={key}
          style={{ flex }}
          className={`${className} flex text-left px-1 text-gray-500 text-[13px] font-normal items-center break-all whitespace-normal `}
        >
          {render ? render(data) : key === "createdAt" || key === "updatedAt" ? formatDate(data[key]) : data[key]}
        </div>
      ))}
    </div>
  );
}
