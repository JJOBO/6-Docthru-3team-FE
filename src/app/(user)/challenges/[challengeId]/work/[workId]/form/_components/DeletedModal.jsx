import DeleteModal from "@/components/modal/ConfirmActionModal";

export default function DeletedModal({ onClose, onConfirm }) {
  return <DeleteModal text="정말 포기하시겠습니까?" isLoggedIn={true} onClose={onClose} onConfirm={onConfirm} />;
}
