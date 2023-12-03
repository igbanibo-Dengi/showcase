"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

const getData = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/profile`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error; // Re-throw the error for the calling code to handle
  }
};

const Page = () => {
  const status = useSession();
  console.log(status);
  if (status === "unauthenticated") {
    router.push("/");
  }
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure useEffect runs only once on mount

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : data ? (
        <div>
          <p>{data.name}</p>
          <Avatar>
            <AvatarImage src={data.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

          <div className="grid grid-cols-3 gap-5">
            {data.Post && data.Post.length > 0 ? (
              data.Post.map((item) => (
                <div key={item.id} className="p-2 border rounded-lg">
                  {item.img ? (
                    <Image
                      src={item.img}
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
                  <p>{item.title}</p>
                  <Link href={`/posts/${item.slug}`}>view</Link>
                </div>
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;
