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

  const getLevelByXP = (xp: number) => {
    let level = 1; // Default to level 1 if no XP is found
    for (let i = 0; i < levels.length; i++) {
      if (xp >= levels[i].xp) {
        level = levels[i].level;
      } else {
        break; // Stop once we find the level
      }
    }
    return level;
  };

  const getNextLevelByXP = (xp: number) => {
    let level = 1; // Default to level 1 if no XP is found
    for (let i = 0; i < levels.length; i++) {
      if (xp >= levels[i].xp) {
        level = levels[i].level;
      } else {
        break; // Stop once we find the level
      }
    }
    return level + 1;
  };

  const getNextLevelThreshold = (xp: number) => {
    let nextLevelThreshold = 0;
    for (let i = 0; i < levels.length; i++) {
      if (xp < levels[i].xp) {
        nextLevelThreshold = levels[i].xp;
        break; // Stop once we find the level
      }
    }
    return nextLevelThreshold;
  };

  const getXpTilNextLevel = (xp: number) => {
    let xpTilNextLevel = 0;
    for (let i = 0; i < levels.length; i++) {
      if (xp < levels[i].xp) {
        xpTilNextLevel = levels[i].xp - xp;
        break; // Stop once we find the level
      }
    }
    return xpTilNextLevel;
  };

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

  const levelPercentage =
    (getXpTilNextLevel(user.xp) / getNextLevelThreshold(user.xp)) * 100;

  return (
    <div className="flex flex-col items-center p-4  text-lg space-y-4 justify-center">
      <div className="flex items-center bg-primary-foreground p-4 rounded-xl gap-4">
        <Avatar className="w-20 h-20 relative">
          <AvatarFallback className="w-20 h-20 text-2xl">
            {user.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>{" "}
        <div className="absolute top-8">
          <AnimatedCircularProgressBar
            label={``}
            max={100}
            min={0}
            value={levelPercentage}
            gaugePrimaryColor="rgb(79 70 229)"
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
          />
        </div>
        <div>
          <p>
            <h1 className="font-normal">{user.username}</h1>
          </p>
          <p>
            {getXpTilNextLevel(user.xp)}XP til Level {getNextLevelByXP(user.xp)}
          </p>
        </div>
      </div>

      <p>Email: {user.email}</p>

      <p>{user.profile_views} profile views. (TODO)</p>
      <LogOutButton />
      <ModeToggle />
    </div>
  );
}
