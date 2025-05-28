import AdminStatusChip from "../app/(user)/challenges/my/apply/_components/AdminStatuschip.jsx";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_URL = process.env.API_URL;

export const ITEM_COUNT = {
  APPLICATION: 10,
  CHALLENGE_LG: 5,
  CHALLENGE_SM: 4
};

export const APPLY_DROPDOWN_OPTIONS = [
  "승인 대기",
  "신청 승인",
  "신청 거절",
  "신청 시간 빠른순",
  "신청 시간 느린순",
  "마감 기한 빠른순",
  "마감 기한 느린순"
];

/* 
신청한 챌린지

key : 테이블 필드명
label : 필드의 게시판 타이틀명
flex : 너비 비율
className : 각 셀의 스타일링
render : 해당 셀에 상태에 따라 다른 값을 노출해야 할 경우 
*/

export const columnSetting = [
  { key: "id", label: "No.", flex: 0.6, className: "pl-4" },
  { key: "docType", label: "분야", flex: 1.2 },
  { key: "category", label: "카테고리", flex: 1 },
  { key: "title", label: "챌린지 제목", flex: 5, className: "text-gray-700 font-medium" },
  { key: "maxParticipant", label: "인원", flex: 1 },
  { key: "createdAt", label: "신청일", flex: 1 },
  { key: "updatedAt", label: "마감기한", flex: 1 },
  {
    key: "adminStatus",
    label: "상태",
    flex: 1.2,
    render: (data) =>
      !!data.application?.adminStatus ? (
        // adminStatus 필드를 사용할 경우 아래 컴포넌트 사용해 값마다 다른 스타일링을 보여줌
        <AdminStatusChip status={data.application?.adminStatus} />
      ) : (
        "null"
      )
  }
];
