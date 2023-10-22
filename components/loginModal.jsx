import React from "react";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";

import { signIn, useSession } from "next-auth/react";
import { BiLogoGoogle } from "react-icons/bi";

const LoginModal = () => {
  const { data, status } = useSession();
  // console.log(status);

  return (
    <div className="flex-col justify-center gap-5 text-center p-10">
      <div className="flex flex-col gap-5">
        <Button variant="outline" onClick={() => signIn("google")}>
          <span className="flex w-[200px] justify-center gap-5 items-center">
            <BiLogoGoogle size={25} />
          </span>
        </Button>

        <Button variant="outline" onClick={() => signIn("github")}>
          <span className="flex w-[200px] justify-center gap-5 items-center">
            <FaGithub size={25} />
          </span>
        </Button>

        <Button variant="outline" onClick={() => signIn("twitter")}>
          <span className="flex w-[200px] justify-center gap-5 items-center">
            <RiTwitterXLine size={25} />
          </span>
        </Button>

        <Button variant="outline" onClick={() => signIn("linkedin")}>
          <span className="flex w-[200px] justify-center gap-5 items-center">
            <FaLinkedinIn size={25} />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default LoginModal;
