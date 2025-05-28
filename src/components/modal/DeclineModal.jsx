"use client";
import Image from "next/image";
import React, { useState } from "react";
import out from "@/assets/icon/ic_out.svg";

export default function DeclineModal({ text = "거절", onClose, onConfirm }) {
  const [reason, setReason] = useState("");

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = () => {
    onConfirm?.(reason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative min-h-[407px] w-[343px] rounded-lg border-2 border-gray-800 bg-white p-4 md:min-h-[423px] md:w-[496px] md:p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer md:top-6 md:right-6"
        >
          <Image src={out} width={24} height={24} alt="out" />
        </button>

        <h2 className="mb-6 text-base font-bold text-gray-800 md:text-lg">
          {`${text} 사유`}
        </h2>

        <label
          htmlFor="reject-reason"
          className="mb-2 block font-normal text-gray-900 md:text-base"
        >
          내용
        </label>

        <textarea
          id="reject-reason"
          rows={5}
          placeholder={`${text}사유를 입력해주세요`}
          className="mb-4 min-h-[219px] w-full resize-none rounded-md border border-gray-300 bg-white px-5 py-4 text-base placeholder:text-gray-500 focus:outline md:mb-6 md:text-base"
          value={reason}
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          className="bg-brand-black h-12 w-full rounded-xl text-base font-semibold text-white transition hover:bg-black"
        >
          전송
        </button>
      </div>
    </div>
  );
}