'use client'
import {Difficulty} from "@/types/difficulty";
import {useEffect, useState} from "react";
import {DataTable} from "@/app/history/data-table";
import {columns} from "@/app/history/columns";

export default function History() {
    const [data, setData] = useState<Difficulty[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/numbers/all`);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    return (<div className={`grid place-content-center w-screen`}><div className={`p-4 w-full`}><div className={`w-full`}><DataTable columns={columns} data={data}/></div></div></div>)
}