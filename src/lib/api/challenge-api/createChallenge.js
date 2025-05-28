//챌린지 생성 페이지에서 사용되는 fetch 입니다.
const BASE_URL = "http://localhost:8080/challenges";

//챌린지 신청하기
export async function postChallenges(data) {
  const { title, originalUrl, maxParticipant, description, deadline, category, docType } = data;

  const postData = {
    title,
    originalUrl,
    maxParticipant,
    description,
    deadline,
    category,
    docType
  };

  const res = await fetch(BASE_URL, {
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(postData)
  });

  if (!res.ok) throw new Error("챌린지를 생성할 수 없습니다.");

<<<<<<< HEAD:src/lib/api/challenges-first/createChallenge.js
  console.log("res", res);

=======
>>>>>>> 358d827b90482ad68bd567cbbfbb3f1eebe44374:src/lib/api/challenge-api/createChallenge.js
  return res.json();
}
