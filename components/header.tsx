"use client";
import Link from "next/link";
import { ModeToggle } from "./ui/theme-switcher";
import { Button } from "./ui/button";
import { useUser } from "@/context/UserContext";
import LogoutButton from "./LogOutButton";
export default function Header() {
  const Navigation = [
    { name: "Play", href: "/" },
    { name: "History", href: "/history" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];

  const { user } = useUser();
  const loggedIn = user !== null;

  return (
    <header className="w-screen border-b">
      <section className="w-full p-4 flex  items-center justify-between">
        <div>
          <p className="font-extrabold">Numby</p>
        </div>
        <div className=" flex items-center gap-4">
          <ModeToggle />
          {Navigation.map((nav) => (
            <Link href={nav.href} className="" key={nav.name}>
              {nav.name}
            </Link>
          ))}
          {loggedIn ? (
            <LogoutButton />
          ) : (
            <Link href="/register">
              <Button className="font-bold">Login</Button>
            </Link>
          )}
        </div>
      </section>
    </header>
  );
}
