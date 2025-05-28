"use client";

import Container from "@/components/container/PageContainer";
import EmailInput from "@/components/input/EmailInput";
import PasswordInput from "@/components/input/PasswordInput";
import SubmitButton from "@/components/btn/auth/SubmitButton";
import Logo from "@/layout/_components/Logo";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import GoogleLoginButton from "@/components/btn/auth/GoogleLoginButton";

export default function SignInPage() {
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error("로그인 실패", error);
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  // 임시 로딩 UI
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4">인증 정보를 확인 중입니다...</p>
      </div>
    );
  }

  return (
    <Container>
      <div className="mt-15 mb-30 flex flex-col items-center md:mt-30">
        <Logo className="mb-10 h-[54px] w-60 md:h-18 md:w-80" />
        <form className="mb-[18px] space-y-6" onSubmit={handleLogin}>
          <EmailInput
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <PasswordInput
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <SubmitButton type="로그인" hasInputValue={true} />
        </form>
        <GoogleLoginButton />
        <div className="text-[#262626] mt-6 space-x-2">
          <span className="text-base">회원이 아니신가요? </span>
          <Link href="/signUp">
            <span className="text-base underline">회원가입하기</span>
          </Link>
        </div>
      </div>
    </Container>
  );
}
