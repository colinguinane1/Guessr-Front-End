"use client";
import { Difficulty } from "@/types/difficulty";
import { useEffect, useState } from "react";
import { DataTable } from "@/app/history/data-table";
import { columns } from "@/app/history/columns";
import api from "@/utils/axios";

export default function History() {
  const [data, setData] = useState<Difficulty[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/numbers/all`);
        if (!response.data) {
          console.log("No data found");
          return;
        }
        const data = response.data;

        // Remove the last 4 difficulties from the data array
        const filteredData = data.slice(0, data.length - 5);

        setData(filteredData); // Set the filtered data in the state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <section className={`p-4 max-w-4xl mx-auto`}>
      <h1 className="text-2xl font-bold py-4">History</h1>
      <DataTable columns={columns} data={data} />
    </section>
  );
}
