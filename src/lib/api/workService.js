// 현재 실행 모드에 따라 baseURL 변경
const BASE_URL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:8080";

// 공통 fetch 설정
const fetchConfig = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    Origin: process.env.NEXT_PUBLIC_CLIENT_URL // 프론트엔드 도메인
  },
  mode: "cors"
};
const workService = {
  // 챌린지 작업물 목록 조회 (페이지네이션)
  getWorkList: async (challengeId, page = 1, size = 5) => {
    const response = await fetch(`${BASE_URL}/challenges/${challengeId}/works?page=${page}&size=${size}`, {
      ...fetchConfig
    });
    if (!response.ok) throw new Error("Failed to fetch work list");
    return response.json();
  },

  // 작업물 상세 조회
  getWorkDetail: async (challengeId = 15, workId = 67) => {
    const response = await fetch(`${BASE_URL}/challenges/${challengeId}/works/${workId}`, { ...fetchConfig });
    if (!response.ok) throw new Error("Failed to fetch work detail");
    return response.json();
  },

  // 작업물 생성
  createWork: async (challengeId) => {
    const response = await fetch(`${BASE_URL}/challenges/${challengeId}/works`, {
      ...fetchConfig,
      method: "POST"
    });
    if (!response.ok) throw new Error("Failed to create work");
    return response.json();
  },

  // 작업물 제출 및 수정
  updateWork: async (workId, content) => {
    console.log("updateWork payload:", content);
    const response = await fetch(`${BASE_URL}/works/${workId}`, {
      ...fetchConfig,
      method: "PATCH",
      body: JSON.stringify({ content })
    });
    if (!response.ok) throw new Error("Failed to update work");
    return response.json();
  },

  // 작업물 삭제(포기)
  deleteWork: async (workId) => {
    const response = await fetch(`${BASE_URL}/works/${workId}`, {
      ...fetchConfig,
      method: "DELETE"
    });

    return { status: response.status };
  },

  // 작업물 좋아요 생성
  createWorkLike: async (workId) => {
    const response = await fetch(`${BASE_URL}/works/${workId}/like`, {
      ...fetchConfig,
      method: "POST"
    });
    if (!response.ok) throw new Error("Failed to create work like");
    return response.json();
  },

  // 작업물 좋아요 삭제
  deleteWorkLike: async (workId) => {
    const response = await fetch(`${BASE_URL}/works/${workId}/like`, {
      ...fetchConfig,
      method: "DELETE"
    });
    if (!response.ok) throw new Error("Failed to delete work like");
    return response.json();
  }
};

export default workService;
