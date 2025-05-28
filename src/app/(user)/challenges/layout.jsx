"use client";

import Gnb from "@/layout/Gnb";
import { useAuth } from "@/providers/AuthProvider";
import { usePathname } from "next/navigation";
import React from "react";

// GNB를 제외할 경로들을 배열로 관리
const excludeGnbPaths = [
  "/challenges/[challengeId]/work/[workId]/form"
  // 추후 GNB를 제외할 경로들을 여기에 추가
];

export default function ChallengesLayout({ children }) {
  const pathname = usePathname();
  const { user } = useAuth();

  const userRole = user?.nickname === "관리자" ? "admin" : "member";

  // 현재 경로가 excludeGnbPaths 배열에 있는 패턴과 일치하는지 확인
  const shouldExcludeGnb = excludeGnbPaths.some((path) => {
    // 동적 라우트 파라미터([challengeId] 등)를 정규식 패턴으로 변환
    const pathPattern = path.replace(/\[.*?\]/g, "[^/]+");
    const regex = new RegExp(`^${pathPattern}$`);
    return regex.test(pathname);
  });

  return (
    <div>
      {!shouldExcludeGnb && <Gnb userRole={userRole} />}
      {children}
    </div>
  );
}
