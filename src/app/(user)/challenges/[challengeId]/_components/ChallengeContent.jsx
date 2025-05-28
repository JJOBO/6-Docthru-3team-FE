"use client";

import OfficialDocChip from "@/components/chip/chipCategory/OfficialDocChip";
import NextjsChip from "@/components/chip/chipType/NextjsChip";
import dropdownIcon from "@/assets/icon/ic_menu.svg";
import Image from "next/image";
import React, { useState } from "react";
import CancelDropdown from "@/components/dropDown/list/CancelDropdown";

export default function ChallengeContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <article className="flex flex-col gap-4 w-full">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">Next.js - App Router : Routing Fundamentals</h2>
        <button className="relative" onClick={() => setIsModalOpen((prev) => !prev)}>
          <Image src={dropdownIcon} alt="드롭다운" width={24} height={24} />
          {isModalOpen && <CancelDropdown className="absolute right-0 mt-3" />}
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <NextjsChip />
        <OfficialDocChip />
      </div>
      <p className="text-sm font-medium text-gray-700 md:text-base">
        Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다! 라우팅에 따른 폴더와 파일이 구성되는 법칙과
        컨벤션 등에 대해 공부할 수 있을 것 같아요~! 다들 챌린지 많이 참여해 주세요 :)
      </p>
    </article>
  );
}
