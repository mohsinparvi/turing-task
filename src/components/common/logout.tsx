"use client";
import { useAuth } from "@/lib/hooks/use-auth";
import { Button } from "../ui/button";

const Logout = () => {
  const { logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {isAuthenticated && (
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
