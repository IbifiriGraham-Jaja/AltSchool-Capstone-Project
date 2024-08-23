"use client";

import { TbHandClick } from "react-icons/tb";
import { FaLink } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { error } from "console";

function LinkStats() {
  const [totalLinks, setTotalLinks] = useState<number>(0);
  const [totalClicks, setTotalClicks] = useState<number>(0);

  const fetchUpdatedStats = async () => {
    try {
      const response = await fetch("/auth/getURLs");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (!data.error) {
        setTotalLinks(data.length);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching updated stats:", error);
    }
  };

  const fetchClickStats = async () => {
    try {
      const clicks = await fetch("/auth/getClickNum");
      if (!clicks.ok) {
        throw new Error("Network response was not ok" );
      }

      const clickData = await clicks.json();
      if (!clickData.error) {
        setTotalClicks(clickData.length);
      } else {
        console.error(clickData.error);
      }
    } catch (error) {
      console.error("Error fetching updated stats:", error);
    }
  };

  useEffect(() => {
    fetchUpdatedStats();
    fetchClickStats();
  }, []);

  return (
    <div className="flex justify-between mt-8 text-VeryDarkBlue">
      <div
        className="flex flex-col md:flex-row md:gap-5 items-center font-semibold text-lg bg-white p-3 md:p-5 rounded-xl md:px-10 shadow-md hover:cursor-pointer"
        title="This is the total number of links you shortened"
      >
        <p className="flex gap-2 items-center ">
          <FaLink size={25} color="hsl(256, 26%, 33%)" /> Total Links
        </p>
        <p>{totalLinks}</p>
      </div>
      <div
        className="flex flex-col md:flex-row md:gap-5 items-center font-semibold text-lg bg-white p-3 md:p-5 rounded-xl md:px-10 shadow-md hover:cursor-pointer"
        title="This is the total number of clicks gotten from all links put together"
      >
        <p className="flex gap-2 items-center ">
          <TbHandClick size={25} color="hsl(256, 26%, 33%)" />
          Total clicks
        </p>
        <p>{totalClicks}</p>
      </div>
    </div>
  );
}

export default LinkStats;