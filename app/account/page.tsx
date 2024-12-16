"use client";
import { useUser } from "@/context/UserContext"; // Import the useUser hook
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Login from "@/components/login";
import { Drawer } from "vaul";
import LogOutButton from "@/components/LogOutButton";
import { ModeToggle } from "@/components/ui/theme-switcher";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
export default function UserProfile() {
  const { user, refetchUserData } = useUser();
  const [loading, setLoading] = useState(true);

  // Refetch to make sure data is up to date.
  useEffect(() => {
    if (!user) {
      refetchUserData();
    } else {
      setLoading(false);
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
    <div className="flex flex-col items-center p-4  text-lg space-y-4 justify-center">
      <Avatar className="w-40 h-40">
        <AvatarFallback className="w-40 h-40 text-4xl">
          {user.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <h1 className=" font-bold">
        Welcome, <span className="font-normal">{user.username}</span>
      </h1>
      <p>ID: {user._id}</p>
      <p>Email: {user.email}</p>
      <p>XP: {user.xp}</p>
      <p>{user.profile_views} profile views. (TODO)</p>
      <LogOutButton />
      <ModeToggle />
    </div>
  );
}
