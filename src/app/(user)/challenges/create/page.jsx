"use client";

import BtnText from "@/components/btn/text/BtnText";
import React, { useState } from "react";
import Input from "./_components/Input";
import CategoryClosed from "@/components/dropDown/category/CategoryClosed";
import CategoryItems from "@/components/dropDown/category/CategoryItems";
import { postChallenges } from "@/lib/api/challenge-api/createChallenge";
import { useRouter } from "next/navigation";
import { getServerSideToken } from "@/lib/actions/auth";

export default function page() {
  const [title, setTitle] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [maxParticipant, setMaxParticipant] = useState(null);
  const [description, setDescription] = useState("");
  const [isCategory, setIsCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("카테고리");
  const [isDocType, setIsDocType] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState("카테고리");
  const [deadline, setDeadline] = useState(null);
  const router = useRouter();

  //챌린지 신청하기
  const handlePost = async () => {
    if (maxParticipantErrorMessage) return alert("신청 형식을 확인해주세요");

    //액세스 토큰 받아오기 (서버액션으로)
    const accessToken = getServerSideToken("accessToken");

    //ISO 8601 문자열로 변환
    const formatDeadline = new Date(deadline).toISOString();

    const postData = {
      accessToken,
      title,
      originalUrl,
      maxParticipant,
      description,
      deadline: formatDeadline,
      category: selectedCategory,
      docType: selectedDocType
    };

    try {
      const createdChallenge = await postChallenges(postData);

      if (!createdChallenge) throw new Error("챌린지 생성 중 오류 발생");

      const challengeId = createdChallenge.createdChallenge.id;

      router.push(`/challenges/${challengeId}`);
    } catch (error) {
      console.log("챌린지 생성 실패");
    }
  };

  //최대 참여자 인원 수 제한
  let maxParticipantErrorMessage;
  if (maxParticipant > 99) {
    maxParticipantErrorMessage = "참여자는 최대 99명입니다.";
  } else if (maxParticipant === "") {
    maxParticipantErrorMessage = "숫자로만 입력해주세요";
  } else {
    maxParticipantErrorMessage = null;
  }

  return (
    <div className="font-pretendard px-[16px] pt-[16px] pb-[87px] text-[18px] text-[var(--color-gray-900)]">
      <div className="font-bold">신규 챌린지 신청</div>

      <div className="flex flex-col gap-[24px] pt-[16px] pb-[24px] text-[14px]">
        <Input
          title={"제목"}
          placeholder={"제목을 입력해주세요"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          title={"원문 링크"}
          placeholder={"원문 링크를 입력해주세요"}
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <div className="flex h-full flex-col gap-[8px]">
          <div className="flex flex-col gap-[24px] text-sm font-medium text-[var(--color-gray-900)]">
            <div>
              분야
              <CategoryClosed
                isOpen={isCategory}
                onClick={() => {
                  setIsCategory((prev) => !prev);
                }}
                label={selectedCategory}
              />
              {isCategory ? (
                <CategoryItems
                  toggleType={"fields"}
                  onSelect={(selected) => {
                    setSelectedCategory(selected);
                    setIsCategory(false);
                  }}
                />
              ) : null}
            </div>
            <div>
              문서 타입
              <CategoryClosed
                isOpen={isDocType}
                onClick={() => {
                  setIsDocType((prev) => !prev);
                }}
                label={selectedDocType}
              />
              {isDocType ? (
                <CategoryItems
                  toggleType={"docs"}
                  onSelect={(selected) => {
                    setSelectedDocType(selected);
                    setIsDocType(false);
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
        <Input type={"date"} deadline={deadline} setDeadline={setDeadline} />
        <div>
          <Input
            title={"최대 인원"}
            placeholder={"인원을 입력해주세요"}
            value={maxParticipant ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                setMaxParticipant("");
              } else {
                const num = Number(value);
                if (!isNaN(num)) {
                  setMaxParticipant(num);
                }
              }
            }}
          />
          {maxParticipantErrorMessage ? (
            <div className="pl-[15px] text-red-500">{maxParticipantErrorMessage}</div>
          ) : null}
        </div>
        <Input
          title={"내용"}
          placeholder={"내용을 입력해주세요"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          height={"h-[219px]"}
        />
      </div>

      <div className="h-[48px] w-full">
        <BtnText theme="solidblack" onClick={handlePost}>
          신청하기
        </BtnText>
      </div>
    </div>
  );
}
