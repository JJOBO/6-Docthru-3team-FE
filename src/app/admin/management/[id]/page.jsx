"use client";

import StatusSection from "@/app/(user)/challenges/my/apply/[id]/_components/StatusSection";
import ChallengeSection from "@/app/(user)/challenges/my/apply/[id]/_components/ChallengeSection";
import LineDivider from "@/app/(user)/challenges/my/apply/[id]/_components/LineDivider";
import React, { useState } from "react";
import OriginalUrlSection from "@/app/(user)/challenges/my/apply/[id]/_components/OriginalUrlSection";
import BtnText from "@/components/btn/text/BtnText";
import DeclineModal from "@/components/modal/DeclineModal";
import { useParams } from "next/navigation";
import { declineChallengeAction } from "@/lib/actions/challenge";

export default function AdminApplicationPage() {
  const [isModalOpen, setisModalOpen] = useState(false)
  const params = useParams()
  const challengeId = params.id;

  const handleOpenModal = () => {
    setisModalOpen(true)
  }
  const handleCloseModal = () => {
    setisModalOpen(false)
  }
  const handleConfirmDecline = async (reason) => {
    if (!challengeId) {
      console.error("challengeId가 없습니다.")
      return
    }
    try {
      await declineChallengeAction(challengeId, reason)
      console.log("챌린지 거절 성공:", reason)
      setisModalOpen(false)
      alert("챌린지가 성공적으로 거절되었습니다.")
    } catch {
      console.error("챌린지 거절 실패:", error.message)
      alert(`챌린지 거절 실패: ${error.message}`)
    }
  }

  return (
    <div>
      <StatusSection
        adminStatus="PENDING"
        adminMessage="독스루는 개발 문서 번역 플랫폼으로,
폭력성과 관련된 내용을 포함할 수 없음을 안내드립니다. 감사합니다."
      />
      <LineDivider />
      <BtnText
        theme="tonal"
        children="거절하기"
        className="min-w-[36px] px-4 py-2 sm:min-w-[90px] sm:px-0"
        onClick={handleOpenModal}
      />
      {isModalOpen && (
        <DeclineModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmDecline}
        />)}
      <ChallengeSection />
      <LineDivider />
      <OriginalUrlSection />
      <LineDivider />
    </div>
  );
}
