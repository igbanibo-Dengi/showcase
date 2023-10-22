import React from "react";
import Link from "next/link";
import {
  Wallpaper,
  Server,
  Layers3,
  Palette,
  LayoutGrid,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const SideBar = ({ isHidden, data }) => {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className={
        isHidden
          ? "px-5 w-[200px] border-r-2 border-primary/50 h-[100%] overflow-y-auto pt-[135px]  absolute md:relative z-10 bg-background"
          : "hidden"
      }
    >
      <div className="flex flex-col gap-5">
        <Link
          href="/"
          className={
            pathname === "/"
              ? "flex gap-5 p-4 bg-primary hover:text-white rounded-md"
              : "flex gap-5 p-4 hover:bg-primary hover:text-white rounded-md"
          }
        >
          <LayoutGrid />
          <p>All</p>
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
            <p>{item.title}</p>
          </Link>
        ))}

        <Link
          href="/portfolio"
          className={
            pathname === "/portfolio"
              ? "flex gap-5 p-4 bg-primary hover:text-white rounded-md"
              : "flex gap-5 p-4 hover:bg-primary hover:text-white rounded-md"
          }
        >
          <Briefcase />
          <p>Portfolios</p>
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

export default SideBar;
