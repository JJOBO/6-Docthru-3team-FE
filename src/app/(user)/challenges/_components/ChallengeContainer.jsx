import React from "react";
import Image from "next/image";
import clock from "@/assets/icon/ic_clock.svg";
import callengers from "@/assets/icon/ic_person.svg";

//type은 "slim", "" 사용 가능
export default function ChallengeContainer({ height, type, deadline, currentCount, maxCount, originalUrl }) {
  return (
    <div
      className={`${height} flex items-center rounded-2xl bg-white border border-gray-100 font-[var(--font-pretendard)]`}
    >
      <div
        className={`flex w-full flex-col items-center gap-[16px] px-[16px] ${type === "slim" ? "py-[12px]" : "py-[24px]"}`}
      >
        <div className="flex h-[24px] flex-row items-center justify-center gap-[4px] text-[13px]">
          <Image src={clock} alt="시계모양 이모지" />
          {deadline} 마감
          <Image src={callengers} alt="사람들 이모지" />
          {currentCount}/{maxCount}
        </div>

        <div className={`flex ${type === "slim" ? "flex-row" : "h-[88px] flex-col"} w-full gap-[8px]`}>
          <a
            href={originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[40px] flex-1 items-center justify-center rounded-xl border-2 bg-[var(--color-brand-yellow)] text-[14px] font-bold"
          >
            원문 보기
          </a>
          <button className="flex h-[40px] flex-1 items-center justify-center rounded-xl border-2 border-black bg-[var(--color-gray-800)] text-[14px] font-bold text-[#FFFFFF]">
            작업 도전하기
          </button>
        </div>
      </div>
    </div>
  );
}
