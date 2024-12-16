"use client";

import { useEffect, useState } from "react";
import { user_columns } from "./columns";
import { DataTable } from "../history/data-table";
import api from "@/utils/axios";
import { User } from "@/types/user";

export default function History() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/auth/all-users`);
        if (!response.data) {
          console.log("No data found");
          return;
        }
        const data = response.data;

        setData(data); // Set the filtered data in the state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <section className={`p-4 max-w-4xl mx-auto`}>
      <h1 className="text-2xl font-bold py-4">Leaderboard</h1>
      <DataTable columns={user_columns} data={data} />
    </section>
  );
}
