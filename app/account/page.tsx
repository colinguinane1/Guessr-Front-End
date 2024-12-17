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

export const getLevelByXP = (xp: number) => {
  let level = 1; // Default to level 1 if no XP is found

  // Loop through the levels to determine the level based on XP
  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i].xp) {
      level = levels[i].level + 1; // Move to next level if XP exceeds threshold
    } else {
      break; // Once we find the level, stop
    }
  }

  return level;
};

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

  // Get the next level number based on the current XP
  const getNextLevelByXP = (xp: number) => {
    let nextLevel = 1; // Default to level 1 if no XP is found

    // Loop through the levels to determine the next level based on XP
    for (let i = 0; i < levels.length; i++) {
      if (xp >= levels[i].xp) {
        nextLevel = levels[i].level + 1; // Get the next level if XP is above threshold
      } else {
        break;
      }
    }

    return nextLevel;
  };

  // Get XP required to reach the next level
  const getXpTilNextLevel = (xp: number) => {
    let xpTilNextLevel = 0;

    // Loop through the levels to determine how much XP is needed for the next level
    for (let i = 0; i < levels.length; i++) {
      if (xp < levels[i].xp) {
        xpTilNextLevel = levels[i].xp - xp; // Calculate XP remaining for next level
        break;
      }
    }

    return xpTilNextLevel;
  };

  // Get the XP threshold for the next level
  const getNextLevelThreshold = (xp: number) => {
    let nextLevelThreshold = 0;

    // Loop through the levels to determine the XP threshold for the next level
    for (let i = 0; i < levels.length; i++) {
      if (xp < levels[i].xp) {
        nextLevelThreshold = levels[i].xp;
        break;
      }
    }

    return nextLevelThreshold;
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

  const playerLevel = getLevelByXP(user.xp); // Get the player's current level
  const nextLevel = getNextLevelByXP(user.xp); // Get the next level number
  const xpTilNextLevel = getXpTilNextLevel(user.xp); // Get XP required to next level

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
            value={(user.xp / getNextLevelThreshold(user.xp)) * 100}
            gaugePrimaryColor="rgb(79 70 229)"
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
          />
        </div>
        <div>
          <p>
            <h1 className="font-bold">{user.username}</h1>
          </p>
          <p className="text-sm text-primary/50">
            Level {playerLevel} - {user.xp} / {getNextLevelThreshold(user.xp)}
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
