"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * 개발용 네비게이션 컴포넌트
 * @returns {React.ReactElement} 네비게이션 컴포넌트
 */
export default function DevNavigation() {
  const pathname = usePathname();

  const routes = [
    { path: "/", name: "랜딩 페이지" },
    // 사용자 관련 라우트
    { path: "/signIn", name: "로그인" },
    { path: "/signUp", name: "회원가입" },
    { path: "/article", name: "문서 목록" },
    { path: "/challenge", name: "챌린지" },
    // 관리자 관련 라우트
    { path: "/admin", name: "관리자 메인" },
    { path: "/admin/management", name: "관리자 대시보드" },
  ];

  return (
    <nav className="bg-brand-black fixed bottom-0 left-0 z-50 w-full p-2 text-white">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-brand-yellow mr-2 font-semibold">
          개발용 네비게이션:
        </span>
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={`rounded px-3 py-1 text-sm ${
              pathname === route.path
                ? "bg-brand-yellow text-brand-black font-medium"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {route.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
