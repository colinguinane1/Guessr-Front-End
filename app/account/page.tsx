"use client";
import { useUser } from "@/context/UserContext"; // Import the useUser hook
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Login from "@/components/login";
import { Drawer } from "vaul";
import LogOutButton from "@/components/LogOutButton";
import { ModeToggle } from "@/components/ui/theme-switcher";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { levels } from "@/types/levels";
import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";
import UserCard from "@/components/UserCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MdManageAccounts } from "react-icons/md";
import api from "@/utils/axios";
import { toast } from "sonner";
import Loading from "@/components/ui/loading";
import AccountSettings from "@/components/account-settings";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function UserProfile() {
  const { user, refetchUserData } = useUser();
  const [loading, setLoading] = useState(true);
  const [changeUsername, setChangeUsername] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  // Refetch to make sure data is up to date.
  useEffect(() => {
    if (!user) {
      refetchUserData();
    } else {
      setLoading(false);
      setChangeUsername(user.username);
      setChangePassword(user.password);
    }
  }, [user, refetchUserData]);

  if (!user) {
    return (
      <Drawer.Root modal={false} open={true}>
        <Drawer.Trigger className="relative flex px-3"></Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <Drawer.Content
            className="fixed bottom-20  outline-none w-screen "
            style={
              {
                "--initial-transform": "calc(100% + 8px)",
              } as React.CSSProperties
            }
          >
            <div className="flex flex-col p-4 w-full items-center justify-center rounded-[16px]">
              <div className="max-w-[500px] rounded-xl backdrop-blur-[1px]  w-full  p-4 border">
                <Login />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  if (loading) {
    return (
      <div className="grid min-h-screen min-w-screen place-content-center">
        <p>
          <CgSpinner size={50} className="animate-spin" />
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full p-4 text-lg">
      <div className="w-full max-w-4xl p-4 rounded-xl gap-4 space-y-4">
        <h1 className="font-bold text-2xl">Account</h1>
        <UserCard user={user} />
        <Link
          className="flex items-center text-sm text-primary/50 underline"
          href={`/profile/${user._id}`}
        >
          View Public Profile <ChevronRight />
        </Link>
        <AccountSettings user={user} />
        <LogOutButton />
        <ModeToggle />
      </div>
    </div>
  );
}
