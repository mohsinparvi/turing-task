import React from "react";
import Logo from "../common/logo";

import Logout from "../common/logout";
import { getCookie } from "cookies-next";

const Header = () => {
  const accessToken = getCookie("accessToken");
  return (
    <header className="container mx-auto px-4 lg:px-6 border-b border-gray-300">
      <div className="flex items-center justify-between p-4   ">
        <Logo />
        {accessToken && <Logout />}
      </div>
    </header>
  );
};

export default Header;
