import BtnText from '@/components/btn/text/BtnText';
import outCircle from '@/assets/icon/ic_out_circle.svg';
import Image from 'next/image';

export default function DraftCheckModal({ setHasDraft, onDraftModal }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-10 w-full max-w-4xl -translate-x-1/2 px-4">
      <div className="flex w-full items-center justify-between gap-4 rounded-xl border border-gray-800 bg-gray-50 px-2 py-2">
        <div className="flex items-center gap-2">
          <button onClick={() => setHasDraft(false)}>
            <Image src={outCircle} alt="모달닫기" className="h-6 w-6" />
          </button>
          <span className="text-[14px] font-semibold">
            임시 저장된 작업물이 있어요. 저장된 작업물을 불러오시겠어요?
          </span>
        </div>

        <BtnText theme="solidblack" className="h-[32px] max-w-[90px] rounded-xl py-2" onClick={onDraftModal}>
          불러오기
        </BtnText>
      </div>
    </div>
  );
}
