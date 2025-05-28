// const BASE_URL = "http://localhost:8080/challenges";
import { BASE_URL } from "@/constant/constant";

//챌린지 수정하기
export async function updateChallenge(data) {
  const { challengeId, title, originalUrl, maxParticipant, description, deadline, category, docType } = data;

  const postData = {
    title,
    originalUrl,
    maxParticipant,
    description,
    deadline,
    category,
    docType
  };

  const res = await fetch(`${BASE_URL}/challenges/${challengeId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(postData)
  });

  if (!res.ok) throw new Error("챌린지를 수정할 수 없습니다.");

  return res.json();
}
