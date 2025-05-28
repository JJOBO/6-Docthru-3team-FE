import { APPLY_DROPDOWN_OPTIONS } from "@/constant/constant";
import React from "react";

function ApplyDropdown() {
  return (
    <div className="flex flex-col bg-white w-35 border border-gray-300 rounded-lg overflow-hidden">
      {APPLY_DROPDOWN_OPTIONS.map((label, index) => (
        <div
          key={index}
          className={`flex justify-start items-center bg-white h-[41px] md:h-[43px] px-4 border-b border-gray-300 last:border-b-0 ${
            index === 0 ? "rounded-t-lg" : index === APPLY_DROPDOWN_OPTIONS.length - 1 ? "rounded-b-lg" : ""
          }`}
        >
          <div className="text-gray-500 text-sm md:text-base">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default ApplyDropdown;
