import { BASE_URL } from '@/constant/constant';

// 챌린지 목록 가져오기
export async function getChallenges({ page = 1, pageSize = 4, category, docType, keyword }) {
  const params = new URLSearchParams();
  params.set('page', page);
  params.set('pageSize', pageSize);
  if (category) params.set('category', category);
  if (docType) params.set('docType', docType);
  if (keyword) params.set('keyword', keyword);

  const res = await fetch(`${BASE_URL}/challenges?${params.toString()}`);

  if (!res.ok) throw new Error('챌린지 목록을 가져올 수 없습니다.');
  return res.json();
}
