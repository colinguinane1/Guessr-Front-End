"use client";
import { useEffect, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { CgSpinner } from "react-icons/cg";

export default function Home() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/numbers/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid min-h-screen min-w-screen place-content-center">
        <p>
          <CgSpinner size={50} className="animate-spin " />
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-items-center p-4 gap-16 sm:p-20">
      {data && (
        <>
          <p>Fetched from {process.env.NEXT_PUBLIC_BACK_END_URL}</p>
          <TabGroup>
            <TabList className="flex items-center gap-4 capitalize">
              {Object.entries(data).map(([key]) => (
                <Tab
                  className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white capitalize"
                  key={key}
                >
                  {key}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              <TabPanel>Content 1</TabPanel>
              <TabPanel>Content 2</TabPanel>
              <TabPanel>Content 3</TabPanel>
            </TabPanels>
          </TabGroup>
        </>
      )}
    </div>
  );
}
