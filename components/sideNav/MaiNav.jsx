"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import SideBar from "./sideBar";
import IconSideBar from "./iconSideBar";

const MaiNav = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [data, setData] = useState(null);

  const toggleClassName = () => {
    setIsHidden(!isHidden);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/categories", {
          cache: "no-store", // for production use cache
        });
        if (res.ok) {
          const result = await res.json();
          setData(result);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="h-screen  flex flex-col">
      <Navbar toggle={toggleClassName} />
      <div className="flex h-full">
        <div className="flex ml-auto">
          {/* Pass the data to the SideBar and IconSideBar components as props */}
          <SideBar isHidden={isHidden} data={data} />
          <IconSideBar isHidden={isHidden} data={data} />
        </div>
      </div>
    </main>
  );
};

export default MaiNav;
