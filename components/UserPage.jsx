"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

const getUserData = async (userId) => {
  const res = await fetch(`http://localhost:3000/api/user/${userId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return res.json();
};

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (id) {
      getUserData(id)
        .then((data) => setUserData(data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{userData.name}'s Posts</h1>
      {userData.Post.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.desc}</p>
          {/* Add more post details as needed */}
        </div>
      ))}
    </div>
  );
};

export default UserPage;
