"use client";
import { AiOutlineRight } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const NavDropDown = () => {
  const { data: session } = useSession();

  // console.log(session);
  return (
    <div className="flex gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {session ? (
            <Button
              variant="outline"
              className="bg-gray-200 bg-opacity-20 border-none hover:bg-gray-200/20"
            >
              <span className="flex flex-row items-center gap-2 text-white">
                <Avatar>
                  <AvatarImage src={session.user.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <p className="hidden md:block">{session.user.name}</p>
                <span className="py-4 rotate-90 hidden md:block">
                  <AiOutlineRight />
                </span>
              </span>
            </Button>
          ) : (
            <></>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/profile" className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={signOut}
              className="w-full cursor-pointer"
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavDropDown;
