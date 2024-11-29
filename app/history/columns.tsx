"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Difficulty} from "@/types/difficulty";

/*export type Difficulty = {
    _id: string;
    difficulty: string;
    max: number;
    value: number;
    color: string;
    attempts: number;
    expires: string; // ISO 8601 date string
    global_user_guesses: number;
    created: string;
    __v: number;
};*/
const formatDate = (isoString: string) => {
    const date = new Date(isoString); // Create a Date object from the ISO string

    const day = date.getDate(); // Get the day of the month
    const month = date.toLocaleString('default', { month: 'short' }); // Get the abbreviated month name (e.g., "Apr")
    const year = date.getFullYear(); // Get the full year (e.g., 2024)

    // Return the formatted date string
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
        accessorKey: "created",
        header: "Created",
        cell: ({ getValue }) => {
            const isoString = getValue<string>(); // Get the value of 'created'
            return formatDate(isoString); // Format and display the date
        },
    },
    {
        accessorKey: "color",
        header: "Color",
    },
]
