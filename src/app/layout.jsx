import "./globals.css";
import localFont from "next/font/local";
import DevNavigation from "@/components/DevNavigation";
import Providers from "./provider";

const pretendard = localFont({
  src: "../assets/font/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard"
});

const quanticoRegular = localFont({
  src: "../assets/font/QuanticoRegular.ttf",
  display: "swap",
  weight: "400",
  variable: "--font-quantico-regular"
});

const quanticoBold = localFont({
  src: "../assets/font/QuanticoBold.ttf",
  display: "swap",
  weight: "700",
  variable: "--font-quantico-bold"
});

export const metadata = {
  title: "Docthur - 독스루",
  description: "개발문서 번역 플랫폼"
};

// RootLayout을 async 함수로 변경하여 서버 사이드에서 데이터 페칭 가능하게 함
export default async function RootLayout({ children }) {
  return (
    <html lang="ko">
      <link rel="icon" href="/favicon.svg" />
      <body className={`${pretendard.variable} font-pretendard flex min-h-screen flex-col antialiased`}>
        <Providers>
          <main className="flex-grow">{children}</main>
        </Providers>

        <DevNavigation />
      </body>
    </html>
  );
}
