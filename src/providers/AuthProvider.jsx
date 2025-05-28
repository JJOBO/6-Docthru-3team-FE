"use client";

import { loginAction, registerAction } from "@/lib/actions/auth";
import { userService } from "@/lib/service/userService";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "@/lib/service/authService";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  register: () => {},
  updateUser: () => {},
  user: null,
  isLoading: true
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const getUser = async () => {
    try {
      const user = await userService.getMe();
      setUser(user);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
      throw error;
    }
  };

  const register = async (email, nickname, password, passwordConfirmation) => {
    setIsLoading(true);
    try {
      const userData = await registerAction(email, nickname, password, passwordConfirmation);
      if (userData?.error) {
        console.log(userData);
        return userData;
      }
      console.log("회원가입 성공:", userData);
      return userData;
    } catch (error) {
      console.error("회원가입 실패:", error.message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const userData = await loginAction(email, password);
      console.log("loginAction 결과 (서버 응답 확인):", userData);

      if (userData?.error) {
        throw new Error(userData.message || "로그인에 실패했습니다.");
      }
      getUser();
      router.push("/challenges");
    } catch (error) {
      console.error("로그인 실패:", error.message);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    router.push("/signIn");
  };

  useEffect(() => {
    const excludeRoutes = ["/", "/signIn", "/signUp"];

    if (!excludeRoutes.includes(pathname)) {
      getUser();
    } else {
      setIsLoading(false);
    }
  }, [pathname]);

  return <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>{children}</AuthContext.Provider>;
}
