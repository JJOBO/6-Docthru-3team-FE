"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getChallengeDetail, getChallengeRanking } from "@/lib/api/challengeDetail";
import dayjs from "dayjs";
import ChallengeCard from "@/components/card/Card";
import ChallengeContainer from "../_components/ChallengeContainer";
import RankingListItem from "@/components/list/RankingListItem";
import userIcon from "@/assets/img/profile_member.svg";
import arrowRight from "@/assets/icon/ic_arrow_right.svg";
import arrowLeft from "@/assets/icon/ic_arrow_left.svg";

function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const checkWidth = () => setIsTablet(window.innerWidth >= 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);
  return isTablet;
}

export default function ChallengeDetailPage() {
  const isTablet = useIsTablet();
  const { challengeId } = useParams();

  const [challenge, setChallenge] = useState(null);
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(rankingData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = rankingData.slice(startIndex, startIndex + itemsPerPage);

  const handleToggleLike = (index) => {
    setRankingData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              isLiked: !item.isLiked,
              likeCount: item.isLiked ? item.likeCount - 1 : item.likeCount + 1
            }
          : item
      )
    );
  };

  useEffect(() => {
    if (!challengeId) return;

    getChallengeDetail(challengeId)
      .then(setChallenge)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    getChallengeRanking(challengeId)
      .then(setRankingData)
      .catch((err) => console.error("랭킹 정보 불러오기 실패:", err));
  }, [challengeId]);

  if (loading) return <main className="p-10 text-center">불러오는 중...</main>;
  if (error) return <main className="p-10 text-center text-red-500">{error}</main>;
  if (!challenge) return <main className="p-10 text-center">챌린지를 찾을 수 없습니다.</main>;

  return (
    <main className="flex flex-col items-center bg-white">
      <section className="flex flex-col gap-4 md:flex-row md:items-start md:justify-center md:gap-6 w-full max-w-6xl">
        <div className="flex flex-col gap-2 w-full md:w-2/3">
          <ChallengeCard {...challenge} variant="simple" />

          <section className="text-gray-800 px-1 sm:px-2 md:px-4">
            <p className="text-sm md:text-base leading-[1.3] whitespace-pre-line">{challenge.description}</p>
          </section>

          <section className="flex items-center gap-2 px-4">
            <Image src={userIcon} alt="작성자 프로필" width={32} height={32} className="rounded-full" />
            <span className="text-sm font-medium text-gray-700">{challenge.user?.nickname || "작성자 없음"}</span>
          </section>
        </div>

        <div className="w-full md:w-1/3">
          <ChallengeContainer
            height="h-auto"
            type={isTablet ? "" : "slim"}
            deadline={dayjs(challenge.deadline).format("YYYY년 M월 D일")}
            currentCount={challenge.participants?.length || 0}
            maxCount={challenge.maxParticipant}
            originalUrl={challenge.originalUrl}
          />
        </div>
      </section>

      <hr className="w-full max-w-6xl border-t border-gray-100 my-4" />

      <section className="w-full max-w-6xl rounded-xl border-2 border-gray-800 bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-base md:text-lg font-semibold text-gray-800">참여현황</h3>
          {rankingData.length > 0 && (
            <div className="flex items-center gap-2 text-sm md:text-base">
              <span className="text-[var(--color-brand-yellow)] font-semibold">{currentPage}</span>
              <span className="text-gray-800">/ {totalPages}</span>
              <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                <Image
                  src={arrowLeft}
                  alt="이전"
                  width={20}
                  height={20}
                  className={currentPage === 1 ? "opacity-30" : ""}
                />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <Image
                  src={arrowRight}
                  alt="다음"
                  width={20}
                  height={20}
                  className={currentPage === totalPages ? "opacity-30" : ""}
                />
              </button>
            </div>
          )}
        </div>

        <div className="px-4">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <RankingListItem
                key={item.workId}
                item={{
                  rank: startIndex + index + 1,
                  userName: item.author.authorNickname,
                  userRole: "전문가",
                  likes: item.likeCount,
                  isLiked: item.isLiked,
                  workId: item.workId
                }}
                toggleLike={() => handleToggleLike(startIndex + index)}
              />
            ))
          ) : (
            <p className="text-center min-h-30 text-gray-500 py-4">
              아직 참여한 도전자가 없어요,
              <br />
              지금 바로 도전해보세요!
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
