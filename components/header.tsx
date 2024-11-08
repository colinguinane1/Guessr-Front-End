import Link from "next/link";
import { ModeToggle } from "./ui/theme-switcher";

export default function Header() {
  const Navigation = [
    { name: "Play", href: "/" },
    { name: "History", href: "/history" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];
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
        </div>
      </section>
    </header>
  );
}
