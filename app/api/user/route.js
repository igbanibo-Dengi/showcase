import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Fetching all users along with their posts
    const usersWithPosts = await prisma.user.findMany({
      include: {
        Post: true, // Include the posts related to each user
      },
    });

    // Extracting only the posts from the result
    // const posts = usersWithPosts.map((user) => user.Post);

    return new NextResponse(JSON.stringify(usersWithPosts, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
