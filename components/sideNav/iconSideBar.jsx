import React from "react";
import { usePathname } from "next/navigation";
import {
  Wallpaper,
  Server,
  Layers3,
  Palette,
  LayoutGrid,
  Briefcase,
} from "lucide-react";

import { motion } from "framer-motion";
import Link from "next/link";

const IconSideBar = ({ isHidden, data }) => {
  const pathname = usePathname();

  // console.log(data);
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 600, damping: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className={
        isHidden
          ? "hidden"
          : "md:flex pt-[115px] border-r-2 border-primary/50 hidden "
      }
    >
      <div className="flex flex-col gap-5 p-4 border-none">
        <Link
          href="/"
          className={
            pathname === "/"
              ? "flex p-4 bg-primary hover:text-white rounded-md"
              : "flex p-4 hover:bg-primary hover:text-white rounded-md"
          }
        >
          <LayoutGrid />
        </Link>

        {data?.map((item) => (
          <Link
            key={item._id}
            href={`/${item.slug}`}
            className={
              pathname === `/${item.slug}`
                ? "flex gap-5 p-4 bg-primary hover:text-white rounded-md"
                : "flex gap-5 p-4 hover:bg-primary hover:text-white rounded-md"
            }
          >
            {getIconForCategory(item.slug)}
          </Link>
        ))}

        <Link
          href="/portfolio"
          className={
            pathname === "/portfolio"
              ? "flex p-4 bg-primary hover:text-white rounded-md"
              : "flex p-4 hover:bg-primary hover:text-white rounded-md"
          }
        >
          <Briefcase />
        </Link>
      </div>
    </motion.div>
  );
};

// Helper function to choose an icon based on the category slug
const getIconForCategory = (slug) => {
  switch (slug) {
    case "frontend":
      return <Wallpaper />;
    case "backend":
      return <Server />;
    case "fullstack":
      return <Layers3 />;
    case "uiux":
      return <Palette />;
    default:
      return null;
  }
};

export default IconSideBar;
