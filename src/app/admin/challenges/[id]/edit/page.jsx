"use client";

import BtnText from "@/components/btn/text/BtnText";
import React, { useEffect, useState } from "react";
import Input from "@/app/(user)/challenges/create/_components/Input";
import CategoryClosed from "@/components/dropDown/category/CategoryClosed";
import CategoryItems from "@/components/dropDown/category/CategoryItems";
import { useParams, useRouter } from "next/navigation";
import { updateChallenge } from "@/lib/api/challenge-api/editChallenge";
import { getChallengeDetail } from "@/lib/api/challengeDetail";
import { getUserAction } from "@/lib/actions/user";

export default function editChallengePageAdmin() {
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
  const params = useParams();

  const challengeId = params.id;

  //기존 챌린지 불러오기
  useEffect(() => {
    if (!challengeId) return;

    const fetchChallenge = async () => {
      try {
        const prevChallenge = await getChallengeDetail(challengeId);

        setTitle(prevChallenge.title);
        setOriginalUrl(prevChallenge.originalUrl);
        setSelectedCategory(prevChallenge.category);
        setSelectedDocType(prevChallenge.docType);
        setDeadline(prevChallenge.deadline);
        setMaxParticipant(prevChallenge.maxParticipant);
        setDescription(prevChallenge.description);
      } catch (error) {
        console.log("기존 챌린지 불러오기 실패");
        alert("존재하지 않는 챌린지입니다.");
        router.push("/admin/challenges");
      }
    };

    fetchChallenge();
  }, [challengeId]);

  //챌린지 수정하기
  const handleChallengeEdit = async () => {
    if (maxParticipantErrorMessage) return alert("신청 형식을 확인해주세요");

    //ISO 8601 문자열로 변환
    const formatDeadline = new Date(deadline).toISOString();

    const postData = {
      challengeId,
      title,
      originalUrl,
      maxParticipant,
      description,
      deadline: formatDeadline,
      category: selectedCategory,
      docType: selectedDocType
    };

    try {
      const updatedChallenge = await updateChallenge(postData);

      if (!updatedChallenge) throw new Error("챌린지 수정 중 오류 발생");

      router.push("/admin/challenges");
    } catch (error) {
      console.log("챌린지 수정 실패");
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

  //신청하기 버튼 비활성화
  const isFormValid =
    title.trim() !== "" &&
    originalUrl.trim() !== "" &&
    selectedCategory !== "카테고리" &&
    selectedDocType !== "카테고리" &&
    deadline !== null &&
    maxParticipant !== null &&
    maxParticipant !== "" &&
    description.trim() !== "" &&
    !maxParticipantErrorMessage;

  return (
    <div className="font-pretendard px-[16px] pt-[16px] pb-[87px] text-[18px] text-[var(--color-gray-900)]">
      <div className="font-bold">챌린지 수정</div>

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
        <BtnText theme="solidblack" disabled={!isFormValid} onClick={handleChallengeEdit}>
          수정하기
        </BtnText>
      </div>
    </div>
  );
}
