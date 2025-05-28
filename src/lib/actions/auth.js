"use server";

import { BASE_URL } from "@/constant/constant";
import { cookies } from "next/headers";

export async function getServerSideToken(cookieName) {
  try {
    const cookieStore = cookies();
    const isToken = cookieStore.get(cookieName)?.value;
    console.log(`[getServerSideToken] Fetched '${cookieName}':`, isToken ? "Found" : "Not Found");
    const token = await cookieStore.get(cookieName)?.value;
    return token;
  } catch (error) {
    console.error(`[getServerSideToken] Error getting '${cookieName}':`, error);
    return undefined;
  }
}

export async function loginAction(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store"
    });

    if (!res.ok) {
      const data = await res.json();
      console.error("로그인 실패 응답:", data);
      return { error: true, message: data.message || "로그인 실패" };
    }

    const userData = await res.json();

    const setCookieHeader = res.headers.get("Set-Cookie");

    if (setCookieHeader) {
      console.log("Backend Set-Cookie header received in loginAction:", setCookieHeader);

      const cookieParts = setCookieHeader.split(", ").flatMap((part) => part.split(","));
      const cookieStore = cookies();

      cookieParts.forEach((cookieString) => {
        const [nameValuePair, ...attributes] = cookieString.split(";").map((s) => s.trim());
        const [name, value] = nameValuePair.split("=");

        const cookieOptions = {};
        attributes.forEach((attr) => {
          const lowerAttr = attr.toLowerCase();
          if (lowerAttr.startsWith("max-age")) {
            cookieOptions.maxAge = parseInt(attr.split("=")[1], 10);
          } else if (lowerAttr.startsWith("path")) {
            cookieOptions.path = attr.split("=")[1];
          } else if (lowerAttr.startsWith("expires")) {
            cookieOptions.expires = new Date(attr.split("=")[1]);
          } else if (lowerAttr === "httponly") {
            cookieOptions.httpOnly = true;
          } else if (lowerAttr.startsWith("samesite")) {
            cookieOptions.sameSite = attr.split("=")[1];
          } else if (lowerAttr === "secure") {
            cookieOptions.secure = true;
          }
        });

        if (name && value) {
          cookieStore.set(name, value, cookieOptions);
          console.log(`[loginAction] Set server cookie: ${name}`);
        }
      });
    } else {
      console.warn("No Set-Cookie header received from backend for login.");
    }

    return { success: true, user: userData };
  } catch (error) {
    console.error("로그인 액션 오류:", error.message);
    return { error: true, message: error.message || "로그인 중 알 수 없는 오류 발생" };
  }
}

export async function registerAction(email, nickname, password, passwordConfirmation) {
  try {
    const res = await fetch(`${BASE_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
      cache: "no-store"
    });

    const data = await res.json();
    if (!res.ok) {
      return { error: true, message: data.message || "회원가입 실패" };
    }
    return { success: true, user: data };
  } catch (error) {
    return { error: true, message: error.message || "회원가입 오류" };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return { success: true };
  } catch (error) {
    return { error: true, message: error.message };
  }
}

// 401 에러 발생 시 토큰 자동 갱신(TODO: 수정필요)
export async function getUserWithAutoRefresh() {
  const tryFetch = async () =>
    await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      cache: "no-store"
    });

  const res = await tryFetch();
  if (res.ok) return await res.json();
  if (res.status === 401) {
    const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      cache: "no-store"
    });
    if (!refreshRes.ok) throw new Error("리프레시 토큰 만료됨");
    const retry = await tryFetch();
    if (!retry.ok) throw new Error("토큰 갱신 후 재요청 실패");
    return await retry.json();
  }
  throw new Error("유저 정보 조회 실패");
}
