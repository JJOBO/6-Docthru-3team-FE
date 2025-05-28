"use client";

import StatusSection from "@/app/(user)/challenges/my/apply/[id]/_components/StatusSection";
import ChallengeSection from "@/app/(user)/challenges/my/apply/[id]/_components/ChallengeSection";
import LineDivider from "@/app/(user)/challenges/my/apply/[id]/_components/LineDivider";
import React from "react";
import OriginalUrlSection from "@/app/(user)/challenges/my/apply/[id]/_components/OriginalUrlSection";

export default function AdminApplicationPage() {
  return (
    <div>
      <StatusSection
        adminStatus="PENDING"
        adminMessage="독스루는 개발 문서 번역 플랫폼으로,
폭력성과 관련된 내용을 포함할 수 없음을 안내드립니다. 감사합니다."
      />
      <LineDivider />
      <ChallengeSection />
      <LineDivider />
      <OriginalUrlSection />
    </div>
  );
}
