import React from "react";
import Image from "next/image";
import iconWithDraw from "@/assets/icon/ic_withdraw.svg";
import iconLink from "@/assets/icon/ic_arrow_right_up.svg";
import goToMyWork from "@/assets/icon/ic_arrow_right.svg";
import continueChallenge from "@/assets/icon/ic_document.svg";

const themes = {
  tonal: "bg-[#FFE7E7] text-[#fe4744]  sm:h-10 md:h-12 gap-1",
  solidblack: "bg-[var(--color-brand-black)] text-white sm:h-10",
  solidwhite: "bg-gray-200 text-gray-500 sm:h-10",
  outline: " border border-gray-800 bg-white text-gray-800 font-lg sm:h-10",
  link: "bg-opacity-50 sm:h-10 bg-[#F6F8FA] text-gray-700",
};

// 사용법
export default function BtnText({ children, theme = "white", icon = "false" }) {
  return (
    <div
      className={`flex h-8 w-full items-center justify-center rounded-[10px] text-sm font-semibold sm:rounded-xl sm:text-base ${themes[theme]}`}
    >
      {icon === "true" && theme === "tonal" ? (
        <div className="hidden sm:inline">{children}</div>
      ) : (
        <div>{children}</div>
      )}

      {
        // icon이 true면서 theme가 tonal일 경우 포기 아이콘 보여주기
        icon === "true" && theme === "tonal" && (
          <div>
            <Image
              src={iconWithDraw}
              alt="포기하기"
              className="h-3 w-4 sm:h-5 sm:w-6"
            />
          </div>
        )
      }

      {
        // theme가 link일 경우 link 아이콘 보여주기
        theme === "link" && (
          <div>
            <Image src={iconLink} alt="링크" className="h-6 w-6" />
          </div>
        )
      }

      {
        // icon이 true면서 theme가 outlineWithIcon일 경우 포기 아이콘 보여주기
        theme === "outlineWithIcon" && (
          <div>
            <Image
              src={iconWithDraw}
              alt="포기하기"
              className="h-3 w-4 sm:h-5 sm:w-6"
            />
          </div>
        )
      }
    </div>
  );
}

export function BtnRoundedWithIcon({
  children,
  iconType = "continueChallenge",
}) {
  return (
    <div
      className={`flex h-8 w-full items-center justify-center gap-1 rounded-full border border-gray-800 bg-[var(--color-gray-50)] text-sm font-semibold sm:rounded-full`}
    >
      <div>{children}</div>
      {iconType === "goToMyWork" ? (
        <div>
          <Image src={goToMyWork} alt="내 작업물 보기" className="h-4 w-4" />
        </div>
      ) : (
        <div>
          <Image
            src={continueChallenge}
            alt="도전 계속하기"
            className="h-4 w-4"
          />
        </div>
      )}
    </div>
  );
}
