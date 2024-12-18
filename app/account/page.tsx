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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    const response = await api.post("/api/auth/account", {
      userId: user._id,
      username: changeUsername,
      password: changePassword,
    })  
    if (response.status !== 200) {
      console.error("No user data in response");
      toast.error("Error updating account.");
      setFormLoading(false);
    }
     else {
      toast.success("Account updated successfully!"); 
       setFormLoading(false);
    }
  
    refetchUserData();
    }


  return (
    <div className="flex flex-col items-center p-4  text-lg space-y-4 justify-center">
      <UserCard user={user} />
      <form onSubmit={handleSubmit} className="flex-col space-y-2 bg-card border p-4 rounded-xl items-center gap-4">
        <h1 className="flex items-center gap-2"><MdManageAccounts/>Account Settings</h1>
        <div>
        <div> <Label htmlFor="username" >Email</Label>
        <Input  id="password" type="text" placeholder="Email" disabled value={user.email}></Input></div>
        <Label htmlFor="username" >Username</Label>
        <Input onChange={(e) => setChangeUsername(e.target.value)} id="username" type="text" placeholder="Change Username" value={changeUsername}></Input></div>
          <div> <Label htmlFor="username" >Password</Label>
        <Input onChange={(e) => setChangePassword(e.target.value)} id="password" type="text" placeholder="Change Password" value={changePassword}></Input></div>
        <Button type="submit" disabled={formLoading}>{formLoading ? <Loading/> : "Save"}</Button>
      </form>
      <p>Email: {user.email}</p>

      <p>{user.profile_views} profile views.</p>
      <p>
        {user.guessed_numbers.map((number) => (
          <div key={number._id}>
            <p>{number.value}</p>
          </div>
        ))}
      </p>
      <LogOutButton />
      <ModeToggle />
    </div>
  );
}
