import { getApplicationsAction, getUserAction } from "../actions/user";

export const userService = {
  // 사용자 정보 조회
  getMe: async () => {
    return await getUserAction();
  },

  // 니의 챌린지 신청 목록 조회
  getApplications: async (page, pageSize) => {
    return await getApplicationsAction({ params: { page, pageSize } });
  }
};
