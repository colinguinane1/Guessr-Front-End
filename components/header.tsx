"use client";
import Link from "next/link";
import { ModeToggle } from "./ui/theme-switcher";
import UserIcon from "./user-icon";
import Image from "next/image";
import { MdLeaderboard } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { GoHistory } from "react-icons/go";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const Navigation = [
    { name: "Play", href: "/", icon: <IoHome /> },
    { name: "History", href: "/history", icon: <GoHistory /> },
    { name: "Leaderboard", href: "/leaderboard", icon: <MdLeaderboard /> },
  ];
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const currentIndex = Navigation.findIndex((nav) => nav.href === pathname);
    if (currentIndex !== -1) {
      setCurrentTab(currentIndex);
    }
  }, [pathname]);

  return (
    <header className="w-screen shadow-sm border-b">
      <section className="w-full p-4 flex  items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-extrabold ">
            <Image src="/icon.png" alt="logo" width={40} height={40} />
          </Link>
        </div>
        <div className="items-center flex gap-6">
          {Navigation.map((nav, index) => (
            <Link
              href={nav.href}
              onClick={() => setCurrentTab(index)}
              className={`flex items-center hover:bg-secondary/70 gap-1 p-1 px-2 rounded-md ${
                currentTab === index && "bg-secondary/70"
              }`}
              key={nav.name}
            >
              {nav.icon}
              <p className="hidden md:block">{nav.name}</p>
            </Link>
          ))}
        </div>{" "}
        <UserIcon />
      </section>
    </header>
  );
}
