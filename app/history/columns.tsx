"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Difficulty } from "@/types/difficulty";

// export type Difficulty = {
//   difficulty: string;
//   min: number;
//   max: number;
//   value: number;
//   color: string;
//   attempts: number;
//   expires: Date;
//   created: Date;
//   global_user_guesses: number;
//   correct_user_guesses: number;
//   correct_users: User;
//   v: string;
// };

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export const columns: ColumnDef<Difficulty>[] = [
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
  {
    accessorKey: "value",
    header: "Number",
  },
  {
    accessorKey: "global_user_guesses",
    header: "Guesses",
  },
  {
    accessorKey: "correct_user_guesses",
    header: "Correct Guesses",
  },
  {
    header: "%Correct",
    cell: ({ row }) => {
      const { global_user_guesses, correct_user_guesses } = row.original;
      const percentage = (correct_user_guesses / global_user_guesses) * 100;
      if (isNaN(percentage)) return "0.00%";
      return `${percentage.toFixed(2)}%`;
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ getValue }) => {
      const isoString = getValue<string>(); // Get the value of 'created'
      return formatDate(isoString); // Format and display the date
    },
  },
];
