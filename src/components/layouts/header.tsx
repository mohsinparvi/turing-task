import React from "react";
import Logo from "../common/logo";

import Logout from "../common/logout";

const Header = () => {
  return (
    <header className="container mx-auto px-4 lg:px-6 border-b border-gray-300">
      <div className="flex items-center justify-between p-4   ">
        <Logo />
        <Logout />
      </div>
    </header>
  );
};

export default Header;
