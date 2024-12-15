"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";

// export interface User {
//   _id: string;
//   email: string;
//   username: string;
//   password: string;
//   guessed_numbers: Difficulty[];
//   xp: number;
//   profile_views: number;
// }

export const user_columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "guessed_numbers",
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
