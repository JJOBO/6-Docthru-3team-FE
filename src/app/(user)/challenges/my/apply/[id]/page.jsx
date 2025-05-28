"use client";

import { useParams } from "next/navigation";
import React from "react";
import StatusSection from "./_components/StatusSection";
import LineDivider from "./_components/LineDivider";
import OriginalUrlSection from "./_components/OriginalUrlSection";
import ChallengeSection from "./_components/ChallengeSection";

export default function ApplicationDetailPage() {
  const { id } = useParams();

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
