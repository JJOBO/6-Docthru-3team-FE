import { useState } from "react";

export const useModalControl = () => {
  const [modalState, setModalState] = useState({
    isOriginalPageOpen: false,
    isDeleteConfirmOpen: false,
    isSubmitConfirmOpen: false
  });

  const updateModalState = (modalType, isOpen) => {
    console.log("modalType", modalType);
    console.log("isOpen", isOpen);
    setModalState((prev) => ({
      ...prev,
      [modalType]: isOpen
    }));
  };

  const toggleModal = (modalType) => {
    updateModalState(modalType, !modalState[modalType]);
  };

  return {
    modalState,
    updateModalState,
    toggleModal
  };
};
