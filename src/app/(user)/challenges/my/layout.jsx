import React from "react";
import MyChallengesTab from "./_components/MyChallengesTab";
import Container from "@/components/container/PageContainer";
import ApplyChallenge from "../_components/ApplyChallenge";

function myChallengeLayout({ children }) {
  return (
    <Container>
      <div className="flex justify-between h-10 mt-4">
        <h2 className="flex-1 text-xl font-semibold">나의 챌린지</h2>
        <ApplyChallenge />
      </div>
      <MyChallengesTab />
      <div>{children}</div>
    </Container>
  );
}

export default myChallengeLayout;
