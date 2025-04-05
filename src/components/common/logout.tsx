"use client";
import { useAuth } from "@/lib/hooks/use-auth";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const Logout = () => {
  const { logout, isAuthenticated } = useAuth();
  const pathname = usePathname();


  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {isAuthenticated && pathname !== '/auth/login' && (
        <Button
          variant="default"
          color="blue"
          className="text-white hover:bg-[var(--primary)]/90"
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}
    </>
  );
};

export default Logout;
