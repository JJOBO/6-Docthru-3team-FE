import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // refreshToken 기반 인증 여부 판단 (httpOnly 쿠키는 JS에서는 못 보지만 서버에서는 접근 가능)
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isAuthenticated = !!refreshToken;

  // 로그인/회원가입 경로 여부 (인증 상태에 따라 접근 차단 목적)
  const isAuthRoute = pathname.startsWith("/signIn") || pathname.startsWith("/signUp");

  // 인증된 사용자만 접근 가능한 경로
  const isProtectedRoute = pathname.startsWith("/challenges") || pathname.startsWith("/admin");

  // 인증된 사용자가 로그인/회원가입 페이지에 접근하면 → 챌린지 목록 페이지로 리디렉션
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/challenges", request.url));
  }
  // 인증되지 않은 사용자가 보호 페이지 접근 시 → 로그인 페이지로 리디렉션
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }
  // 그 외 모든 경우는 요청 계속 진행
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 패턴 지정
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
