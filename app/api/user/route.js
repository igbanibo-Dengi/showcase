import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const user = await prisma.user.findMany();

    return new NextResponse(JSON.stringify(user, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrongly!" }, { status: 500 })
    );
  }
};
