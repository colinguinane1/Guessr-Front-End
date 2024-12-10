"use client";
import { useUser } from "@/context/UserContext"; // Import the useUser hook
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { PulseLoader } from "react-spinners";
import LogOutButton from "@/components/LogOutButton";
export default function UserProfile() {
  const { user } = useUser(); // Access the user data from the context

  if (!user) {
    return (
      <div className="grid place-content-center animate-pulse h-[calc(100vh-100px)]">
        <div className="flex justify-center items-center gap-2">
          <PulseLoader size={8} />
          <p>Loading...</p>
        </div>
      </div>
    ); // Or handle the case when the user is not logged in
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
      <LogOutButton />
    </div>
  );
}
