import Image from "next/image";
import Link from "next/link";
import React from "react";

const getData = async (page) => {
  try {
    const res = await fetch(`http://localhost:3000/api/posts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed");
    }
    const allData = await res.json();
    const uiuxData = allData.filter((item) => item.catSlug === "uiux");
    return uiuxData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Uiux = async (page) => {
  const data = await getData(page);
  // console.log(data);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 p-10 transition-all duration-200">
      {data?.map((item) => (
        <div
          key={item._id}
          className="h-fit w-fit border  border-gray-400 dark:border-gray-800 rounded-md p-5"
        >
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
          <Link href={`/posts/${item.slug}`}>{item.title}</Link>
          <p className="pt-5"> {item.desc}</p>
          <p className="px-3 py-1 my-4 bg-primary w-fit rounded-md text-[10px]">
            {item.catSlug}
          </p>
          <Link href={`/posts/${item.slug}`}>view</Link>
        </div>
      ))}
    </div>
  );
};

export default Uiux;
