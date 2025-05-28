"use client";

import Sort from "@/components/sort/Sort";
import ApplyChallenge from "./_components/ApplyChallenge";
import SearchInput from "@/components/input/SearchInput";
import ChallengeCard from "@/components/card/Card";
import FilterModal from "@/components/modal/FilterModal";
import Pagination from "@/components/pagination/Pagination";
import { useState } from "react";
import useChallenges from "@/hooks/useChallengeList";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

function Page() {
  const [isModal, setIsModal] = useState(false);
  const router = useRouter();

  //현재 사용자가 일반유저인지, 관리자인지 확인
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  //디버깅
  if (isAdmin) {
    console.log("관리자");
  } else if (user?.role === "USER") {
    console.log("일반 유저");
  } else {
    console.log("로그인 필요");
  }

  const {
    challenges,
    totalCount,
    page,
    pageSize,
    keyword,
    filters,
    filterCount,
    isLoading,
    error,
    setPage,
    setKeyword,
    applyFilters
  } = useChallenges();

  const handleClickFilter = () => {
    setIsModal(true);
  };

  const handleClickCard = (challengeId) => {
    router.push(`/challenges/${challengeId}`);
  };

  const handleApplyFilters = (newFilters) => {
    applyFilters(newFilters);
    setIsModal(false);
  };

  return (
    <div className="mx-[16px] [@media(min-width:1200px)]:mx-[462px] mt-[16px] mb-[65px]">
      <div className="font-pretendard flex flex-row items-center justify-between text-[20px] font-semibold">
        챌린지 목록 <ApplyChallenge />
      </div>

      <div className="mt-[16px] flex flex-row gap-[8px]">
        <div className="flex-[1]">
          <Sort onClick={handleClickFilter} isFiltered={filterCount > 0} count={filterCount} />
          {isModal && (
            <FilterModal
              onApply={handleApplyFilters}
              onClose={() => setIsModal(false)}
              initialFields={filters.categories}
              initialDocType={filters.docType}
              initialStatus={filters.status}
            />
          )}
        </div>
        <div className="flex-[2.5]">
          <SearchInput text={"text-[14px]"} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </div>
      </div>

      <div className="flex flex-col gap-[24px] py-[24px]">
        {isLoading ? (
          <div className="flex text-[var(--color-gray-500)] flex-col w-full h-full justify-center items-center text-[16px] font-medium font-pretendard">
            챌린지 목록을 불러오는 중...
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : challenges.length > 0 ? (
          challenges.map((challenge) => (
            <div key={challenge.id} onClick={() => handleClickCard(challenge.id)}>
              <ChallengeCard
                title={challenge.title}
                type={challenge.docType}
                category={challenge.category}
                deadline={challenge.deadline}
                participants={challenge.participants.length}
                maxParticipant={challenge.maxParticipant}
                isAdmin={isAdmin}
              />
            </div>
          ))
        ) : (
          <div className="flex text-[var(--color-gray-500)] flex-col w-full h-full justify-center items-center text-[16px] font-medium font-pretendard">
            <div>아직 챌린지가 없어요.</div>
            <div>지금 바로 챌린지를 신청해보세요!</div>
          </div>
        )}
      </div>

      <Pagination
        totalCount={totalCount}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}

export default Page;
