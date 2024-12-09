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
        <ModalTrigger>
          <Button>Log In</Button>
        </ModalTrigger>
        <ModalContent>
          <Login />
        </ModalContent>
      </ModalRoot>
    );
  }

  return isdesktop ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>
            {user.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2">
        <DropdownMenuItem className="flex items-center gap-2">
          <Link className="flex items-center gap-1" href="/account">
            {" "}
            <CiSettings size={20} /> Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLogout()}
          className="mt-auto cursor-pointer"
        >
          <CiLogout color="red" size={20} />
          <p className="text-red-500">Logout</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <ModalRoot>
      <ModalTrigger>
        <Avatar>
          <AvatarFallback>
            {user.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </ModalTrigger>
      <ModalContent>
        <div className="flex justify-between gap-4 flex-col h-full p-4">
          <Link className="flex items-center gap-1" href="/account">
            {" "}
            <CiSettings size={15} /> Account
          </Link>
          <div className="mb-20 cursor-pointer items-center flex gap-1 ">
            <CiLogout color="red" size={15} />
            <p className="text-red-500">Logout</p>
          </div>
        </div>
      </ModalContent>
    </ModalRoot>
  );
}
