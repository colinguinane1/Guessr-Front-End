"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import Link from "next/link";
import { ExternalLink, ExternalLinkIcon } from "lucide-react";


// export interface User {
//   _id: string;
//   email: string;
//   username: string;
//   password: string;
//   guessed_numbers: Difficulty[];
//   xp: number;
//   profile_views: number;
// }

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

export const user_columns: ColumnDef<User>[] = [
  {
    accessorFn: (row) => getLevelByXP(row.xp),
    header: "Level",
  },
  {
    id: "username",
    header: "Username",
    cell: ({ row }) => (
      <Link
        className="flex gap-2 hover:underline items-center"
        href={`/profile/${row.original._id}`}
      >
        {row.original.username} <ExternalLinkIcon size={12} />
      </Link>
    ),
  },
  {
    accessorFn: (row) => row.guessed_numbers.length,
    id: "guessed_numbers_length",
    header: "Guessed Numbers",
  },
  {
    accessorKey: "xp",
    header: "XP",
  },
  {
    accessorKey: "profile_views",
    header: "Profile Views",
  },
];
