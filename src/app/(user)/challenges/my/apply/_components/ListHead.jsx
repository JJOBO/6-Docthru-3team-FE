import { columnSetting } from "@/constant/constant";
import React from "react";

export default function ListHead() {
  return (
    <div className="w-full min-w-[670px] h-9 flex mb-2">
      {columnSetting.map(({ label, flex }, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === columnSetting.length - 1;
        return (
          <div
            key={idx}
            className={`
                    flex text-white px-1 text-left text-sm items-center bg-gray-800
                    ${isFirst ? "pl-4 rounded-tl-lg rounded-bl-lg" : ""}
                    ${isLast ? "rounded-tr-lg rounded-br-lg" : ""}
                `}
            style={{ flex }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}
