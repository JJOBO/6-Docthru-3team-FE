"use client";

import SearchInput from "@/components/input/SearchInput";
import AppliedChallenges from "./_components/AppliedChallenges";
import Sort from "@/components/sort/Sort";
import React, { useEffect, useState } from "react";
import { ITEM_COUNT } from "@/constant/constant";
import { useAuth } from "@/providers/AuthProvider";
import { userService } from "@/lib/service/userService";
import ApplyDropdown from "@/components/dropDown/list/ApplyDropdown";

export default function ApplicationsPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [applications, setApplications] = useState();
  const [totalCount, setTotalCount] = useState(null);
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const pageSize = ITEM_COUNT.APPLICATION;

  async function fetchApplicationList() {
    try {
      const result = await userService.getApplications(page, pageSize);
      setApplications(result?.data);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error(error, "목록 불러오기 실패");
    }
  }

  useEffect(() => {
    if (user) {
      fetchApplicationList();
    }
  }, [page, user]);

  return (
    <>
      <div className="flex justify-between mb-4 gap-2">
        <div className="flex-7 sm:flex-8">
          <SearchInput />
        </div>
        <div className="flex-3 sm:flex-2 relative">
          <Sort isAdminStatus={true} onClick={() => setIsDropdownOpen((prev) => !prev)} />
          <div className="absolute right-0 mt-2">{isDropdownOpen && <ApplyDropdown />}</div>
        </div>
      </div>
      <AppliedChallenges
        resultData={applications}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
}
