import Image from "next/image";
import originalPageModalBtn from "@/assets/icon/ic_list.svg";

export default function OriginalPageModalBtn({
  isOriginalPageModal,
  onOpenOriginalPageModal,
}) {
  return (
    <>
      {!isOriginalPageModal && (
        <button
          className="fixed top-[117px] right-0 z-10 rounded-tl-full rounded-bl-full border border-gray-100 bg-white py-3.5 pr-2 pl-3.5 shadow-md sm:top-[123px] md:rounded-tl-3xl md:rounded-bl-3xl md:py-5 md:pr-3 md:pl-4"
          onClick={onOpenOriginalPageModal}
        >
          <div className="flex items-center gap-2 md:flex-col">
            <Image
              src={originalPageModalBtn}
              alt="원본 on/off 모달"
              className="h-6 w-6"
            />
            <span className="text-[16px] font-semibold text-gray-500 transition-all duration-300 hover:text-gray-800">
              원문
            </span>
          </div>
        </button>
      )}
    </>
  );
}
