"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";

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

  const { data, mutate, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });

    mutate();
    setDesc("");
  };

  // console.log(data);
  const comments = data?.reverse();

  // console.log(comments);
  return (
    <section className="my-10 flex flex-col w-full max-w-[800px] mx-auto ">
      {status === "unauthenticated" ? (
        <Label htmlFor="message" className="my-4">
          LOG IN TO LEAVE A COMMENT
        </Label>
      ) : (
        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="my-4">
            COMMENTS
          </Label>
          <form
            onSubmit={handleSubmit}
            className="flex sm:flex-row flex-col items-center  gap-4 w-full"
          >
            <Textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Type your message here."
              id="message"
              className="min-h-[40px] border border-gray-400 dark:border-gray-600"
            />

            <Button
              // onClick={handleSubmit}
              type="submit"
              size={"lg"}
              className="text-lg py-2 w-full sm:w-fit"
            >
              Send
            </Button>
          </form>
        </div>
      )}
      {isLoading
        ? "Loading"
        : data?.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row-reverse justify-between md:items-center gap-1 mt-5 border-b pb-2"
            >
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
