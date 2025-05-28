"use client";

import SearchInput from "@/components/input/SearchInput";
import React, { useEffect, useState } from "react";
import AppliedChallenges from "./_components/AppliedChallenges";
import { useRouter } from "next/navigation";
import { columnSetting, ITEM_COUNT } from "@/constant/constant";
import { useAuth } from "@/providers/AuthProvider";
import { appliedChallenges } from "@/lib/api/myChallenges";
import Sort from "@/components/sort/Sort";

export default function AppliedChallengesPage() {
  const router = useRouter();
  const [totalCount, setTotalCount] = useState(1);
  const [page, setPage] = useState(1);
  const pageSize = ITEM_COUNT.APPLICATION;
  const [result, setResult] = useState([]);
  const { user } = useAuth();

  async function appliedChallengesData() {
    try {
      const result = await appliedChallenges({ page, pageSize });
      setResult([...result?.data]);
      setTotalCount(result.totalCount || 0);
      console.log("✅ fetched:", result);
    } catch (error) {
      console.error(error, "목록 불러오기 실패");
    }
  }

  //신청한 챌린지 목록 불러오기

  useEffect(() => {
    if (user) {
      appliedChallengesData();
    }
    console.log(page, result);
  }, [page, user]);

  return (
    <>
      <div className="flex justify-between mb-4 gap-2">
        <div className="flex-7 sm:flex-8">
          {" "}
          <SearchInput />
        </div>
        <div className="flex-3 sm:flex-2">
          <Sort />
        </div>
      </div>
      <AppliedChallenges
        columnSetting={columnSetting}
        result={result}
        onClick={(id) => router.push(`/challenges/${id}`)}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
}
