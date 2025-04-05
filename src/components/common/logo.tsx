import { TuringLogo } from "@/assets/images";
import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <Image
      src={TuringLogo}
      alt="Logo"
      width={400}
      height={400}
      className="object-cover"
    />
  );
};

export default Logo;
