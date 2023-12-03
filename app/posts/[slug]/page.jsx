import Image from "next/image";
import React from "react";
import Comments from "@/components/comments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const page = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);

  // console.log(data.Post);
  return (
    <div className=" container flex flex-col  justify-center items-center pt-20 overflow-y-auto">
      <div className="flex flex-col md:flex-row gap-3">
        {data.img ? (
          <Image
            src={data?.img}
            alt="post image"
            width={500}
            height={500}
            className="object-cover rounded-md"
          />
        ) : (
          <Image
            src="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="default image"
            width={500}
            height={500}
            className="object-cover rounded-md"
          />
        )}
        <div>
          <p>{data.title}</p>
          <p>{data.desc}</p>
          <p>{data.catSlug}</p>
          <span className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src={data?.user.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{data?.user.name}</p>
          </span>
        </div>
      </div>
      <Comments postSlug={slug} />
    </div>
  );
};

export default page;
