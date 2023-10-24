"use client";

import React from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comments = ({ postSlug }) => {
  const { status } = useSession();

  const { data, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  console.log(data);
  return (
    <section className="my-10 flex flex-col w-full max-w-[800px] mx-auto ">
      {status === "unauthenticated" ? (
        <Label htmlFor="message" className="my-4">
          LOG IN TO LEAVE A COMMENT
        </Label>
      ) : (
        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="my-4">
            LEAVE A COMMENT
          </Label>
          <div className="flex sm:flex-row flex-col items-center  gap-4 w-full">
            <div className="w-full gap-1.5">
              <Textarea
                placeholder="Type your message here."
                id="message"
                className="min-h-[50px] border border-gray-400 dark:border-gray-600"
              />
            </div>
            <Button size={"lg"} className="text-lg py-2 w-full sm:w-fit">
              Send
            </Button>
          </div>
        </div>
      )}
      {isLoading
        ? "Loading"
        : data?.map((item) => (
            <div key={item._id} className="flex flex-col gap-1 mt-5">
              <span className="flex items-center gap-2 text-[10px]">
                {item.user.image && (
                  <Avatar>
                    <AvatarImage src={item.user.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
                <span>
                  <p>{item.user.name}</p>
                  <p>{item.createdAt.substring(0, 10)}</p>
                </span>
              </span>
              <p className="pl-4 text-sm">{item.desc}</p>
            </div>
          ))}
    </section>
  );
};

export default Comments;
