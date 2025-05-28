"use client";

import AppliedChallenges from "@/app/(user)/challenges/my/apply/_components/AppliedChallenges";
import DropdownListLeftSmall from "@/components/dropDown/list/DropdownListLeftSmall";
import SearchInput from "@/components/input/SearchInput";
import Sort from "@/components/sort/Sort";
import { columnSetting, ITEM_COUNT } from "@/constant/constant";
import { getChallenges } from "@/lib/api/challenge-api/searchChallenge";
import { useEffect, useState } from "react";

function AdminManagementPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [applications, setApplications] = useState();
  const [totalCount, setTotalCount] = useState(null);
  const [page, setPage] = useState(1);

  const pageSize = ITEM_COUNT.APPLICATION;

  const handleClickSort = () => setIsDropdownOpen((prev) => !prev);

  const getApplications = async () => {
    const challenges = await getChallenges({ page, pageSize });
    setApplications(challenges?.data);
    setTotalCount(challenges?.totalCount);
  };

  useEffect(() => {
    getApplications();
  }, [page]);

  return (
    <>
      <h1 className="text-xl font-semibold mt-[26px] md:mt-[34px] mb-[13px] md:mb-6">챌린지 신청 관리</h1>
      <div className="mb-4 md:mb-6 grid grid-cols-[2fr_1fr] gap-3 md:grid-cols-[4fr_1fr] lg:grid-cols-[6fr_1fr]">
        <SearchInput />
        <div className="relative">
          <Sort isAdminStatus={true} onClick={handleClickSort} />
          <div className="absolute right-0 mt-2">{isDropdownOpen && <DropdownListLeftSmall />}</div>
        </div>
      </div>
      <AppliedChallenges
        columnSetting={columnSetting}
        result={applications}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
}

export default AdminManagementPage;
