//챌린지 생성 페이지에서 사용되는 fetch 입니다.
const BASE_URL = "http://localhost:8080/challenges";

//챌린지 신청하기
export async function postChallenges(postData) {
  //디버깅
  console.log("postDate", postData);

  const { accessToken } = postData;

  //디버깅
  console.log("accessToken", accessToken);

  const res = await fetch(BASE_URL, {
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(postData)
  });

  if (!res.ok) throw new Error("챌린지를 생성할 수 없습니다.");

  console.log("res", res);

  return res.json();
}
