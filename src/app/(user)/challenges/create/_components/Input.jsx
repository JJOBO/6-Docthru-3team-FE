"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import calender from "@/assets/icon/calendar_48px.svg";

//챌린지, 어드민 페이지에서 사용됨
function Input({ type, title, placeholder, onChange, value, height, deadline, setDeadline }) {
  const isHeight = Boolean(height);

  if (type === "date")
    return (
      <div className="flex w-full flex-col gap-[8px]">
        <label className="text-sm font-medium text-[var(--color-gray-900)]">마감일</label>
        <DatePicker
          selected={deadline}
          onChange={(date) => setDeadline(date)}
          dateFormat="yy/MM/dd"
          placeholderText="YYYY-MM-DD"
          className="h-[48px] w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
          calendarClassName="!z-50"
        />
        <div className="relative">
          <Image className="absolute right-[15px] bottom-[15px]" src={calender} alt="달력 아이콘" />
        </div>
      </div>
    );

  return (
    <div className="font-pretendard">
      <label className="block text-sm font-medium text-[var(--color-gray-900)]">{title}</label>
      {isHeight ? (
        <textarea
          className={`w-full ${height} resize-none rounded-xl border-[1px] border-[var(--color-gray-200)] pt-[12px] pl-[20px] placeholder-[var(--color-gray-400)]`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      ) : (
        <input
          className={`placeholder-border-[var(--color-gray-400)] mt-[8px] h-[48px] w-full rounded-xl border-[1px] border-[var(--color-gray-200)] pl-[20px]`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
}

export default Input;
