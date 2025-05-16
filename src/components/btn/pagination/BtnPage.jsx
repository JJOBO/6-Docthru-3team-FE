import React from "react";

// 사용법
// theme을 black, white로 설정 가능
const themes = {
  black: "text-[var(--color-brand-yellow)] bg-gray-800",
  white: "bg-gray-200 text-gray-400",
};

export default function BtnPage({ children, theme = "black" }) {
  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold sm:h-10 sm:w-10 ${themes[theme]}`}
    >
      {children}
    </div>
  );
}
