"use client";

import { TbHandClick } from "react-icons/tb";
import { FaLink } from "react-icons/fa6";
import { useState, useEffect } from "react";

function LinkStats() {
  const [totalLinks, setTotalLinks] = useState<number>(0);

  const fetchUpdatedStats = async () => {
    try {
      const response = await fetch('/auth/getURLs');
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

  useEffect(() => {
    fetchUpdatedStats();
  }, []);

  return (
    <div className="flex justify-between mt-8 text-VeryDarkBlue">
      <div
        className="flex flex-col md:flex-row md:gap-5 items-center font-semibold text-lg bg-white p-3 md:p-5 rounded-xl md:px-10 shadow-md hover:cursor-pointer"
        title="This is the total number of links you have shortened"
      >
        <p className="flex gap-2 items-center ">
          <FaLink size={25} color="hsl(256, 26%, 33%)" /> Total No. of Links
        </p>
        <p>{totalLinks}</p>
      </div>
      <div
        className="flex flex-col md:flex-row md:gap-5 items-center font-semibold text-lg bg-white p-3 md:p-5 rounded-xl md:px-10 shadow-md hover:cursor-pointer"
        title="This is the total number of clicks gotten from all links summed together"
      >
        <p className="flex gap-2 items-center ">
          <TbHandClick size={25} color="hsl(256, 26%, 33%)" />
          Total No. of clicks
        </p>
        <p>20</p>
      </div>
    </div>
  );
}

export default LinkStats;