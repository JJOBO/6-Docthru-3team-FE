"use client";

import React from "react";
import Image from "next/image";
import userImage from "@/assets/img/profile_member.svg";
import adminImage from "@/assets/img/profile_admin.svg";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

function Profile() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const isAdmin = user?.role === "ADMIN";
  const isExpert = user?.grade === "EXPERT";
  const grade = isAdmin ? "어드민" : isExpert ? "전문가" : "일반";

  const handleClickMychallenge = () => {
    router.push("/challenges/my");
  };

  return (
    <div className="flex w-fit flex-col items-start rounded-[8px] bg-[#FFFFFF] px-[16px] pt-[16px] pb-[8px] border border-gray-100">
      <div className="flex min-w-38 flex-row justify-baseline gap-[8px]">
        <Image src={isAdmin ? adminImage : userImage} alt="프로필 이미지" width={32} height={32} />
        <div className="flex flex-col gap-[2px]">
          <div className="text-[14px] font-medium text-[var(--color-gray-800)]">{user?.nickname}</div>
          <div className="text-[12px] font-medium text-[var(--color-gray-500)]">{grade}</div>
        </div>
      </div>
      <span className="flex w-full border-b-2 border-gray-100 my-2"></span>
      {!isAdmin && (
        <button
          className="h-8 text-sm md:text-base font-medium text-[var(--color-gray-800)]"
          onClick={handleClickMychallenge}
        >
          나의 챌린지
        </button>
      )}
      <button className="h-8 text-sm md:text-base font-medium text-[var(--color-gray-400)]" onClick={logout}>
        로그아웃
      </button>
    </div>
  );
}

export default Profile;
