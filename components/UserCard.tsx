"use client";
import { User } from "@/types/user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AnimatedCircularProgressBar from "./ui/animated-circular-progress-bar";
import { levels } from "@/types/levels";
import { useEffect, useState } from "react";

const getLevelByXP = (xp: number) => {
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

interface UserCardProps {
  user: User | null;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [levelProgress, setLevelProgress] = useState(0);

  useEffect(() => {
    if (user) {
      setInterval(() => {
        setLevelProgress((user.xp / getNextLevelThreshold(user.xp)) * 100);
      }, 100);
    }
  });
  if (!user) {
    return (
      <div className="flex items-center bg-card border p-4 rounded-xl gap-4">
        No user found
      </div>
    );
  }

  const playerLevel = getLevelByXP(user.xp); // Get the player's current level
  const nextLevel = getNextLevelByXP(user.xp); // Get the next level number
  const xpTilNextLevel = getXpTilNextLevel(user.xp); // Get XP required to next level
  return (
    <div className="flex items-center bg-card border w-full max-w-2xl  p-4 rounded-xl gap-4">
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
          value={levelProgress}
          gaugePrimaryColor="rgb(0 200 0)"
          gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
        />
      </div>
      <div>
        <p>
          <h1 className="font-bold">{user.username}</h1>
        </p>
        <p className="text-sm text-primary/50">
          Level {playerLevel} - {user.xp} / {getNextLevelThreshold(user.xp)} XP
        </p>
      </div>
    </div>
  );
};

export default UserCard;
