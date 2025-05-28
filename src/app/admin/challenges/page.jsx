"use client";

import Sort from "@/components/sort/Sort";
import SearchInput from "@/components/input/SearchInput";
import ChallengeCard from "@/components/card/Card";
import FilterModal from "@/components/modal/FilterModal";
import Pagination from "@/components/pagination/Pagination";
import { useEffect, useState } from "react";
import useChallenges from "@/hooks/useChallengeList";
import ApplyChallenge from "@/app/(user)/challenges/_components/ApplyChallenge";
import DeclineModal from "@/components/modal/DeclineModal";
import { toast } from 'react-hot-toast';
import { useAuth } from "@/providers/AuthProvider";
import { deleteChallengeAction } from "@/lib/actions/challenge";

function Page() {
  const [isModal, setIsModal] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [challengeToDeclineId, setChallengeToDeclineId] = useState(null);

  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.role === 'ADMIN') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

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
    applyFilters,
    setChallenges,
    setTotalCount,
  } = useChallenges();

  const handleClickFilter = () => {
    setIsModal(true);
  };

  const handleApplyFilters = (newFilters) => {
    applyFilters(newFilters);
    setIsModal(false);
  };

  const handleDeclineClick = (challengeId) => {
    setChallengeToDeclineId(challengeId);
    setIsDeclineModalOpen(true);
  };

  const handleConfirmDecline = async (adminMessage) => {
    if (!challengeToDeclineId) {
      console.error("삭제할 챌린지 ID가 설정되지 않았습니다.");
      return;
    }

    try {
      // deleteChallengeAction 호출
      await deleteChallengeAction(challengeToDeclineId, adminMessage);
      toast.success("챌린지가 성공적으로 삭제되었습니다.");

      setChallenges((prevChallenges) =>
        prevChallenges.filter((challenge) => challenge.id !== challengeToDeclineId)
      );
      setTotalCount((prevCount) => prevCount - 1);

    } catch (err) {
      toast.error(`챌린지 삭제에 실패했습니다: ${err.message}`);
      console.error("챌린지 삭제 에러:", err);
    } finally {
      setIsDeclineModalOpen(false);
      setChallengeToDeclineId(null);
    }
  };

  return (
    <div className="mx-[16px] mt-[16px] mb-[65px]">
      <div className="font-pretendard flex flex-row items-center justify-between text-[20px] font-semibold">
        챌린지 목록 <ApplyChallenge />
      </div>
      <div className="mt-[16px] flex flex-row gap-[8px]">
        <div className="flex-[1]">
          <Sort
            onClick={handleClickFilter}
            isFiltered={filterCount > 0}
            count={filterCount}
          />
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
          <SearchInput
            text={"text-[14px]"}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[24px] py-[24px]">
        {isLoading ? (
          <div>챌린지 목록을 불러오는 중...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : challenges.length > 0 ? (
          challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              title={challenge.title}
              type={challenge.docType}
              category={challenge.category}
              deadline={challenge.deadline}
              participants={challenge.participants.length}
              maxParticipant={challenge.maxParticipant}
              onDeclineClick={() => handleDeclineClick(challenge.id)}
              isAdmin={isAdmin}
            />
          ))
        ) : (
          <div>챌린지가 존재하지 않습니다.</div>
        )}
      </div>

      <Pagination
        totalCount={totalCount}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
      />

      {isDeclineModalOpen && (
        <DeclineModal
          onClose={() => setIsDeclineModalOpen(false)}
          onConfirm={handleConfirmDecline}
          isLoggedIn={true}
        />
      )}
    </div>
  );
}

export default Page;