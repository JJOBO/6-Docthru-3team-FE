import ChallengeContent from "@/app/(user)/challenges/[challengeId]/_components/ChallengeContent";
import ChallengeInfo from "@/app/(user)/challenges/[challengeId]/_components/ChallengeInfo";
import React from "react";

function ChallengeSection() {
  return (
    <section className="space-y-4">
      <ChallengeContent />
      <ChallengeInfo deadline="2024년 3월 3일" participant={5} maxParticipant={15} />
    </section>
  );
}

export default ChallengeSection;
