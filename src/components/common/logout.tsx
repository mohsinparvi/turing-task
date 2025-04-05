"use client";
import { Button } from "../ui/button";
import { deleteCookie } from "cookies-next";

const Logout = () => {
  const handleLogout = () => {
    deleteCookie("accessToken");
    window.location.href = "/auth/login"; // Redirect to login page after logout
  };
  return (
    <div>
      {/* bg-[var(--primary)] */}
      <Button
        variant="default"
        color="blue"
        className="  text-white hover: bg-[var(--primary)]/90"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
