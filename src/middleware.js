import { NextResponse } from "next/server";

export function middleware(request) {
  // const { pathname } = request.nextUrl;
  // // ✅ refreshToken 기반 인증 여부 판단 (httpOnly 쿠키는 JS에서는 못 보지만 서버에서는 접근 가능)
  // // 개발환경에서는 항상 인증된 상태로, 프로덕션에서는 실제 쿠키로 확인
  // // const isAuthenticated =
  // //   process.env.NODE_ENV === "production"
  // //     ? !!request.cookies.get("refreshToken")?.value
  // //     : true;
  // const isAuthenticated = request.cookies.get("refreshToken")?.value;
  // // ✅ 로그인/회원가입 경로 여부 (인증 상태에 따라 접근 차단 목적)
  // const isAuthRoute =
  //   pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  // // ✅ 보호할 개별 정규 경로 조건: /blogs/[id]/edit 형식
  // const isEditRoute = /^\/blogs\/[0-9]+\/edit$/.test(pathname);
  // // ✅ 완전 일치 기반 보호 경로들 (추후 prefix 기반 보호가 필요하면 startsWith로 변경 가능)
  // const protectedRoutes = ["/community/write", "/product/write"];
  // // ✅ 보호되어야 하는 전체 경로 판단
  // const isProtectedRoute = protectedRoutes.includes(pathname) || isEditRoute;
  // // ✅ 인증된 사용자가 로그인/회원가입 페이지에 접근하면 → 리디렉션 (불필요한 접근 방지)
  // if (isAuthRoute && isAuthenticated) {
  //   return NextResponse.redirect(new URL("/items", request.url));
  // }
  // // ✅ 인증되지 않은 사용자가 보호 페이지 접근 시 → 로그인 페이지로 리디렉션
  // if (isProtectedRoute && !isAuthenticated) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }
  // // ✅ 그 외 모든 경우는 요청 계속 진행
  // return NextResponse.next();
}

// ✅ 정적 파일이나 API 경로 제외하고 미들웨어 실행할 페이지 정의
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
