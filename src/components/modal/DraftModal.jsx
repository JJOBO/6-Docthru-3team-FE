"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import out from "@/assets/icon/ic_out.svg";
import DeleteModal from "./ConfirmActionModal";

// 날짜 포맷 함수 ex) 2024. 12. 24.
function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d)) return "";
  return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, "0")}. ${String(d.getDate()).padStart(2, "0")}.`;
}

export default function DraftModal({ onClose, isLoggedIn = true, onLoadItem }) {
  const [items, setItems] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);

  // 로컬스토리지에서 데이터 불러오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = window.localStorage.getItem("draft");
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          parsed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setItems(parsed);
        } catch {
          setItems([]);
        }
      }
    }
  }, []);

  // "네"를 눌렀을 때: 해당 임시저장글을 불러오고 삭제
  const handleLoadAndDelete = () => {
    if (selectedIdx === null) return;
    const selectedItem = items[selectedIdx];
    onLoadItem?.({ content: selectedItem.content });
    const newItems = items.filter((_, idx) => idx !== selectedIdx);
    setItems(newItems);
    window.localStorage.setItem("draft", JSON.stringify(newItems));
    setSelectedIdx(null);
    if (newItems.length <= 0) {
      window.localStorage.removeItem("draft");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[343px] rounded-xl border-2 border-gray-800 bg-white px-6 py-7 shadow-lg">
        <div className="mb-7 flex items-center justify-between">
          <span className="text-base font-semibold text-gray-800">임시저장 글</span>
          <button onClick={onClose}>
            <Image src={out} width={24} height={24} alt="out" />
          </button>
        </div>
        <div className="mb-1 text-xs font-normal text-gray-800">총 {items.length}개</div>
        <ul className="max-h-[300px] overflow-y-auto">
          {items.map((item, idx) => (
            <li
              key={item.id || idx}
              className={`cursor-pointer py-3 ${idx !== items.length - 1 ? "border-b border-gray-200" : ""}`}
              onClick={() => setSelectedIdx(idx)}
            >
              <div className="mb-1 text-sm font-medium text-gray-800">{item.title || "제목 없음"}</div>
              <div className="text-xs font-normal text-gray-400">{formatDate(item.createdAt)}</div>
            </li>
          ))}
        </ul>
      </div>
      {selectedIdx !== null && (
        <DeleteModal
          text="이전 작업물을 불러오시겠어요?"
          isLoggedIn={isLoggedIn}
          onClose={() => setSelectedIdx(null)}
          onConfirm={handleLoadAndDelete}
        />
      )}
    </div>
  );
}
