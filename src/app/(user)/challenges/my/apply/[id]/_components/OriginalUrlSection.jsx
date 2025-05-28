import BtnText from "@/components/btn/text/BtnText";
import React from "react";

export default function OriginalUrlSection() {
  return (
    <section className="flex flex-col w-full h-screen">
      <h4 className="font-semibold text-gray-800 mb-4">원문 링크</h4>
      <div className="relative">
        <div className="absolute top-3 right-4">
          <BtnText
            theme="link"
            className="h-8"
            onClick={() => {
              window.open(originalPageUrl, "_blank");
            }}
          >
            링크 열기
          </BtnText>
        </div>
        <iframe
          src="https://react-hook-form.com/get-started"
          title="원문 페이지"
          className="h-full w-full border-0"
          style={{ height: "calc(100vh - 400px)" }}
          loading="lazy"
          allow="clipboard-read; clipboard-write"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </section>
  );
}
