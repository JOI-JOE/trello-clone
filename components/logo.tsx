import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.jpg" height={40} width={40} alt="Logo" />
        <p className="text-lg text-neutral-700 pb-1">Taskify</p>
      </div>
    </Link>
  );
};

export default Logo;
