import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

export const GET = async () => {
  try {
    const session = await getAuthSession();
    // console.log(session);

    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "User not authenticated" }, { status: 401 })
      );
    }

    const loggedInUserEmail = session.user.email;

    // Fetching the logged-in user along with their posts
    const loggedInUserWithPosts = await prisma.user.findUnique({
      where: { email: loggedInUserEmail },
      include: {
        Post: true, // Include the posts related to the logged-in user
      },
    });

    // console.log(loggedInUserWithPosts);

    // Extracting only the posts from the result
    // const posts = usersWithPosts.map((user) => user.Post);

    return new NextResponse(
      JSON.stringify(loggedInUserWithPosts, { status: 200 })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
