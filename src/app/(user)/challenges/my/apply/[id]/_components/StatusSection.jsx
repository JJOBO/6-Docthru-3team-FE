import React from "react";

function StatusBar({ adminStatus, adminMessage }) {
  const commonStyle =
    "flex justify-center items-center w-full h-[35px] mt-4 md:mt-6 rounded-[17.5px] text-sm font-semibold md:text-base";
  const statusMap = {
    PENDING: {
      style: "bg-[#FFFDE7] text-[#F2BC00]",
      message: "승인 대기 중입니다."
    },
    REJECTED: {
      style: "bg-[#FFF0F0] text-[#E54946]",
      message: "신청이 거절된 챌린지입니다.",
      text: "신청 거절 사유"
    },
    DELETED: {
      style: "bg-gray-500 text-gray-50",
      message: "삭제된 챌린지입니다.",
      text: "삭제 사유"
    },
    ACCEPTED: {
      style: "bg-[#DFF0FF] text-[#4095DE]",
      message: "신청이 승인된 챌린지입니다."
    }
  };

  const { style, message, text } = statusMap[adminStatus];

  return (
    <section>
      <div className={`${commonStyle} ${style}`}>{message}</div>
      {(adminStatus === "DELETED" || adminStatus === "REJECTED") && (
        <div className="flex flex-col justify-center w-full h-[149px] bg-gray-50 border border-gray-200 rounded-2xl p-4 gap-4 mt-4">
          <div className="flex flex-col items-center gap-3">
            <span className="text-gray-800 text-sm font-semibold">{text}</span>
            <p className="text-sm font-medium md:text-base">{adminMessage}</p>
          </div>
          <div className="flex justify-end items-center text-sm font-normal">
            <span className="text-gray-700">독스루 운영진</span>
            <span className="flex flex-col border border-gray-200 h-4 mx-2"></span>
            <span className="text-gray-500">24/02/24 16:38</span>
          </div>
        </div>
      )}
    </section>
  );
}

export default StatusBar;
