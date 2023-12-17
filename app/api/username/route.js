// api/username/route.js
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  const loggedInUserEmail = session.user.email;

  console.log("Received request to update username:", username);

  try {
    const body = await req.json();
    const updateUsername = await prisma.user.update({
      where: {
        email: loggedInUserEmail,
      },
      data: { ...body, userEmail: session.user.email },
    });

    console.log("Username updated successfully:", updateUsername);

    return new NextResponse(JSON.stringify(updateUsername, { status: 200 }));
  } catch (error) {
    console.error("Error updating username:", error);
    return new NextResponse(
      JSON.stringify({ message: "Unable to update!" }, { status: 500 })
    );
  }
};
