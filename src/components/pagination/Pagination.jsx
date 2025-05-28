import Image from "next/image";
import { useMemo } from "react";
import leftArrow from "@/assets/icon/ic_arrow_left.svg";
import rightArrow from "@/assets/icon/ic_arrow_right.svg";

/**
 * 페이지네이션 바에 표시할 최대 페이지 수
 * 예: [1, 2, 3, 4, 5] 또는 [6, 7, 8, 9, 10]
 */
const pagesPerGroup = 5;

/**
 * 사용법
 * 페이지네이션 사용하는 페이지에서 [page, setPage] = useState(1)
 * totalCount={challenges?.totalCount}
 * currentPage={page}
 * onPageChange={(newPage) => setPage(newPage)
 * @typedef {Object} PaginationProps
 * @param {number} totalCount - 전체 아이템 수
 * @param {number} currentPage - 현재 페이지 번호
 * @param {(page: number) => void} onPageChange - 페이지 변경 핸들러
 * @returns
 */
function Pagination({ totalCount, currentPage, pageSize, onPageChange }) {
  /**
   * 한 페이지에 표시할 아이템(데이터) 개수
   * 예: 챌린지 목록 10개씩 보기
   */
  const itemsPerPage = pageSize;

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const currentGroup = Math.ceil(currentPage / pagesPerGroup);
    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return {
      totalPages,
      startPage,
      endPage,
      pages,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages,
    };
  }, [currentPage, totalCount, itemsPerPage, pagesPerGroup]);

  const handlePrev = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  console.log("총 페이지 수", paginationData.totalPages);

  return (
    <div className="mb-12 flex justify-center gap-[6px]">
      <button
        type="button"
        className="page-btn mr-[6px]"
        onClick={handlePrev}
        disabled={!paginationData.hasPrev}
      >
        <Image src={leftArrow} alt="왼쪽 화살표" width={40} height={40} />
      </button>
      {paginationData?.pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`page-btn ${
            page === currentPage
              ? "text-brand-yellow bg-gray-800"
              : "hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className="page-btn ml-[6px]"
        onClick={handleNext}
        disabled={!paginationData.hasNext}
      >
        <Image src={rightArrow} alt="오른쪽 화살표" width={40} height={40} />
      </button>
    </div>
  );
}

export default Pagination;
