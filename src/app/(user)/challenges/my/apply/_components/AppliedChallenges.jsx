import React from 'react';
import ListHead from './ListHead';
import Pagination from '@/components/pagination/Pagination';
import MapResultData from './MapResultData';

export default function AppliedChallenges({
  columnSetting,
  result,
  onClick,
  totalCount,
  page,
  pageSize,
  onPageChange
}) {
  return (
    <div className="overflow-scroll">
      <ListHead columnSetting={columnSetting} />
      <MapResultData
        columnSetting={columnSetting} // 매칭 데이터, 너비, 스타일링 셋팅
        resultData={result} // api response
        onClick={onClick} // 상세페이지로 이동
      />
      <div className="mt-5">
        <Pagination totalCount={totalCount} currentPage={page} pageSize={pageSize} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
