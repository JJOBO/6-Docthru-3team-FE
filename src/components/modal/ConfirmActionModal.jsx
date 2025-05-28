"use client";
import Image from "next/image";
import React from "react";
import check from "@/assets/icon/check.svg";
import { useRouter } from "next/navigation";

export default function ConfirmActionModal({ text, onClose, onConfirm, isLoggedIn }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="min-h-[187px] w-full max-w-[327px] rounded-xl border-2 border-gray-800 bg-white px-[14.5px] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="mb-7 min-h-[67px]">
            <div className="mb-6 flex justify-center">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black">
                <Image src={check} width={12} height={12} alt="check" />
              </div>
            </div>
            <div className="text-center text-base font-medium text-gray-800">
              {isLoggedIn ? (
                text
              ) : (
                <>
                  {"로그인이 필요한 기능이에요,"}
                  <br />
                  {"로그인 하시겠어요?"}
                </>
              )}
            </div>
          </div>

          {isLoggedIn ? (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={onClose}
                className="h-10 w-22.5 cursor-pointer rounded-xl border border-gray-800 bg-white text-base font-semibold text-gray-800 transition hover:bg-gray-100"
              >
                아니요
              </button>
              <button
                onClick={onConfirm}
                className="bg-brand-black h-10 w-22.5 cursor-pointer rounded-xl text-base font-semibold text-white transition hover:bg-black"
              >
                네
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => router.push("/signIn")}
                className="bg-brand-black h-10 w-[153px] cursor-pointer items-center rounded-xl text-base font-semibold text-white transition hover:bg-black"
              >
                로그인하러 가기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
