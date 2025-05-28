"use server";

import { cookies } from "next/headers";

export async function deleteChallengeAction(challengeId, adminMessage) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  if (!accessToken) {
    throw new Error("인증되지 않았습니다: 액세스 토큰이 없습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/admin/challenges/${challengeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`
      },
      body: JSON.stringify({
        adminStatus: "DELETED",
        adminMessage: adminMessage
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "챌린지 삭제에 실패했습니다.");
    }

    return await response.json();
  } catch (err) {
    console.error("서버 액션 - 챌린지 삭제 오류:", err);
    throw err;
  }
}

export async function declineChallengeAction(challengeId, adminMessage) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  if (!accessToken) {
    throw new Error("인증되지 않았습니다: 액세스 토큰이 없습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/admin/challenges/${challengeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`
      },
      body: JSON.stringify({
        adminStatus: "REJECTED",
        adminMessage: adminMessage
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "챌린지 거절에 실패했습니다.");
    }

    return await response.json();
  } catch (err) {
    console.error("서버 액션 - 챌린지 거절 오류:", err);
    throw err;
  }
}
