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

export const user_columns: ColumnDef<User>[] = [
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
