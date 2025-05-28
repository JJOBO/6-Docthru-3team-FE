import { useState, useRef, useEffect } from "react";

export const useDraft = (workId, setContent) => {
  const timeoutRef = useRef(null);
  const [draftState, setDraftState] = useState({
    hasDraft: false,
    isDrafting: false,
    isModalOpen: false
  });

  // 드래프트 상태 업데이트 핸들러
  const updateDraftState = (key, value) => {
    setDraftState((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  // 현재 draft 존재 여부 확인
  useEffect(() => {
    const localDraft = localStorage.getItem("draft");
    if (localDraft?.length > 0) {
      updateDraftState("hasDraft", true);
    }
  }, []);

  // 임시저장 모달 토글
  const toggleDraftModal = () => {
    updateDraftState("isModalOpen", !draftState.isModalOpen);
    if (!draftState.isModalOpen) {
      updateDraftState("hasDraft", false);
    }
  };

  // 임시저장 불러오기
  const loadDraft = (item) => {
    setContent(item.content);
  };

  // 임시저장 로직
  const saveDraft = (challengeTitle, content) => {
    if (content === "<p></p>") return;

    updateDraftState("isDrafting", true);

    const oldDraft = localStorage.getItem("draft");
    const newDraftItem = {
      id: workId,
      title: challengeTitle,
      content,
      createdAt: new Date().toISOString()
    };

    if (oldDraft) {
      const parsedDraft = JSON.parse(oldDraft);
      const drafts = Array.isArray(parsedDraft) ? parsedDraft : [];
      const existingDraftIndex = drafts.findIndex((draft) => draft.id === workId);

      if (existingDraftIndex !== -1) {
        drafts[existingDraftIndex] = { ...drafts[existingDraftIndex], ...newDraftItem };
      } else {
        drafts.push(newDraftItem);
      }

      localStorage.setItem("draft", JSON.stringify(drafts));
    } else {
      localStorage.setItem("draft", JSON.stringify([newDraftItem]));
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      updateDraftState("isDrafting", false);
    }, 800);
  };

  return {
    draftState,
    updateDraftState,
    toggleDraftModal,
    saveDraft,
    loadDraft
  };
};
