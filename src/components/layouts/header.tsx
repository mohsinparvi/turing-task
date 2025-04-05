import React from "react";
import Logo from "../common/logo";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="container mx-auto px-4 lg:px-6">
      <div className="flex items-center justify-between p-4  border-b border-gray-300 ">
        <Logo />
        <Button
          variant="outline"
          className="bg-white text-black hover:bg-gray-200"
          // onClick={() => alert("Button Clicked!")}
        >
          Click Me
        </Button>
      </div>
    </header>
  );
};

export default Header;
