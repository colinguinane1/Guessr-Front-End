"use client";
import {
  ModalRoot,
  ModalTrigger,
  ModalContent,
} from "@/components/ui/modal-drawer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CiLogout } from "react-icons/ci";
import { useUser } from "@/context/UserContext";
import LogOutButton from "@/components/LogOutButton";
import { CiSettings } from "react-icons/ci";
import Login from "@/components/login";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMediaQuery } from "@/utils/media-query";
import { useRouter } from "next/navigation";
import { CiUser } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function UserIcon() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const isdesktop = useMediaQuery("(min-width: 768px)");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  if (!user) {
    return (
      <ModalRoot>
        <ModalTrigger className="px-2 flex items-center gap-1">
          <CiUser size={20} />
          <p className="text-sm hidden md:block">Login</p>
        </ModalTrigger>
        <ModalContent>
          <Login />
        </ModalContent>
      </ModalRoot>
    );
  }
  return (
    <Link href="/account" className="flex px-2 items-center gap-1">
      <Avatar className="cursor-pointer p-1">
        <AvatarFallback>
          {user.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <p className="text-sm hidden md:block">Account</p>
    </Link>
  );
}
