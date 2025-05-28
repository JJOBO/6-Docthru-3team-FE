import React from "react";
import Image from "next/image";
import clock from "@/assets/icon/ic_clock.svg";
import callengers from "@/assets/icon/ic_person.svg";

export default function ChallengeInfo({ deadline, participant, maxParticipant, className }) {
  return (
    <div className={`flex w-full gap-1 items-center text-[13px] font-normal text-gray-600 ${className}`}>
      <Image src={clock} alt="시계 아이콘" width={24} height={24} />
      {deadline} 마감
      <Image src={callengers} alt="참가자 아이콘" width={24} height={24} />
      {participant}/{maxParticipant}
    </div>
  );
}
