import Image from "next/image";
import React from "react";
import outCircle from "@/assets/icon/ic_out_circle.svg";
import BtnText from "@/components/btn/text/BtnText";

export default function OriginalPageModal({ pageUrl, onClose, modalState, originalPageUrl }) {
  return (
    <div>
      {/* 모달 상태에 따라 모달 렌더링 (삼항 연산으로 한 이유는 애니메이션시 이게더 자연스럽게 나와서) */}
      {modalState ? (
        <div className="fixed top-0 right-0 z-1 flex h-[350px] w-full flex-col transition-all duration-300 sm:h-full sm:w-[300px] xl:w-[640px]">
          <div className="flex h-[48px] items-center justify-between gap-2 bg-gray-800/50 px-4 py-2">
            <button onClick={onClose}>
              <Image src={outCircle} alt="모달닫기" className="h-8 w-8" />
            </button>
            <BtnText
              theme="link"
              className="h-[32px]"
              onClick={() => {
                window.open(originalPageUrl, "_blank");
              }}
            >
              링크 열기
            </BtnText>
          </div>
          {pageUrl ? (
            <iframe
              src={pageUrl}
              title="원문 페이지"
              className="h-full w-full border-0"
              loading="lazy"
              allow="clipboard-read; clipboard-write"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              원문 페이지를 불러올 수 없습니다.
            </div>
          )}
        </div>
      ) : (
        <div className="fixed top-[-350px] right-0 z-1 flex h-[350px] w-full flex-col sm:top-0 sm:right-[-300px] sm:h-full sm:w-[300px] xl:right-[-640px] xl:w-[640px]">
          <div className="flex h-[48px] items-center justify-between gap-2 bg-gray-800/50 px-4 py-2">
            <button onClick={onClose}>
              <Image src={outCircle} alt="모달닫기" className="h-8 w-8" />
            </button>
            {/* 이부분은 리팩터링 필요함 버튼의 w 가 안 덮어씌워짐 */}
            <BtnText
              theme="link"
              className="h-[32px]"
              onClick={() => {
                window.open(originalPageUrl, "_blank");
              }}
            >
              링크 열기
            </BtnText>
          </div>
          <iframe
            src={pageUrl}
            title="원문 페이지"
            className="h-full w-full border-0"
            loading="lazy"
            allow="clipboard-read; clipboard-write"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      )}
    </div>
  );
}
