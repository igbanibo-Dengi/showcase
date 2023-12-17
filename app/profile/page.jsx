"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import UpdateUsernameForm from "@/components/UpdateUsernameForm";

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
  // console.log(status);
  if (status === "unauthenticated") {
    router.push("/");
  }
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const result = await getData();
      setData(result);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetching

    // Empty dependency array to ensure useEffect runs only once on mount
  }, []);

  const handleDeletePost = async (slug) => {
    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete post");
      }

      // Update the state to reflect the changes (e.g., refetch data)
      fetchData();
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  return (
    <div>
      <div>
        <UpdateUsernameForm />
      </div>
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
                  <div className="flex w-full justify-between">
                    <Button asChild>
                      <Link href={`/posts/${item.slug}`}>view</Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button className="bg-red-500 hover:bg-red-700">
                          Delete post
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeletePost(item.slug)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
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
