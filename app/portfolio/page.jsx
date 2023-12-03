import React from "react";
import Image from "next/image";
import Link from "next/link";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getData = async () => {
  const res = await fetch(`http://localhost:3000/api/user`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};
const page = async () => {
  try {
    const data = await getData();

    return (
      <div>
        <div className="w-full h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 p-10 transition-all duration-200">
            {data?.map((item) => (
              <div
                className="flex justify-between p-10 items-center border rounded-lg hover:bg-muted/50"
                key={item.id}
              >
                {item.img ? (
                  <Image
                    src={item.img}
                    alt="post image"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src="/users.png"
                    alt="default image"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                )}
                <div>
                  <div>{item.name}</div>
                  <div>{item.title}</div>
                  <Link href={`/user/${item.id}`} key={item.id}>
                    view
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    // You can add an error message or UI component here
    return <div>Error fetching data</div>;
  }
};

export default page;
