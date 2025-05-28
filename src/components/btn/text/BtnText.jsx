"use client";

import React from "react";
import Image from "next/image";
import iconWithDraw from "@/assets/icon/ic_withdraw.svg";
import iconLink from "@/assets/icon/ic_arrow_right_up.svg";
import goToMyWork from "@/assets/icon/ic_arrow_right.svg";
import continueChallenge from "@/assets/icon/ic_document.svg";

const themes = {
  tonal: "bg-[#FFE7E7] text-[#fe4744]",
  solidblack: "bg-[var(--color-brand-black)] text-white",
  solidwhite: "bg-gray-200 text-gray-500",
  outline: "border border-gray-800 bg-gray-50 text-gray-800",
  link: "bg-opacity-50 bg-[#F6F8FA] text-gray-700"
};

const iconMap = {
  goToMyWork: {
    src: goToMyWork,
    alt: "내 작업물 보기"
  },
  continueChallenge: {
    src: continueChallenge,
    alt: "도전 계속하기"
  }
};

export default function BtnText({ theme, icon, onClick, className = "", children }) {
  return (
    <button
      onClick={onClick}
      className={`box-border flex items-center justify-center gap-2 rounded-[10px] px-4 py-2 text-sm font-semibold sm:rounded-xl sm:text-base ${themes[theme]} ${className}`}
    >
      {/* 포기 버튼 */}
      {icon && theme === "tonal" ? (
        <>
          <span className="hidden sm:inline">포기</span>
          <Image src={iconWithDraw} alt="포기하기" className="h-4 w-4 sm:h-5 sm:w-5" />
        </>
      ) : (
        <>{children}</>
      )}

      {/* 링크 버튼 아이콘 */}
      {theme === "link" && <Image src={iconLink} alt="링크" className="h-4 w-4 sm:h-5 sm:w-5" />}
    </button>
  );
}

export function BtnRoundedWithIcon({ children, iconType = "continueChallenge" }) {
  return (
    <button className="box-border flex items-center justify-center gap-2 rounded-full border border-gray-800 bg-[var(--color-gray-50)] px-4 py-2 text-sm font-semibold">
      <span>{children}</span>
      <Image src={iconMap[iconType].src} alt={iconMap[iconType].alt} className="h-4 w-4 sm:h-5 sm:w-5" />
    </button>
  );
}
