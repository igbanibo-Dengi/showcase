import Image from "next/image";
import React from "react";

const getData = async (page) => {
  const res = await fetch(`http://localhost:3000/api/posts?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const Tray = async ({ page }) => {
  const data = await getData(page);
  console.log(data);

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 p-10 transition-all duration-200">
        {data?.map((item) => (
          <div
            key={item._id}
            className="h-fit w-full border  border-gray-400 dark:border-gray-800 rounded-md p-5"
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
            <p className="pt-5"> {item.title}</p>
            <p className="pt-5"> {item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tray;
