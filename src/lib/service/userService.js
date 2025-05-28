import { getUserAction } from "@/lib/actions/user";

export const userService = {
  // 사용자 정보 조회
  getMe: async () => {
    return await getUserAction();
  }
};
