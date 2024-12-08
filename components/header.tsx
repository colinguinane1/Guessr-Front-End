"use client";
import Link from "next/link";
import { ModeToggle } from "./ui/theme-switcher";
import { Button } from "./ui/button";
import { useUser } from "@/context/UserContext";
import LogoutButton from "./LogOutButton";
import UserIcon from "./user-icon";
export default function Header() {
  const Navigation = [
    { name: "Play", href: "/" },
    { name: "History", href: "/history" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];

  const { user } = useUser();
  const loggedIn = user !== null;

  return (
    <header className="w-screen shadow-sm border-b">
      <section className="w-full p-4 flex  items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="font-extrabold">Numby</p>
          <ModeToggle />
        </div>
        <div className=" flex items-center hidden md:flex gap-4">
          {Navigation.map((nav) => (
            <Link href={nav.href} className="" key={nav.name}>
              {nav.name}
            </Link>
          ))}
        </div>{" "}
        <UserIcon />
      </section>
    </header>
  );
}
