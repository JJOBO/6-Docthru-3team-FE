import React from "react";

function CancelDropdown({ className }) {
  return (
    <div>
      <div
        className={`flex justify-center items-center  bg-white w-35 h-10 border-gray-300 border p-4 rounded-lg hover:bg-gray-50 ${className}`}
      >
        <div className="text-gray-500 text-sm md:text-base">취소하기</div>
      </div>
    </div>
  );
}

export default CancelDropdown;
