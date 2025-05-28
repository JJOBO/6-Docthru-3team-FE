import BtnText from "@/components/btn/text/BtnText";
import Logo from "@/layout/_components/Logo";

// 제출하기 or 수정하기 선택 가능
export default function EditorHeader({ challengeTitle, content, onDraft, isSubmitted, isSubmitModal, onDiscardModal }) {
  return (
    <header className="flex items-center justify-between py-4">
      <Logo className="sm:w-30 sm:h-[27px]" />

      <div className="flex gap-2">
        <BtnText
          theme="tonal"
          icon
          className="min-w-[36px] px-4 py-2 sm:min-w-[90px] sm:px-0"
          onClick={onDiscardModal}
        />

        <BtnText theme="outline" className="min-w-[90px] px-4 py-2" onClick={() => onDraft(challengeTitle, content)}>
          임시저장
        </BtnText>

        {isSubmitted && (
          <BtnText theme="solidblack" className="min-w-[90px] px-4 py-2" onClick={isSubmitModal}>
            제출하기
          </BtnText>
        )}

        {!isSubmitted && (
          <BtnText theme="solidblack" className="min-w-[90px] px-4 py-2" onClick={isSubmitModal}>
            수정하기
          </BtnText>
        )}
      </div>
    </header>
  );
}
