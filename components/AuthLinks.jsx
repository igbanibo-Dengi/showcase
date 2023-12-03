import React from "react";
import NavDropDown from "./ui/navDropDown";
import { useSession } from "next-auth/react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import LoginModal from "./loginModal";
import { Button } from "./ui/button";
import Link from "next/link";

const AuthLinks = () => {
  const { status } = useSession();

  // console.log(status);

  return (
    <div className="flex gap-5 items-center">
      {status === "unauthenticated" ? (
        <>
          <AlertDialog>
            <AlertDialogTrigger className="text-white">
              Login
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <AlertDialogTitle>
                    Log in with your social accounts
                  </AlertDialogTitle>
                </AlertDialogTitle>
                {/* <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription> */}
              </AlertDialogHeader>
              <LoginModal />
              <AlertDialogFooter>
                <AlertDialogCancel>back</AlertDialogCancel>
                {/* <AlertDialogAction>Continue</AlertDialogAction> */}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger className="bg-white text-primary py-2 px-4 hover:bg-white/80 rounded-md">
              Sign in
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Sign in with your social accounts
                </AlertDialogTitle>
                {/* <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription> */}
              </AlertDialogHeader>
              <LoginModal />
              <AlertDialogFooter>
                <AlertDialogCancel>back</AlertDialogCancel>
                {/* <AlertDialogAction>Continue</AlertDialogAction> */}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : (
        <span className="flex items-center gap-3">
          <NavDropDown />
          <Link href="/create">
            <Button className="bg-white text-primary hover:bg-white/80">
              New post
            </Button>
          </Link>
        </span>
      )}
    </div>
  );
};

export default AuthLinks;
