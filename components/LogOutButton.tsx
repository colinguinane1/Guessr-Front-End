"use client";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
const LogoutButton = () => {
  const { setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Button
      className="bg-red-500   z-10 w-full max-w-2xl"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
