import { useState, useEffect } from "react";
import workService from "@/lib/api/workService";
import { useRouter } from "next/navigation";

export const useWorkData = (challengeId, updateModalState) => {
  const router = useRouter();

  // 에디터 핵심 상태
  const [content, setContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 작업물 메타 정보
  const [workMeta, setWorkMeta] = useState({
    workId: null,
    challengeTitle: "",
    originalUrl: ""
  });

  // 초기 데이터 로드
  useEffect(() => {
    const fetchInitialData = async () => {
      // TODO : 현재는 테스트 코드 수정하기 버튼 완성되면 주석 해제하기
      //   const response = await workService.getWorkDetail(challengeId, workMeta.workId);
      const response = await workService.getWorkDetail();
      if (response.data) {
        setWorkMeta({
          workId: response.data.workId,
          challengeTitle: response.data.challengeTitle,
          originalUrl: response.data.originalUrl
        });
        setContent(response.data.content);
        setIsSubmitted(response.data.content === "");
      }
    };
    fetchInitialData();
  }, []);

  // 작업물 업데이트
  const handleUpdateWork = async () => {
    try {
      await workService.updateWork(workMeta.workId, content === "<p></p>" ? "" : content);
      updateModalState("isSubmitConfirmOpen", false);
      router.refresh();
      return true;
    } catch (error) {
      console.error("작업물 업데이트 실패:", error);
      return false;
    }
  };

  // 작업물 삭제
  const handleDeleteWork = async () => {
    try {
      const deleteResult = await workService.deleteWork(workMeta.workId);
      if (deleteResult.status === 204) {
        updateModalState("isDeleteConfirmOpen", false);
        router.push(`/challenges/${challengeId}`);
        return true;
      }
      return false;
    } catch (error) {
      console.error("작업물 삭제 실패:", error);
      return false;
    }
  };

  return {
    content,
    setContent,
    isSubmitted,
    workMeta,
    handleUpdateWork,
    handleDeleteWork
  };
};
