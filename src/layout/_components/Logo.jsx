import React from "react";
import logo from "@/assets/img/img_logo.svg";
import Link from "next/link";
import Image from "next/image";

export default function Logo({ width = 80, height = 21, className }) {
  return (
    <Link href="/">
      <Image src={logo} alt="Docthur 로고" width={width} height={height} className={`${className}`} />
    </Link>
  );
}
