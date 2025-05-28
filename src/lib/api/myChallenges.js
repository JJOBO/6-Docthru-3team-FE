"use client"
// 나의 챌린지 관련 URL
const BASE_URL = "http://localhost:8080";


// 신청한 챌린지
export async function appliedChallenges({page=1, pageSize, category, docType, keyword }) {
    try {
        const res = await fetch(`${BASE_URL}/users/me/challenges?myChallengeStatus=applied&page=${page}&pageSize=${pageSize}`,{
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) throw new Error("챌린지 목록을 가져올 수 없습니다.");
        
        const data = await res.json();
        console.log(data)
        return {
            data: data.data,
            totalCount: data.totalCount,
            currentPage: data.currentPage,
            pageSize: data.pageSize,
        }
    
    } catch (error) {
        console.error(error);
         return {
            data: [],
            totalCount: 0,
            currentPage: page,
            pageSize,
        };
    }  
}
