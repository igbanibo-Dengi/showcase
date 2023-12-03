import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    const userWithPosts = await prisma.user.findUnique({
      where: { id },
      include: {
        Post: true,
      },
    });

    if (!userWithPosts) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }, { status: 404 })
      );
    }

    return new NextResponse(JSON.stringify(userWithPosts, { status: 200 }));
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
