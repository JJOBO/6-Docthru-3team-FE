"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const tabStyle = `
        hover:cursor-pointer 
        font-semibold 
        hover:text-brand-black 
        text-base 
        text-gray-500 
        h-12 
        sm:h-13 
        flex 
        items-center 
        justify-center 
        flex-3
    `;

export default function MyChallengesTab() {
  const pathname = usePathname();

  const tabs = [
    { href: "/challenges/my", label: "참여중인 챌린지" },
    { href: "/challenges/my/complete", label: "완료한 챌린지" },
    { href: "/challenges/my/apply", label: "신청한 챌린지" }
  ];
  return (
    <div className="w-full  flex flex-row justify-around border-b border-gray-300 mb-4">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`${pathname === tab.href ? "border-b-3 border-brand-black" : ""} ${tabStyle}`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
