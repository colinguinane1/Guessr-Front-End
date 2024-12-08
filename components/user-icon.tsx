"use client";
import {
  ModalRoot,
  ModalTrigger,
  ModalContent,
} from "@/components/ui/modal-drawer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import LogOutButton from "@/components/LogOutButton";
import { CiSettings } from "react-icons/ci";
import Login from "@/components/login";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMediaQuery } from "@/utils/media-query";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function UserIcon() {
  const { user } = useUser();
  const isdesktop = useMediaQuery("(min-width: 768px)");

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
          <Link className="flex items-center" href="/account">
            {" "}
            <CiSettings /> Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="mt-auto">
          <LogOutButton />
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
        <div className="flex justify-between flex-col h-full p-4">
          <Link className="flex items-center" href="/account">
            {" "}
            <CiSettings /> Account
          </Link>
          <div className="mt-20 flex justify-between">
            <div></div>
            <LogOutButton />
          </div>
        </div>
      </ModalContent>
    </ModalRoot>
  );
}
