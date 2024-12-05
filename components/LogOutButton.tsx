"use client";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const LogoutButton = () => {
  const { setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
