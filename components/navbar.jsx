"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, MoveLeft, MoveRight, Tv2 } from "lucide-react";
import { motion } from "framer-motion";
import { Separator } from "./ui/separator";
import NavSelect from "./navSelect";
import { Input } from "./ui/input";
import NavDropDown from "./ui/navDropDown";
import { DarkModeToggle } from "./darkModeToggle";
import { Button } from "./ui/button";
import AuthLinks from "./AuthLinks";

const Navbar = ({ toggle }) => {
  const [isHidden, setIsHidden] = useState(false);

  const toggleClassName = () => {
    setIsHidden(!isHidden);
  };

  return (
    <nav className="bg-primary w-full sm:px-5 py-3 fixed z-50">
      <div className=" container w-full flex flex-row justify-between items-center gap-3">
        <div className="flex text-white flex-row gap-8">
          <span className="gap-4 items-center flex">
            <Link href="/" className="hidden sm:block">
              <Tv2 strokeWidth={3} />
            </Link>
            <Link href="/" className={isHidden ? "hidden sm:block" : "hidden"}>
              Showcase
            </Link>
          </span>
          <span
            className="items-center flex sm:hidden lg:flex cursor-pointer"
            onClick={toggle}
          >
            <div onClick={toggleClassName} className="hidden sm:block">
              <motion.div
                initial={{ x: -20 }}
                transition={{ type: "spring", stiffness: 200 }}
                whileInView={{ x: 0 }}
                className={isHidden ? "block" : "hidden"}
              >
                <Menu />
              </motion.div>

              <motion.div
                initial={{ x: 20 }}
                transition={{ type: "spring", stiffness: 500 }}
                whileInView={{ x: -20 }}
                className={isHidden ? "hidden" : "block"}
              >
                <MoveRight />
              </motion.div>
            </div>

            <div onClick={toggleClassName} className="block sm:hidden">
              {isHidden ? (
                <motion.div
                  initial={{ x: -20 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  whileInView={{ x: 20 }}
                  // className={isHidden ? "hidden " : "block"}
                >
                  <MoveLeft />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ x: 20 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  whileInView={{ x: -20 }}
                  // className={isHidden ? "block" : "hidden"}
                >
                  <Menu />
                </motion.div>
              )}
            </div>
          </span>
        </div>
        {/* <div className="flex-row max-w-[600px] w-full h-fit gap-3 text-white items-center hidden min-[500px]:flex bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-[0.2px] border-opacity-50 border-gray-200">
          <div className="w-[50%]">
            <NavSelect />
          </div>
          <Separator
            orientation="vertical"
            className="h-[25px] border border-white"
          />
          <Input
            className="bg-transparent focus:outline-none border-none text-white placeholder:text-white"
            placeholder="What do you want to eat today"
          />
        </div> */}

        <div className="flex flex-row gap-4 items-center">
          <span className="hidden sm:block">
            <DarkModeToggle />
          </span>
          <AuthLinks />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
